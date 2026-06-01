const CACHE_NAME = 'audit-planner-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// ขั้นตอนติดตั้ง: ให้พ่อบ้านจำไฟล์ที่จำเป็นลง Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// ขั้นตอนดึงข้อมูล: ถ้ามีเน็ตหลุด ให้ไปหยิบไฟล์จากที่จำไว้ (Cache) มาแสดงแทน
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // ถ้าเจอใน Cache ให้เอามาใช้เลย ถ้าไม่เจอค่อยไปโหลดจากเน็ต
        return response || fetch(event.request);
      })
  );
});
