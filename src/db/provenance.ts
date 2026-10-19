import * as crypto from 'node:crypto';

export interface ProvenanceParams {
  projectId: string;
  agentId: string;
  module: string;
  kind: string;
  title: string;
  content: string;
  createdAt?: string;
}

/**
 * Computes an authentic SHA-256 cryptographic provenance hash for a memory item.
 * Canonical format binds projectId, authoring agentId, module, kind, title, content, and creation timestamp.
 */
export function computeProvenanceHash(params: ProvenanceParams): string {
  const canonical = [
    params.projectId.trim(),
    (params.agentId || 'default').trim(),
    (params.module || 'general').trim(),
    params.kind.trim(),
    params.title.trim(),
    params.content.trim(),
    params.createdAt ? params.createdAt.trim() : ''
  ].join('::');

  return crypto.createHash('sha256').update(canonical, 'utf8').digest('hex');
}

/**
 * Verifies whether a memory's recorded content and authoring agent match its cryptographic signature.
 */
export function verifyProvenanceHash(
  expectedHash: string | null | undefined,
  params: ProvenanceParams
): boolean {
  if (!expectedHash || typeof expectedHash !== 'string' || expectedHash.length !== 64) {
    return false;
  }
  const computed = computeProvenanceHash(params);
  return crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(expectedHash, 'hex'));
}
