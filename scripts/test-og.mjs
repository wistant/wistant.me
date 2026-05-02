import { allPosts, allProjects, allCertifications } from '../.content-collections/generated/index.js';

const BASE_URL = 'http://localhost:3000';

const staticPages = [
  '/en', '/fr',
  '/en/blog', '/fr/blog',
  '/en/projects', '/fr/projects',
  '/en/certifications', '/fr/certifications',
  '/en/contact', '/fr/contact',
];

const dynamicPages = [
  ...allPosts.map(p => `/${p.lang}/blog/${p.slug}`),
  ...allProjects.map(p => `/${p.lang}/projects/${p.slug}`),
  ...allCertifications.map(p => `/${p.lang}/certifications/${p.slug}`),
];

const allPages = [...staticPages, ...dynamicPages];

async function getOgUrl(pagePath) {
  try {
    const res = await fetch(`${BASE_URL}${pagePath}`);
    const html = await res.text();
    const match = html.match(/property="og:image" content="([^"]*)"/);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
}

async function testRoutes() {
  console.log(`\n\x1b[1m\x1b[36m>>> SUPREME OG DIAGNOSTIC SYSTEM [${BASE_URL}] <<<\x1b[0m\n`);
  
  let successes = 0;
  let failures = 0;
  let total = allPages.length;

  for (const page of allPages) {
    process.stdout.write(`[\x1b[33m WAIT \x1b[0m] ${page.padEnd(40)} `);
    
    try {
      const ogUrl = await getOgUrl(page);
      if (!ogUrl) {
        if (process.stdout.isTTY) { process.stdout.clearLine(0); process.stdout.cursorTo(0); }
        console.error(`[\x1b[31m FAIL \x1b[0m] ${page.padEnd(40)} (Missing metadata)`);
        failures++;
        continue;
      }
      
      const res = await fetch(ogUrl);
      const contentType = res.headers.get('content-type') || '';
      
      if (res.ok && contentType.includes('image/png')) {
        if (process.stdout.isTTY) { process.stdout.clearLine(0); process.stdout.cursorTo(0); }
        console.log(`[\x1b[32m PASS \x1b[0m] ${page.padEnd(40)} -> ${ogUrl.split('/').pop().split('?')[0]}`);
        successes++;
      } else {
        if (process.stdout.isTTY) { process.stdout.clearLine(0); process.stdout.cursorTo(0); }
        console.error(`[\x1b[31m FAIL \x1b[0m] ${page.padEnd(40)} (HTTP ${res.status})`);
        console.error(`       \x1b[90mURL:\x1b[0m ${ogUrl}`);
        if (res.status === 500) {
          const body = await res.text();
          const errorMatch = body.match(/Error: (.*?)<\/pre>/s) || body.match(/<h2.*?>(.*?)<\/h2>/);
          const errorMessage = errorMatch ? errorMatch[1].replace(/<[^>]*>/g, '').trim() : "Internal Render Error";
          console.error(`       \x1b[31mERR:\x1b[0m ${errorMessage}`);
        }
        failures++;
      }
    } catch (e) {
      if (process.stdout.isTTY) { process.stdout.clearLine(0); process.stdout.cursorTo(0); }
      console.error(`[\x1b[35m CRASH\x1b[0m] ${page.padEnd(40)} - ${e.message}`);
      failures++;
    }
  }

  // API Routes
  const apiRoutes = ['/api/og?type=home&title=Validation+API'];
  for (const route of apiRoutes) {
    total++;
    process.stdout.write(`[\x1b[33m API  \x1b[0m] ${route.padEnd(40)} `);
    const res = await fetch(`${BASE_URL}${route}`);
    if (res.ok && res.headers.get('content-type')?.includes('image/png')) {
      if (process.stdout.isTTY) { process.stdout.clearLine(0); process.stdout.cursorTo(0); }
      console.log(`[\x1b[32m PASS \x1b[0m] ${route.padEnd(40)} -> PNG OK`);
      successes++;
    } else {
      if (process.stdout.isTTY) { process.stdout.clearLine(0); process.stdout.cursorTo(0); }
      console.log(`[\x1b[31m FAIL \x1b[0m] ${route.padEnd(40)} -> ${res.status}`);
      failures++;
    }
  }

  console.log(`\n\x1b[1m\x1b[33mFINAL DIAGNOSTIC REPORT\x1b[0m`);
  console.log(`\x1b[90m--------------------------------------------------------\x1b[0m`);
  console.log(`SUCCESSFUL RENDERS    : \x1b[32m${successes}\x1b[0m`);
  console.log(`FAILED RENDERS        : \x1b[31m${failures}\x1b[0m`);
  console.log(`TOTAL AUDIT POINTS    : ${total}`);
  console.log(`\x1b[90m--------------------------------------------------------\x1b[0m\n`);

  if (failures > 0) {
    console.log("\x1b[41m\x1b[37m  UNSTABLE ARCHITECTURE DETECTED  \x1b[0m\n");
    process.exit(1);
  } else {
    console.log("\x1b[42m\x1b[37m  SUPREME ALIGNMENT VERIFIED  \x1b[0m\n");
  }
}

testRoutes();
