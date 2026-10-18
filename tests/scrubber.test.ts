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
});
