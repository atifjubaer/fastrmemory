#!/usr/bin/env node

/**
 * ⚡ FastrMemory NPM Publisher
 * 
 * Verifies npm authorization, runs the local publication gate, and publishes
 * @atifjubaer/fastrmemory only when the account is authenticated. It never
 * bypasses 2FA or an account suspension.
 *
 * Usage:
 *   node scripts/publish-when-ready.mjs
 */

import { execSync } from 'node:child_process';

function run(cmd, capture = true) {
  try {
    return {
      success: true,
      output: execSync(cmd, {
        encoding: 'utf-8',
        stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
      }).trim(),
    };
  } catch (err) {
    return {
      success: false,
      output: (err.stderr || err.message || '').toString().trim(),
    };
  }
}

console.log('\n======================================================');
console.log('⚡ FastrMemory NPM Publishing Assistant');
console.log('======================================================\n');

// 1. Verify npm credentials
const whoami = run('npm whoami');
if (!whoami.success) {
  console.error('❌ Not logged in to NPM.');
  console.log('   Please run: npm login\n');
  process.exit(1);
}
console.log(`✅ Logged in as: ${whoami.output}`);

// 2. Perform dry run check
console.log('⚡ Running verification build & test suite...');
const buildRes = run('npm run prepublishOnly', false);
if (!buildRes.success) {
  console.error('❌ Build or tests failed. Please resolve errors before publishing.');
  process.exit(1);
}

console.log('\n⚡ Testing publish status (dry-run)...');
const dryRun = run('npm publish --dry-run');
if (!dryRun.success) {
  console.log(`⚠️ Dry run notification: ${dryRun.output}`);
} else {
  console.log('✅ Dry run completed successfully.');
}

// 3. Attempt live publish
console.log('\n🚀 Attempting live publication to NPM Registry...');
const livePub = run('npm publish --access public');

if (livePub.success) {
  console.log('\n🎉 SUCCESS! @atifjubaer/fastrmemory is now live on the public NPM registry.');
  console.log('   Global users can now run: npx @atifjubaer/fastrmemory\n');
} else {
  console.log('\n⏳ Publish Blocked:');
  console.log(`   ${livePub.output}`);
  console.log('\n💡 Note: FastrMemory is already live on GitHub:');
  console.log('   npx github:atifjubaer/fastrmemory\n');
}
