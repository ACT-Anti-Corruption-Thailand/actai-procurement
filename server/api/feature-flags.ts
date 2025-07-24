import { readFile } from 'fs/promises'

export default defineEventHandler(async (event) => {
  try {
    event.node.res.setHeader('Content-Type', 'application/json');
    return await readFile('feature-flags.json', 'utf-8');
  } catch {
    event.node.res.statusCode = 404;
    return 'Feature flags file not found';
  }
})
