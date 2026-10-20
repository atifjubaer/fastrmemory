import { describe, it, expect } from 'vitest';
import { scrubSecrets, hasSecrets } from '../src/privacy/scrubber.js';

describe('Secret Scrubber', () => {
  it('redacts private tags', () => {
    const raw = 'Here is public info. <private>This is sensitive financial data</private> More info.';
    const scrubbed = scrubSecrets(raw);
    expect(scrubbed).toBe('Here is public info. [REDACTED_PRIVATE] More info.');
    expect(hasSecrets(raw)).toBe(true);
  });

  it('redacts OpenAI and Anthropic API keys', () => {
    const raw = 'OpenAI: sk-proj-1234567890abcdef1234567890 and Claude: sk-ant-api03-abcdef1234567890abcdef1234567890';
    const scrubbed = scrubSecrets(raw);
    expect(scrubbed).toContain('[REDACTED_OPENAI_KEY]');
    expect(scrubbed).toContain('[REDACTED_ANTHROPIC_KEY]');
    expect(scrubbed).not.toContain('sk-proj-');
    expect(scrubbed).not.toContain('sk-ant-');
  });

  it('redacts Bearer tokens and GitHub tokens', () => {
    const raw = 'Authorization: Bearer mySecretToken1234567890abcdef and ghp_123456789012345678901234567890123456';
    const scrubbed = scrubSecrets(raw);
    expect(scrubbed).toContain('Bearer [REDACTED_TOKEN]');
    expect(scrubbed).toContain('[REDACTED_GITHUB_TOKEN]');
    expect(scrubbed).not.toContain('mySecretToken');
    expect(scrubbed).not.toContain('ghp_');
  });

  it('redacts URL embedded passwords', () => {
    const raw = 'Connect to postgres://admin:superSecretPass123@db.example.com:5432/mydb';
    const scrubbed = scrubSecrets(raw);
    expect(scrubbed).toBe('Connect to postgres://admin:[REDACTED_PASSWORD]@db.example.com:5432/mydb');
  });

  it('redacts PEM private keys', () => {
    const raw = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0Y1+
-----END RSA PRIVATE KEY-----`;
    const scrubbed = scrubSecrets(raw);
    expect(scrubbed).toBe('[REDACTED_PRIVATE_KEY]');
  });

  it('redacts JSON-style api_key / password values', () => {
    const raw = '{"api_key": "abc123def456ghi789", "password": "hunter2!x", "user": "alice"}';
    const scrubbed = scrubSecrets(raw);
    expect(scrubbed).toBe('{"api_key": "[REDACTED_SECRET]", "password": "[REDACTED_SECRET]", "user": "alice"}');
    expect(hasSecrets(raw)).toBe(true);
  });

  it('redacts Stripe live/restricted keys', () => {
    const raw = 'stripe sk_live_51HabcdefGHIJKLmnop and rk_live_51HabcdefGHIJKLmnop';
    const scrubbed = scrubSecrets(raw);
    expect(scrubbed).toBe('stripe [REDACTED_STRIPE_KEY] and [REDACTED_STRIPE_KEY]');
  });

  it('redacts Google API keys', () => {
    const key = 'AIza' + 'Sy' + 'A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q';
    expect(key.length).toBe(39);
    const scrubbed = scrubSecrets(`maps key=${key} end`);
    expect(scrubbed).toContain('[REDACTED_GOOGLE_KEY]');
    expect(scrubbed).not.toContain('AIza');
  });

  it('redacts Slack tokens', () => {
    const raw = 'SLACK xoxb-1234567890-0987654321-AbCdEfGhIjKl and xoxp-11111111111-abcdef';
    const scrubbed = scrubSecrets(raw);
    expect(scrubbed).toBe('SLACK [REDACTED_SLACK_TOKEN] and [REDACTED_SLACK_TOKEN]');
  });

  it('redacts JWTs', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
    const scrubbed = scrubSecrets(`token=${jwt};`);
    expect(scrubbed).toContain('[REDACTED_JWT]');
    expect(scrubbed).not.toContain('eyJ');
  });

  it('redacts Authorization: Basic credentials', () => {
    const raw = 'curl -H "Authorization: Basic dXNlcjpwYXNzd29yZA==" https://api.example.com';
    const scrubbed = scrubSecrets(raw);
    expect(scrubbed).toBe('curl -H "Authorization: Basic [REDACTED_CREDENTIALS]" https://api.example.com');
  });

  it('does not flag identifiers that merely contain "sk-"', () => {
    const raw = 'Deploy task-management-service-production-cluster and disk-encryption-at-rest-policy-v2';
    expect(scrubSecrets(raw)).toBe(raw);
    expect(hasSecrets(raw)).toBe(false);
  });

  it('hasSecrets is stable across repeated calls', () => {
    const raw = 'key sk-proj-1234567890abcdef1234567890';
    const results = Array.from({ length: 6 }, () => hasSecrets(raw));
    expect(results).toEqual([true, true, true, true, true, true]);
    const clean = 'nothing to see here';
    expect([hasSecrets(clean), hasSecrets(clean)]).toEqual([false, false]);
  });
});
