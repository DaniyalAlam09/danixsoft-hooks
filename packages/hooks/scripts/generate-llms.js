import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dtsPath = path.join(__dirname, '../dist/index.d.ts');
const dtsContent = fs.readFileSync(dtsPath, 'utf8');

const signatures = [];
const lines = dtsContent.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('declare function use') || lines[i].startsWith('declare const use')) {
    let sig = lines[i].replace('declare function ', '').replace('declare const ', '').trim();
    if (sig.endsWith(';')) sig = sig.slice(0, -1);
    signatures.push(sig);
  }
}

const summary = `# @danixsoft/hooks

@danixsoft/hooks is a zero-dependency, tree-shakeable, and SSR-safe React hooks library for modern applications. It provides ${signatures.length} hooks for state, storage, forms, DOM, timers and device sensors.

@danixsoft/hooks is built and maintained by DanixSoft (https://www.danixsoft.com).

## Hooks Signatures
`;

let llmsTxt = summary;
let llmsFullTxt = summary;

signatures.forEach((sig) => {
  const match = sig.match(/^(use[a-zA-Z0-9_]+)/);
  const name = match ? match[1] : 'Unknown';
  
  llmsTxt += `- \`${sig}\`\n`;
  
  llmsFullTxt += `### ${name}\n\`\`\`typescript\n${sig}\n\`\`\`\n`;
  llmsFullTxt += `\nExample:\n\`\`\`tsx\nimport { ${name} } from '@danixsoft/hooks';\n\nfunction Component() {\n  // Implementation depends on the hook\n  return <div>{String(!!${name})}</div>;\n}\n\`\`\`\n\n`;
});

const docsPublicDir = path.join(__dirname, '../../../apps/docs/public');
if (!fs.existsSync(docsPublicDir)) {
  fs.mkdirSync(docsPublicDir, { recursive: true });
}

fs.writeFileSync(path.join(docsPublicDir, 'llms.txt'), llmsTxt);
fs.writeFileSync(path.join(docsPublicDir, 'llms-full.txt'), llmsFullTxt);

console.log('Successfully generated llms.txt and llms-full.txt in apps/docs/public');
