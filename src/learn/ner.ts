/**
 * Zero-LLM Fast-Path Named Entity Recognition (NER)
 * Runs synchronously in <1ms without network or LLM dependencies.
 */

export interface ExtractedEntity {
  name: string;
  type: 'symbol' | 'file' | 'tech' | 'service' | 'pattern';
}

const COMMON_TECH_TERMS = new Set([
  'docker', 'k8s', 'kubernetes', 'jwt', 'sqlite', 'redis', 'postgres', 'postgresql',
  'mysql', 'mariadb', 'node', 'nodejs', 'typescript', 'javascript', 'python', 'rust',
  'golang', 'go', 'vite', 'vitest', 'jest', 'webpack', 'rollup', 'react', 'nextjs',
  'fastapi', 'express', 'django', 'flask', 'git', 'github', 'mcp', 'aws', 's3',
  'azure', 'gcp', 'tailwind', 'graphql', 'rest', 'cors', 'oauth', 'ci/cd', 'wal'
]);

// CamelCase or PascalCase identifiers (min 2 parts, e.g. FastrRepository, calculateStrength)
const CAMEL_OR_PASCAL_REGEX = /\b[A-Za-z][a-z0-9]+(?:[A-Z][a-z0-9]+)+\b/g;

// Backtick enclosed symbols: `SymbolName` or `module.function`
const BACKTICK_REGEX = /`([^`\n\r]{2,80})`/g;

// File paths: e.g. src/auth/jwt.ts, config.json, Dockerfile
const FILE_PATH_REGEX = /(?:[a-zA-Z0-9_.-]+\/)+[a-zA-Z0-9_.-]+\.[a-zA-Z0-9]+|\b[a-zA-Z0-9_.-]+\.(?:ts|js|tsx|jsx|json|md|py|rs|go|sql|yaml|yml|toml|sh)\b/g;

// Hyphenated service or package names: e.g. auth-service, user-profile-api
const SERVICE_REGEX = /\b[a-z0-9]+-[a-z0-9]+(?:-[a-z0-9]+)*\b/g;

export function extractEntities(text: string): ExtractedEntity[] {
  if (!text || typeof text !== 'string') return [];

  const entitiesMap = new Map<string, ExtractedEntity>();

  // 1. Backtick Symbols (Highest confidence)
  let match: RegExpExecArray | null;
  while ((match = BACKTICK_REGEX.exec(text)) !== null) {
    const sym = match[1].trim();
    if (sym && sym.length >= 2 && !sym.includes(' ') && sym.length <= 60) {
      const type = sym.includes('/') || sym.includes('.') ? (sym.includes('/') ? 'file' : 'symbol') : 'symbol';
      entitiesMap.set(sym.toLowerCase(), { name: sym, type });
    }
  }

  // 2. File Paths
  while ((match = FILE_PATH_REGEX.exec(text)) !== null) {
    const file = match[0].trim();
    if (file && file.length >= 3 && !file.startsWith('.')) {
      entitiesMap.set(file.toLowerCase(), { name: file, type: 'file' });
    }
  }

  // 3. Tech Keywords
  const words = text.toLowerCase().split(/[\s,.;:!?()[\]{}"'`]+/);
  for (const word of words) {
    if (COMMON_TECH_TERMS.has(word)) {
      entitiesMap.set(word, { name: word, type: 'tech' });
    }
  }

  // 4. CamelCase & PascalCase
  while ((match = CAMEL_OR_PASCAL_REGEX.exec(text)) !== null) {
    const id = match[0];
    if (id.length >= 3 && id.length <= 50) {
      if (!entitiesMap.has(id.toLowerCase())) {
        entitiesMap.set(id.toLowerCase(), { name: id, type: 'symbol' });
      }
    }
  }

  // 5. Hyphenated Services / Modules
  while ((match = SERVICE_REGEX.exec(text)) !== null) {
    const svc = match[0];
    // Exclude common hyphenated English words (e.g. well-known, high-performance)
    const isExcluded = /^(well|multi|high|low|real|pre|post|sub|non|cross)-/.test(svc);
    if (!isExcluded && svc.length >= 5 && svc.length <= 40 && !COMMON_TECH_TERMS.has(svc)) {
      if (!entitiesMap.has(svc.toLowerCase())) {
        entitiesMap.set(svc.toLowerCase(), { name: svc, type: 'service' });
      }
    }
  }

  return Array.from(entitiesMap.values());
}
