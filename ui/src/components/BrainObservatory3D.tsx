import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Conflict, Memory } from '@/lib/api';
import { cssVar, useTheme } from '@/lib/theme';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export type ObservatoryFilter = 'all' | 'rules' | 'traps' | 'conflicts';

/** Places each module on its own shell so clusters read as "areas of knowledge". */
function positions(memories: Memory[]): Map<string, THREE.Vector3> {
  const modules = [...new Set(memories.map((m) => m.module))].sort();
  const out = new Map<string, THREE.Vector3>();
  modules.forEach((mod, mi) => {
    const members = memories.filter((m) => m.module === mod);
    const theta = (mi / Math.max(modules.length, 1)) * Math.PI * 2;
    const center = new THREE.Vector3(Math.cos(theta) * 14, ((mi % 3) - 1) * 5, Math.sin(theta) * 14);
    const golden = Math.PI * (3 - Math.sqrt(5));
    members.forEach((m, i) => {
      const y = 1 - (i / Math.max(members.length - 1, 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const radius = 2.5 + Math.sqrt(members.length) * 0.9;
      out.set(m.id, new THREE.Vector3(center.x + Math.cos(golden * i) * r * radius, center.y + y * radius, center.z + Math.sin(golden * i) * r * radius));
    });
  });
  return out;
}

export function BrainObservatory3D({
  memories,
  conflicts,
  filter,
  onSelect,
}: {
  memories: Memory[];
  conflicts: Conflict[];
  filter: ObservatoryFilter;
  onSelect: (id: string) => void;
}) {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { resolved: theme } = useTheme();
  const [rotating, setRotating] = React.useState(!reducedMotion);
  const controlsRef = React.useRef<OrbitControls | null>(null);
  const onSelectRef = React.useRef(onSelect);
  onSelectRef.current = onSelect;

  React.useEffect(() => setRotating(!reducedMotion), [reducedMotion]);
  React.useEffect(() => {
    if (controlsRef.current) controlsRef.current.autoRotate = rotating;
  }, [rotating]);

  const visible = React.useMemo(() => {
    const inConflict = new Set(conflicts.flatMap((c) => [c.memory_a_id, c.memory_b_id]));
    return memories.filter((m) =>
      filter === 'all' ? true : filter === 'traps' ? m.kind === 'error_trap' : filter === 'rules' ? m.kind !== 'error_trap' : inConflict.has(m.id)
    );
  }, [memories, conflicts, filter]);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 500);
    camera.position.set(0, 14, 42);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = rotating;
    controls.autoRotateSpeed = 0.6;
    controlsRef.current = controls;

    // Everything disposable is tracked so unmount and rebuilds release GPU memory.
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const track = <G extends THREE.BufferGeometry, M extends THREE.Material>(g: G, m: M) => {
      geometries.push(g);
      materials.push(m);
      return [g, m] as const;
    };

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(10, 20, 15);
    scene.add(light);

    const brand = new THREE.Color(cssVar('--brand', '#3b82f6'));
    const trap = new THREE.Color(cssVar('--trap', '#f59e0b'));
    const risk = new THREE.Color(cssVar('--risk', '#f43f5e'));
    const muted = new THREE.Color(cssVar('--muted-foreground', '#71717a'));

    // Background star dust (static, one draw call)
    const starCount = reducedMotion ? 120 : 300;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 160;
    const [starGeo, starMat] = track(new THREE.BufferGeometry(), new THREE.PointsMaterial({ color: muted, size: 0.25, transparent: true, opacity: 0.5 }));
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, starMat));

    const pos = positions(visible);
    const meshes: THREE.Mesh[] = [];
    const [sphereGeo] = track(new THREE.SphereGeometry(0.55, 20, 16), new THREE.MeshBasicMaterial());
    const [haloGeo, haloMat] = track(new THREE.RingGeometry(0.85, 1.05, 32), new THREE.MeshBasicMaterial({ color: trap, transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
    const halos: THREE.Mesh[] = [];
    for (const m of visible) {
      const p = pos.get(m.id);
      if (!p) continue;
      const color = m.kind === 'error_trap' ? trap : m.status === 'staging' ? muted : brand;
      const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.35, roughness: 0.4 });
      materials.push(mat);
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.copy(p);
      mesh.scale.setScalar(0.8 + Math.min(m.reward_score, 3) * 0.25);
      mesh.userData = { id: m.id, title: m.title };
      scene.add(mesh);
      meshes.push(mesh);
      if (m.kind === 'error_trap') {
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.copy(p);
        scene.add(halo);
        halos.push(halo);
      }
    }

    // Conflict "tension wires"
    const conflictPts: number[] = [];
    for (const c of conflicts) {
      const a = pos.get(c.memory_a_id);
      const b = pos.get(c.memory_b_id);
      if (a && b) conflictPts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    if (conflictPts.length) {
      const [g, mat] = track(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: risk, transparent: true, opacity: 0.9 }));
      g.setAttribute('position', new THREE.Float32BufferAttribute(conflictPts, 3));
      scene.add(new THREE.LineSegments(g, mat));
    }

    // Picking: a click selects only if the pointer barely moved (orbit drags must not select).
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let down: { x: number; y: number } | null = null;
    let hovered: THREE.Mesh | null = null;
    const pick = (clientX: number, clientY: number): THREE.Mesh | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      return (raycaster.intersectObjects(meshes, false)[0]?.object as THREE.Mesh) ?? null;
    };
    const onDown = (e: PointerEvent) => { down = { x: e.clientX, y: e.clientY }; };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      const moved = Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y);
      down = null;
      if (moved > 5) return;
      const hit = pick(e.clientX, e.clientY);
      if (hit) onSelectRef.current(hit.userData.id as string);
    };
    const onMove = (e: PointerEvent) => {
      const hit = pick(e.clientX, e.clientY);
      if (hit !== hovered) {
        hovered = hit;
        renderer.domElement.style.cursor = hit ? 'pointer' : 'grab';
        // Hover label is updated directly in the DOM: no React state changes from the render loop.
        const label = labelRef.current;
        if (label) {
          label.textContent = hit ? String(hit.userData.title) : '';
          label.style.opacity = hit ? '1' : '0';
        }
      }
      const label = labelRef.current;
      if (label && hit) {
        const rect = mount.getBoundingClientRect();
        label.style.transform = `translate(${e.clientX - rect.left + 12}px, ${e.clientY - rect.top + 12}px)`;
      }
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('pointerup', onUp);
    renderer.domElement.addEventListener('pointermove', onMove);

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      controls.update();
      for (const h of halos) h.lookAt(camera.position);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointerup', onUp);
      renderer.domElement.removeEventListener('pointermove', onMove);
      controls.dispose();
      controlsRef.current = null;
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
    // Rebuild only when the visible data changes; rotation is toggled through the controls ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, conflicts, reducedMotion, theme]);

  const reset = () => {
    const c = controlsRef.current;
    if (!c) return;
    c.object.position.set(0, 14, 42);
    c.target.set(0, 0, 0);
    c.update();
  };

  return (
    <div className="relative overflow-hidden rounded-xl border bg-card">
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <Button variant="outline" size="icon-sm" onClick={() => setRotating((r) => !r)} aria-label={rotating ? 'Pause rotation' : 'Resume rotation'}>
          {rotating ? <Pause aria-hidden /> : <Play aria-hidden />}
        </Button>
        <Button variant="outline" size="icon-sm" onClick={reset} aria-label="Reset camera">
          <RotateCcw aria-hidden />
        </Button>
      </div>
      <div ref={mountRef} className="h-[460px] w-full cursor-grab touch-none sm:h-[560px]" />
      <div
        ref={labelRef}
        className="pointer-events-none absolute top-0 left-0 max-w-64 truncate rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md transition-opacity"
        style={{ opacity: 0 }}
        aria-hidden
      />
    </div>
  );
}
