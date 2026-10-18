/**
 * Secret & Credential Scrubber for FastrMemory.
 * Redacts sensitive API keys, bearer tokens, private keys, passwords, and user-tagged private blocks.
 */

const SECRET_PATTERNS: Array<{ name: string; regex: RegExp; replacement: string }> = [
  // 1. Private tags: <private>...</private>
  {
    name: 'private_tags',
    regex: /<private>[\s\S]*?<\/private>/gi,
    replacement: '[REDACTED_PRIVATE]'
  },
  // 2. PEM Private Keys
  {
    name: 'pem_private_key',
    regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g,
    replacement: '[REDACTED_PRIVATE_KEY]'
  },
  // 3. Known API Key prefixes
  {
    name: 'anthropic_key',
    regex: /sk-ant-[a-zA-Z0-9_\-]{20,}/g,
    replacement: '[REDACTED_ANTHROPIC_KEY]'
  },
  {
    name: 'openai_key',
    regex: /sk-[a-zA-Z0-9_\-]{20,}/g,
    replacement: '[REDACTED_OPENAI_KEY]'
  },
  {
    name: 'github_token',
    regex: /gh[pousr]_[a-zA-Z0-9]{36,}/g,
    replacement: '[REDACTED_GITHUB_TOKEN]'
  },
  {
    name: 'aws_access_key',
    regex: /AKIA[0-9A-Z]{16}/g,
    replacement: '[REDACTED_AWS_KEY]'
  },
  // 4. Bearer tokens in headers or strings
  {
    name: 'bearer_token',
    regex: /Bearer\s+[a-zA-Z0-9_\-\.]{16,}/gi,
    replacement: 'Bearer [REDACTED_TOKEN]'
  },
  // 5. URL embedded credentials: postgres://user:password@host or http://user:password@host
  {
    name: 'url_credentials',
    regex: /([a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^:\/\s]+):([^@\/\s]+)@/g,
    replacement: '$1:[REDACTED_PASSWORD]@'
  },
  // 6. Generic key/secret assignments: api_key = "...", secret: '...', password = ...
  {
    name: 'generic_assignment',
    regex: /((?:api[_-]?key|secret|password|access[_-]?token|auth[_-]?token)\s*[:=]\s*['"]?)([a-zA-Z0-9_\-\.]{12,})(['"]?)/gi,
    replacement: '$1[REDACTED_SECRET]$3'
  }
];

export function scrubSecrets(input: string): string {
  if (!input || typeof input !== 'string') {
    return input;
  }

  let scrubbed = input;
  for (const pattern of SECRET_PATTERNS) {
    scrubbed = scrubbed.replace(pattern.regex, pattern.replacement);
  }

  return scrubbed;
}

export function hasSecrets(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  return SECRET_PATTERNS.some((pattern) => pattern.regex.test(input));
}
