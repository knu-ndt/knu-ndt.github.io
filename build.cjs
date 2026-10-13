// Generate complete HTML so the site remains readable without JavaScript.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname);
const origin = 'https://knu-ndt.github.io';
const pages = {
  'index.html': ['NDT & SHM Lab · 경북대학교', '경북대학교 건축학부 강상구 교수의 NDT & SHM Lab. 비파괴검사, 구조건전성 모니터링, 머신러닝 연구.'],
  'research.html': ['연구분야 · NDT & SHM Lab', '비파괴검사, 구조건전성 모니터링, 데이터 기반 진단을 통해 재료와 구조물의 상태를 이해하고 안전한 유지관리 방법을 연구합니다.'],
  'professor.html': ['강상구 교수 · NDT & SHM Lab', '경북대학교 건축학부 강상구 교수의 연구분야, 학력, 경력과 Google Scholar 프로필.'],
  'publications.html': ['Publications · NDT & SHM Lab', '강상구 교수의 국제·국내 학술지 논문, 학술대회와 학위논문. Google Scholar 연결 및 논문 검색.'],
  'contact.html': ['연락처 · NDT & SHM Lab', '경북대학교 건축학부 NDT & SHM Lab 연구 문의. 강상구 교수 kangs@knu.ac.kr.'],
  '404.html': ['페이지를 찾을 수 없습니다 · NDT & SHM Lab', 'NDT & SHM Lab 홈페이지로 이동하세요.']
};
const escape = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const asset = name => name+'?v='+crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name),'utf8').replace(/\r\n/g,'\n')).digest('hex').slice(0,12);
for (const [file,[title,description]] of Object.entries(pages)) {
  const nodes = {};
  const document = {
    documentElement: {dataset:{}},
    body: {dataset:{page:file==='404.html'?'404':file==='index.html'?'home':file.replace('.html','')}},
    querySelector: selector => nodes[selector] ||= {innerHTML:'',textContent:'',setAttribute(){}},
    querySelectorAll: () => []
  };
  const context = {document, location:{pathname:`/${file}`,hash:''},localStorage:{getItem(){return null;}}};
  context.window=context;
  context.addEventListener=()=>{};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root,'publications.js'),'utf8'),context);
  vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),context);
  let main=nodes['#main'].innerHTML;
  if(file==='publications.html') {
    main=main.replace('<div id="results"></div>',`<div id="results">${nodes['#results'].innerHTML}</div>`);
    main=main.replace('aria-live="polite"></p>',`aria-live="polite">${nodes['#result-count'].textContent}</p>`);
  }
  const prefix = file==='404.html'?'/':'';
  const header=nodes['#header'].innerHTML.replace('class="active"','class="active" aria-current="page"');
  const canonical=file==='index.html'?`${origin}/`:`${origin}/${file}`;
  const schema=JSON.stringify({"@context":"https://schema.org","@type":"ResearchOrganization","name":"NDT & SHM Lab","url":origin+'/',"parentOrganization":{"@type":"CollegeOrUniversity","name":"Kyungpook National University"},"member":{"@type":"Person","name":"Sanggoo Kang","alternateName":"강상구","jobTitle":"Assistant Professor","email":"kangs@knu.ac.kr","sameAs":["https://scholar.google.com/citations?hl=ko&user=CzZ7ILAAAAAJ","https://research.knu.ac.kr/en/persons/sanggoo-kang/"]}});
  fs.writeFileSync(path.join(root,file),`<!doctype html>
<html lang="ko"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)}</title><meta name="description" content="${escape(description)}">
${file==='404.html'?'<meta name="robots" content="noindex">':`<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="website"><meta property="og:site_name" content="NDT &amp; SHM Lab"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:locale" content="ko_KR">
<meta name="theme-color" content="#224e3d"><link rel="icon" type="image/svg+xml" href="${prefix}favicon.svg">
<link rel="stylesheet" href="${prefix}${asset('style.css')}"><script type="application/ld+json">${schema}</script>
<script defer src="${prefix}${asset('publications.js')}"></script><script defer src="${prefix}${asset('app.js')}"></script>
</head><body data-page="${document.body.dataset.page}"><a class="skip" href="#main">본문으로 건너뛰기</a><header id="header">${header}</header>
<main id="main">${main}</main><footer id="footer">${nodes['#footer'].innerHTML}</footer>
<noscript><style>.tools,.searchbar{display:none}</style></noscript></body></html>\n`);
}
fs.writeFileSync(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).filter(x=>x!=='404.html').map(x=>`<url><loc>${origin}/${x==='index.html'?'':x}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log('Built six static pages and sitemap.');
