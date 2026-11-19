import fs from 'node:fs/promises';
import path from 'node:path';
// Run only after clearance of the listed third-party photographs.
const approved=new Set(process.argv.slice(2));
if(!approved.size){console.log('Usage: node scripts/cache-media.mjs <approved-image-id> [...]');process.exit(0)}
const file='data/visuals.json', media=JSON.parse(await fs.readFile(file,'utf8'));
await fs.mkdir('public/images/editorial',{recursive:true});
for(const photo of media.photos){if(!approved.has(photo.id)||!photo.url.startsWith('https://'))continue;try{const r=await fetch(photo.url,{signal:AbortSignal.timeout(15000)});if(!r.ok)throw new Error(`HTTP ${r.status}`);const mime=r.headers.get('content-type')?.split(';')[0];const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif'}[mime];if(!ext)throw new Error('Unexpected content type');const b=Buffer.from(await r.arrayBuffer());if(b.length>20*1024*1024||b.length<1024)throw new Error('Unexpected image size');const name=photo.id+'.'+ext;await fs.writeFile(path.join('public/images/editorial',name),b);photo.originalUrl=photo.url;photo.url='/images/editorial/'+name;console.log('Saved',photo.id)}catch(e){console.error('Skipped',photo.id,e.message)}}
await fs.writeFile(file,JSON.stringify(media,null,2));
