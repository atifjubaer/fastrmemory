export const MIN_NODE_VERSION: string;

export interface ParsedNodeVersion {
  major: number;
  minor: number;
  patch: number;
}

export function parseNodeVersion(version: string): ParsedNodeVersion;
export function isSupportedNodeVersion(version: string): boolean;
export function assertSupportedNode(version?: string): void;
