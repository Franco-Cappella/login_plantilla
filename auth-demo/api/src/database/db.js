import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, '..', '..', 'data');
const USERS_FILE = join(DATA_DIR, 'users.json');

const ensureDataFile = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, '[]', 'utf-8');
    }
  } catch (err) {
    console.error('Error inicializando archivo de datos', err.stack);
  }
};

export const readUsers = async () => {
  await ensureDataFile();
  const raw = await fs.readFile(USERS_FILE, 'utf-8');
  return JSON.parse(raw);
};

export const writeUsers = async (users) => {
  await ensureDataFile();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
};

export const getNextId = async () => {
  const users = await readUsers();
  if (users.length === 0) return 1;
  return Math.max(...users.map(u => u.id)) + 1;
};
