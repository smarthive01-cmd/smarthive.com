import fs from 'fs';
import fetch from 'node-fetch';

async function check(name, url) {
  try {
    const res = await fetch(url);
    console.log(`${name}: ${res.status}`);
    return { name, status: res.status, ok: res.ok };
  } catch (err) {
    return { name, status: 'ERROR', ok: false };
  }
}

(async () => {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  const results = [];
  for (const path of ['/api/health', '/api/products']) {
    results.push(await check(path, `${BASE}${path}`));
  }
  fs.writeFileSync('tests/validationReport.json', JSON.stringify(results, null, 2));
})();
