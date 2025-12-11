#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeStubClient(projectRoot) {
  const clientDir = path.join(projectRoot, 'node_modules', '@prisma', 'client');
  ensureDir(clientDir);

  const jsContent = `class PrismaClient {
  constructor() {
    console.warn('[offline] Using PrismaClient stub; install dependencies for full functionality.');
  }
  async $connect() {}
  async $disconnect() {}
  async $on() {}
}

module.exports = { PrismaClient };
`;

  const dtsContent = `export class PrismaClient {
  constructor();
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
  $on(event: string, cb: (...args: any[]) => void): void;
}
export type Prisma = unknown;
`;

  fs.writeFileSync(path.join(clientDir, 'index.js'), jsContent);
  fs.writeFileSync(path.join(clientDir, 'index.d.ts'), dtsContent);
}

function handleGenerate(projectRoot) {
  writeStubClient(projectRoot);
  console.log('Prisma client stub generated for offline environment.');
}

function handleMigrate(projectRoot, args) {
  const nameIndex = args.indexOf('--name');
  const migrationName = nameIndex >= 0 ? args[nameIndex + 1] : 'offline-migration';
  const migrationsDir = path.join(projectRoot, 'prisma', 'migrations');
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const migrationDir = path.join(migrationsDir, `${timestamp}_${migrationName}`);
  ensureDir(migrationDir);
  const sqlPath = path.join(migrationDir, 'migration.sql');
  if (!fs.existsSync(sqlPath)) {
    fs.writeFileSync(sqlPath, '-- Offline stub migration created because npm installs are blocked.\n');
  }
  console.log(`Created offline migration stub at ${path.relative(projectRoot, migrationDir)}`);
}

export function run(argv) {
  const projectRoot = path.resolve(__dirname, '..');
  const [command, ...rest] = argv;
  switch (command) {
    case 'generate':
      handleGenerate(projectRoot);
      break;
    case 'migrate':
      if (rest[0] === 'dev') {
        handleMigrate(projectRoot, rest.slice(1));
      } else {
        console.log('Mock prisma CLI only supports `migrate dev` offline.');
      }
      break;
    default:
      console.log('Mock prisma CLI supports `generate` and `migrate dev` in offline mode.');
  }
}

if (import.meta.url === `file://${__filename}`) {
  run(process.argv.slice(2));
}
