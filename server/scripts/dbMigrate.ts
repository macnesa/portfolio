import 'dotenv/config';
import umzug from '../utils/umzug';

// npm run migrate [up|down]
async function migrate() {
  const direction = process.argv[2]; // ambil argumen ke-2 dari CLI
  if (direction === 'up') {
    console.log('Running migrations UP...');
    await umzug.up();
    console.log('Migrations UP done!');
  } else if (direction === 'down') {
    console.log('Reverting migrations DOWN...');
    await umzug.down();
    console.log('Migrations DOWN done!');
  } else {
    console.error('Please specify "up" or "down" as the argument.');
    process.exit(1);
  }
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
