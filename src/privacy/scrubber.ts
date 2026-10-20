/**
 * Secret & Credential Scrubber for FastrMemory.
 * Redacts sensitive API keys, bearer tokens, private keys, passwords, and user-tagged private blocks.
 */

// Token prefixes must not be glued to a preceding identifier character, so that
// e.g. "task-management-service" never matches the "sk-" OpenAI prefix.
const TOKEN_START = '(?<![A-Za-z0-9_\\-])';

const SECRET_KEY_NAMES = '(?:api[_-]?key|secret[_-]?key|client[_-]?secret|secret|password|passwd|access[_-]?token|auth[_-]?token|refresh[_-]?token|private[_-]?key)';

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
    regex: new RegExp(`${TOKEN_START}sk-ant-[a-zA-Z0-9_\\-]{20,}`, 'g'),
    replacement: '[REDACTED_ANTHROPIC_KEY]'
  },
  {
    name: 'openai_key',
    regex: new RegExp(`${TOKEN_START}sk-[a-zA-Z0-9_\\-]{20,}`, 'g'),
    replacement: '[REDACTED_OPENAI_KEY]'
  },
  {
    name: 'stripe_key',
    regex: new RegExp(`${TOKEN_START}(?:sk|rk|pk)_(?:live|test)_[0-9a-zA-Z]{10,}`, 'g'),
    replacement: '[REDACTED_STRIPE_KEY]'
  },
  {
    name: 'google_api_key',
    regex: new RegExp(`${TOKEN_START}AIza[0-9A-Za-z_\\-]{35}`, 'g'),
    replacement: '[REDACTED_GOOGLE_KEY]'
  },
  {
    name: 'slack_token',
    regex: new RegExp(`${TOKEN_START}xox[abprs]-[0-9A-Za-z\\-]{10,}`, 'g'),
    replacement: '[REDACTED_SLACK_TOKEN]'
  },
  {
    name: 'github_token',
    regex: new RegExp(`${TOKEN_START}gh[pousr]_[a-zA-Z0-9]{36,}`, 'g'),
    replacement: '[REDACTED_GITHUB_TOKEN]'
  },
  {
    name: 'aws_access_key',
    regex: /\bAKIA[0-9A-Z]{16}\b/g,
    replacement: '[REDACTED_AWS_KEY]'
  },
  // 4. JSON Web Tokens (header.payload.signature)
  {
    name: 'jwt',
    regex: /\beyJ[A-Za-z0-9_\-]{5,}\.eyJ[A-Za-z0-9_\-]{5,}\.[A-Za-z0-9_\-]{5,}/g,
    replacement: '[REDACTED_JWT]'
  },
  // 5. Bearer tokens in headers or strings
  {
    name: 'bearer_token',
    regex: /Bearer\s+[a-zA-Z0-9_\-\.]{16,}/gi,
    replacement: 'Bearer [REDACTED_TOKEN]'
  },
  // 6. HTTP Basic auth headers: Authorization: Basic dXNlcjpwYXNz
  {
    name: 'basic_auth',
    regex: /(Authorization['"]?\s*[:=]\s*['"]?Basic\s+)[A-Za-z0-9+\/=]{6,}/gi,
    replacement: '$1[REDACTED_CREDENTIALS]'
  },
  // 7. URL embedded credentials: postgres://user:password@host or http://user:password@host
  {
    name: 'url_credentials',
    regex: /([a-zA-Z][a-zA-Z0-9+.-]*:\/\/[^:\/\s]+):([^@\/\s]+)@/g,
    replacement: '$1:[REDACTED_PASSWORD]@'
  },
  // 8. Quoted key/secret assignments, including JSON: "api_key": "...", password = 'hunter2'
  {
    name: 'quoted_assignment',
    regex: new RegExp(`(${SECRET_KEY_NAMES}['"]?\\s*[:=]\\s*)(['"])((?:(?!\\2)[^\\n\\\\]|\\\\.){4,}?)\\2`, 'gi'),
    replacement: '$1$2[REDACTED_SECRET]$2'
  },
  // 9. Unquoted key/secret assignments: api_key = abcdef..., secret: abcdef...
  {
    name: 'generic_assignment',
    regex: new RegExp(`(${SECRET_KEY_NAMES}['"]?\\s*[:=]\\s*)(?!\\[REDACTED)([a-zA-Z0-9_\\-\\.]{12,})`, 'gi'),
    replacement: '$1[REDACTED_SECRET]'
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

// Non-global copies: RegExp#test on a /g regex is stateful (lastIndex), which made
// repeated hasSecrets() calls on the same input alternate between true and false.
const DETECTION_PATTERNS: RegExp[] = SECRET_PATTERNS.map(
  (p) => new RegExp(p.regex.source, p.regex.flags.replace('g', ''))
);

export function hasSecrets(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  return DETECTION_PATTERNS.some((regex) => regex.test(input));
}
