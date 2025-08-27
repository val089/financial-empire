/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

// this does not need to be done on local environment
if (process.env.EAS_BUILD !== 'true') {
  console.log('Skipping corepack setup - not in EAS Build environment');
  process.exit(0);
}

console.log('Enabling corepack for Yarn...');

// enable corepack to allow usage of yarn 2+
exec('corepack enable', (error, stdout, stderr) => {
  if (error) {
    console.error('Error enabling corepack:', error);
    console.error('stderr:', stderr);
    process.exit(1);
  }
  console.log('Corepack enabled successfully');
  console.log('stdout:', stdout);
});
