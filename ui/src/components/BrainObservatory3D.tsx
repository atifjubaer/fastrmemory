import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pause, Play, RotateCcw, ZoomIn, ZoomOut, Sparkles, Filter, ShieldAlert } from 'lucide-react';
import type { MemoryItem, FastrStatus } from '../types';

interface BrainObservatory3DProps {
  memories: MemoryItem[];
  status: FastrStatus | null;
  onSelectMemory: (memory: MemoryItem) => void;
}

interface Node3DData {
  id: string;
  memory: MemoryItem;
  mesh: THREE.Mesh;
  halo: THREE.Mesh;
  ring?: THREE.Mesh;
  position: THREE.Vector3;
  color: string;
  isTrap: boolean;
  screenPos: { x: number; y: number; visible: boolean };
}

export const BrainObservatory3D: React.FC<BrainObservatory3DProps> = ({
  memories,
  status,
  onSelectMemory,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [filterKind, setFilterKind] = useState<'all' | 'rules' | 'traps'>('all');
  const [isRotating, setIsRotating] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<Node3DData | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [leaderLabels, setLeaderLabels] = useState<Array<{ id: string; title: string; isTrap: boolean; x: number; y: number; visible: boolean }>>([]);

  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  const filterKindRef = useRef(filterKind);
  filterKindRef.current = filterKind;

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const nodesRef = useRef<Node3DData[]>([]);
  const linesMeshRef = useRef<THREE.LineSegments | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetLookAtRef = useRef<THREE.Vector3 | null>(null);
  const starFieldRef = useRef<THREE.Points | null>(null);

  // Filter memories
  const filteredMemories = useMemo(() => {
    return memories.filter((m) => {
      if (filterKind === 'rules') return m.kind === 'rule';
      if (filterKind === 'traps') return m.kind === 'error_trap';
      return true;
    });
  }, [memories, filterKind]);

  // Setup Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 640;

    // 1. Scene & Depth Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090b);
    scene.fog = new THREE.FogExp2(0x09090b, 0.015);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 300);
    camera.position.set(0, 12, 34);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer with High-DPI
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.minDistance = 6;
    controls.maxDistance = 90;
    controls.maxPolarAngle = Math.PI * 0.85;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xfbbf24, 0.8);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    // 6. Subtle Floor Grid
    const gridHelper = new THREE.GridHelper(60, 30, 0x27272a, 0x18181b);
    gridHelper.position.y = -12;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    scene.add(gridHelper);

    // 7. Ambient Cosmic Star Dust Field (350 floating particles)
    const starCount = 350;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount * 3; s += 3) {
      starPositions[s] = (Math.random() - 0.5) * 90;
      starPositions[s + 1] = (Math.random() - 0.5) * 60;
      starPositions[s + 2] = (Math.random() - 0.5) * 90;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.18,
      transparent: true,
      opacity: 0.45,
    });
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);
    starFieldRef.current = starField;

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (starFieldRef.current) {
        starFieldRef.current.rotation.y += 0.0003;
      }

      // Smooth camera lerp interpolation (60 FPS fluid transitions)
      if (targetCamPosRef.current && camera) {
        camera.position.lerp(targetCamPosRef.current, 0.06);
        if (camera.position.distanceTo(targetCamPosRef.current) < 0.04) {
          targetCamPosRef.current = null;
        }
      }

      if (targetLookAtRef.current && controls) {
        controls.target.lerp(targetLookAtRef.current, 0.06);
        if (controls.target.distanceTo(targetLookAtRef.current) < 0.04) {
          targetLookAtRef.current = null;
        }
      }

      controls.autoRotate = isRotatingRef.current;
      controls.update();

      // Update projected screen coordinates for billboard labels
      const widthHalf = container.clientWidth / 2;
      const heightHalf = container.clientHeight / 2;
      const tempVec = new THREE.Vector3();

      const labels: Array<{ id: string; title: string; isTrap: boolean; x: number; y: number; visible: boolean }> = [];

      nodesRef.current.forEach((n, idx) => {
        // Only show top 8 prominent memories as leader labels to keep galaxy uncluttered
        if (n.isTrap || idx < 5) {
          tempVec.copy(n.position);
          tempVec.project(camera);

          const isVisible = tempVec.z < 1 && tempVec.x >= -0.9 && tempVec.x <= 0.9 && tempVec.y >= -0.9 && tempVec.y <= 0.9;
          if (isVisible) {
            labels.push({
              id: n.id,
              title: n.memory.title,
              isTrap: n.isTrap,
              x: tempVec.x * widthHalf + widthHalf,
              y: -(tempVec.y * heightHalf) + heightHalf,
              visible: true,
            });
          }
        }
      });

      setLeaderLabels(labels);
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 640;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Populate Nodes & Constellation Wires
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clean up existing meshes
    nodesRef.current.forEach((n) => {
      scene.remove(n.mesh);
      scene.remove(n.halo);
      if (n.ring) scene.remove(n.ring);
      n.mesh.geometry.dispose();
      n.halo.geometry.dispose();
      if (n.ring) n.ring.geometry.dispose();
    });
    nodesRef.current = [];

    if (linesMeshRef.current) {
      scene.remove(linesMeshRef.current);
      linesMeshRef.current.geometry.dispose();
      linesMeshRef.current = null;
    }

    const count = filteredMemories.length;
    if (count === 0) return;

    const newNodes: Node3DData[] = [];
    const positions: THREE.Vector3[] = [];

    // Distribute nodes in celestial orbital galaxy
    filteredMemories.forEach((m, i) => {
      const isTrap = m.kind === 'error_trap';
      const phi = Math.acos(-1 + (2 * i) / Math.max(1, count));
      const theta = Math.sqrt(count * Math.PI) * phi;

      // Orbital radius: Traps form an elevated radiant crown, rules orbit in disc
      const radius = isTrap ? 14 + (i % 3) * 2.5 : 10 + (i % 4) * 3;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = isTrap ? 4 + Math.sin(theta) * 3.5 : (Math.sin(phi) * 6 - 2);
      const z = radius * Math.sin(theta) * Math.sin(phi);

      const pos = new THREE.Vector3(x, y, z);
      positions.push(pos);

      // Node sphere size based on reward score / trap boost
      const baseRadius = isTrap ? 0.55 : 0.42;
      const sphereRadius = baseRadius + Math.min(0.4, (m.reward_score - 1) * 0.2);

      const colorHex = isTrap ? 0xfbbf24 : 0x38bdf8;
      const emissiveHex = isTrap ? 0xd97706 : 0x0284c7;

      // 1. Core Sphere
      const geom = new THREE.SphereGeometry(sphereRadius, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: emissiveHex,
        emissiveIntensity: isTrap ? 0.55 : 0.35,
        roughness: 0.25,
        metalness: 0.1,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(pos);
      mesh.userData = { memoryId: m.id, memory: m };
      scene.add(mesh);

      // 2. Luminous Halo
      const haloGeom = new THREE.SphereGeometry(sphereRadius * 2.2, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: isTrap ? 0.14 : 0.08,
        side: THREE.BackSide,
      });
      const halo = new THREE.Mesh(haloGeom, haloMat);
      halo.position.copy(pos);
      scene.add(halo);

      // 3. Orbital Warning Ring for 2.0x Error Traps
      let ring: THREE.Mesh | undefined;
      if (isTrap) {
        const ringGeom = new THREE.RingGeometry(sphereRadius * 1.5, sphereRadius * 1.9, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xfbbf24,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide,
        });
        ring = new THREE.Mesh(ringGeom, ringMat);
        ring.position.copy(pos);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);
      }

      newNodes.push({
        id: m.id,
        memory: m,
        mesh,
        halo,
        ring,
        position: pos,
        color: isTrap ? '#fbbf24' : '#38bdf8',
        isTrap,
        screenPos: { x: 0, y: 0, visible: false },
      });
    });

    nodesRef.current = newNodes;

    // 4. Generate Constellation Wires (Tendril Connections)
    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        const a = newNodes[i];
        const b = newNodes[j];

        // Connect if in same module or share linked files
        const sameModule = a.memory.module.toLowerCase() === b.memory.module.toLowerCase();
        const sharedFile = a.memory.linked_files?.some((f) => b.memory.linked_files?.includes(f));
        const dist = a.position.distanceTo(b.position);

        if ((sameModule || sharedFile) && dist < 18) {
          linePoints.push(a.position, b.position);
        }
      }
    }

    if (linePoints.length > 0) {
      const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.12,
      });
      const linesMesh = new THREE.LineSegments(lineGeom, lineMat);
      scene.add(linesMesh);
      linesMeshRef.current = linesMesh;
    }
  }, [filteredMemories]);

  // Raycaster for Hover & Click
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      const camera = cameraRef.current;
      if (!container || !camera) return;

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      const meshes = nodesRef.current.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const found = nodesRef.current.find((n) => n.mesh === hitMesh);
        if (found) {
          setHoveredNode(found);
          setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          container.style.cursor = 'pointer';
          return;
        }
      }

      setHoveredNode(null);
      container.style.cursor = 'grab';
    },
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      const camera = cameraRef.current;
      if (!container || !camera) return;

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      const meshes = nodesRef.current.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const found = nodesRef.current.find((n) => n.mesh === hitMesh);
        if (found) {
          onSelectMemory(found.memory);
          targetCamPosRef.current = found.position.clone().add(new THREE.Vector3(0, 1.8, 6.5));
          targetLookAtRef.current = found.position.clone();
        }
      }
    },
    [onSelectMemory]
  );

  const resetCamera = () => {
    targetCamPosRef.current = new THREE.Vector3(0, 12, 34);
    targetLookAtRef.current = new THREE.Vector3(0, 0, 0);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '640px',
        background: '#09090b',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        style={{ width: '100%', height: '100%', cursor: 'grab' }}
      />

      {/* Floating 3D Leader Labels (Hippo Standard) */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {leaderLabels.map((lbl) => (
          <div
            key={lbl.id}
            onClick={(e) => {
              e.stopPropagation();
              const target = memories.find((m) => m.id === lbl.id);
              if (target) onSelectMemory(target);
            }}
            style={{
              position: 'absolute',
              left: `${lbl.x}px`,
              top: `${lbl.y}px`,
              transform: 'translate(10px, -50%)',
              pointerEvents: 'auto',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 8px',
              borderRadius: '12px',
              background: 'rgba(20, 20, 23, 0.85)',
              border: `1px solid ${lbl.isTrap ? 'rgba(251, 191, 36, 0.4)' : 'rgba(56, 189, 248, 0.3)'}`,
              backdropFilter: 'blur(8px)',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: lbl.isTrap ? '#fbbf24' : 'var(--text)',
              whiteSpace: 'nowrap',
              maxWidth: '220px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              transition: 'transform 0.1s ease, border-color 0.1s ease',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: lbl.isTrap ? '#fbbf24' : 'var(--accent)',
                boxShadow: `0 0 6px ${lbl.isTrap ? '#fbbf24' : 'var(--accent)'}`,
              }}
            />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{lbl.title}</span>
          </div>
        ))}
      </div>

      {/* Top Precision Control Bar */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Title & Cosmic Counts */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(20, 20, 23, 0.85)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '6px 12px',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px' }}>🌌</span>
            <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
              BRAIN OBSERVATORY
            </span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
            {filteredMemories.length} orbital nodes &bull; {status?.graphNodesCount ?? 41} knowledge entities
          </span>
        </div>

        {/* Filter Toolbar & Camera Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto' }}>
          {/* Kind Filter Pills */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(20, 20, 23, 0.85)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '3px',
              gap: '4px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <button
              onClick={() => setFilterKind('all')}
              className="btn"
              style={{
                padding: '3px 8px',
                fontSize: '11px',
                background: filterKind === 'all' ? 'var(--accent-weak)' : 'transparent',
                color: filterKind === 'all' ? 'var(--accent)' : 'var(--text-muted)',
                border: 'none',
              }}
            >
              All ({memories.length})
            </button>
            <button
              onClick={() => setFilterKind('rules')}
              className="btn"
              style={{
                padding: '3px 8px',
                fontSize: '11px',
                background: filterKind === 'rules' ? 'var(--accent-weak)' : 'transparent',
                color: filterKind === 'rules' ? 'var(--accent)' : 'var(--text-muted)',
                border: 'none',
              }}
            >
              Rules ({memories.filter((m) => m.kind === 'rule').length})
            </button>
            <button
              onClick={() => setFilterKind('traps')}
              className="btn"
              style={{
                padding: '3px 8px',
                fontSize: '11px',
                background: filterKind === 'traps' ? 'var(--trap-weak)' : 'transparent',
                color: filterKind === 'traps' ? 'var(--trap)' : 'var(--text-muted)',
                border: 'none',
              }}
            >
              2.0x Traps ({memories.filter((m) => m.kind === 'error_trap').length})
            </button>
          </div>

          {/* Rotation Toggle */}
          <button
            onClick={() => setIsRotating((r) => !r)}
            className="btn"
            style={{ padding: '6px 9px', background: 'rgba(20, 20, 23, 0.85)', backdropFilter: 'blur(8px)' }}
            title={isRotating ? 'Pause rotation' : 'Resume rotation'}
          >
            {isRotating ? <Pause size={13} /> : <Play size={13} />}
          </button>

          {/* Reset Camera */}
          <button
            onClick={resetCamera}
            className="btn"
            style={{ padding: '6px 9px', background: 'rgba(20, 20, 23, 0.85)', backdropFilter: 'blur(8px)' }}
            title="Reset 3D camera angle"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Hover Tooltip Card */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            left: `${Math.min(hoverPos.x + 16, 1100)}px`,
            top: `${Math.min(hoverPos.y + 16, 520)}px`,
            pointerEvents: 'none',
            background: 'rgba(20, 20, 23, 0.95)',
            border: `1px solid ${hoveredNode.isTrap ? 'var(--trap)' : 'var(--accent)'}`,
            borderRadius: '6px',
            padding: '10px 14px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            zIndex: 100,
            maxWidth: '300px',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span
              className="badge-tag"
              style={{
                background: hoveredNode.isTrap ? 'var(--trap-weak)' : 'var(--accent-weak)',
                color: hoveredNode.isTrap ? 'var(--trap)' : 'var(--accent)',
              }}
            >
              {hoveredNode.isTrap ? '2.0X ERROR TRAP' : 'VERIFIED RULE'}
            </span>
            <span style={{ fontSize: '10.5px', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
              {hoveredNode.memory.module}
            </span>
          </div>
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text)', lineHeight: '1.4' }}>
            {hoveredNode.memory.title}
          </div>
          <div
            style={{
              marginTop: '6px',
              paddingTop: '6px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
            }}
          >
            <span>[{hoveredNode.id}]</span>
            <span style={{ color: hoveredNode.isTrap ? 'var(--trap)' : 'var(--accent)', fontWeight: 600 }}>
              {hoveredNode.memory.reward_score.toFixed(2)}x boost
            </span>
          </div>
        </div>
      )}

      {/* Bottom HUD Legend & Controls */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Galaxy Color Legend */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(20, 20, 23, 0.85)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '5px 12px',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 6px #fbbf24' }} />
            <span style={{ color: '#fbbf24' }}>2.0X ERROR TRAP</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 6px #38bdf8' }} />
            <span style={{ color: '#38bdf8' }}>VERIFIED RULE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.4)' }} />
            <span style={{ color: 'var(--text-faint)' }}>CONSTELLATION WIRE</span>
          </div>
        </div>

        {/* Interaction Shortcuts */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(20, 20, 23, 0.85)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '5px 12px',
            backdropFilter: 'blur(8px)',
            fontSize: '11px',
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono)',
            display: 'flex',
            gap: '12px',
          }}
        >
          <span>Left-Drag: <b>Orbit 3D</b></span>
          <span>Right-Drag: <b>Pan</b></span>
          <span>Scroll: <b>Zoom</b></span>
          <span>Click Node: <b>Inspect Rule</b></span>
        </div>
      </div>
    </div>
  );
};
