import { describe, expect, it } from 'vitest';
import {
  MIN_NODE_VERSION,
  assertSupportedNode,
  isSupportedNodeVersion,
  parseNodeVersion,
} from '../bin/fastr-guard.mjs';

describe('Node.js runtime guard', () => {
  it('parses normal and v-prefixed versions', () => {
    expect(parseNodeVersion('22.16.0')).toEqual({ major: 22, minor: 16, patch: 0 });
    expect(parseNodeVersion('v24.15.0')).toEqual({ major: 24, minor: 15, patch: 0 });
  });

  it('accepts the minimum supported release and newer majors', () => {
    expect(MIN_NODE_VERSION).toBe('22.16.0');
    expect(isSupportedNodeVersion('22.16.0')).toBe(true);
    expect(isSupportedNodeVersion('22.17.0')).toBe(true);
    expect(isSupportedNodeVersion('23.0.0')).toBe(true);
    expect(isSupportedNodeVersion('24.15.0')).toBe(true);
  });

  it('rejects older Node releases with a clear error', () => {
    expect(isSupportedNodeVersion('22.15.0')).toBe(false);
    expect(isSupportedNodeVersion('20.19.0')).toBe(false);
    expect(() => assertSupportedNode('20.19.0')).toThrow(/requires Node\.js 22\.16\.0 or newer/);
    expect(() => assertSupportedNode('20.19.0')).toThrow(/Node 24 LTS is recommended/);
  });

  it('does not throw on a supported version', () => {
    expect(() => assertSupportedNode('22.16.0')).not.toThrow();
  });
});
