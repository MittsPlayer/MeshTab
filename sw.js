// MeshTab service worker: funciona offline depois da primeira visita.
const V='meshtab-v1',LOCAL=['./','index.html','manifest.json','logo.png','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'],
CDN=[
 "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/TransformControls.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/GLTFExporter.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/OBJExporter.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/STLExporter.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/utils/BufferGeometryUtils.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/fflate.min.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/FBXLoader.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/PLYLoader.js"
];
self.addEventListener('install',e=>{self.skipWaiting();
 e.waitUntil(caches.open(V).then(c=>Promise.allSettled([...LOCAL,...CDN].map(u=>c.add(u)))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith('http'))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put('index.html',c));return res}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res})))});
