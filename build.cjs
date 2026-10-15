// Generate complete HTML so the site remains readable without JavaScript.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname);
const origin = 'https://knu-ndt.github.io';
// Keep the official emblem unchanged; add white margins for wide social previews.
const officialEmblem = 'https://www.knu.ac.kr/wbbs/img/intro/ui_emblem01.jpg';
const shareImage = 'https://wsrv.nl/?url=www.knu.ac.kr%2Fwbbs%2Fimg%2Fintro%2Fui_emblem01.jpg&w=600&h=315&fit=contain&we&cbg=white&output=jpg';
const updated = '2026-10-15';
const pages = {
  "index.html": [
    "NDT & SHM Lab | 경북대학교 강상구 교수 연구실",
    "경북대학교 건축학부 강상구 교수의 NDT & SHM Lab. 비파괴검사, 구조건전성 모니터링, 건설안전, 데이터 기반 진단 연구와 논문, 구성원 정보를 소개합니다."
  ],
  "research.html": [
    "연구분야 | NDT & SHM Lab · 경북대학교",
    "경북대학교 NDT & SHM Lab의 비파괴검사(NDT), 구조건전성 모니터링(SHM), 데이터 기반 진단과 건설안전 연구를 소개합니다."
  ],
  "people.html": [
    "People · 교수 및 구성원 | NDT & SHM Lab · 경북대학교",
    "경북대학교 건축학부 강상구 교수와 NDT & SHM Lab 구성원 소개. 박사과정, 석사과정, 학석연계과정, 학부연구생과 입학 예정 프로필 및 과정 이력을 확인하세요."
  ],
  "gallery.html": [
    "Gallery · 갤러리 | NDT & SHM Lab · 경북대학교",
    "경북대학교 NDT & SHM Lab의 연구, 학술 활동과 일상 사진을 소개하는 갤러리입니다. 연구실 사진은 준비 중입니다."
  ],
  "professor.html": [
    "People · 교수 및 구성원 | NDT & SHM Lab · 경북대학교",
    "경북대학교 건축학부 강상구 교수와 NDT & SHM Lab 구성원 소개. 박사과정, 석사과정, 학석연계과정, 학부연구생과 입학 예정 프로필 및 과정 이력을 확인하세요."
  ],
  "publications.html": [
    "Publications · 논문 | NDT & SHM Lab · 경북대학교",
    "경북대학교 NDT & SHM Lab의 국제·국내 학술지 논문, 특허 분류와 학위논문 목록. 연구 성과 검색, 연도별 필터와 원문 링크를 제공합니다."
  ],
  "contact.html": [
    "Contact · 연락처 | NDT & SHM Lab · 경북대학교",
    "경북대학교 건축학부 NDT & SHM Lab 연구 및 협력 문의. 강상구 교수 이메일 kangs@knu.ac.kr, 대학 위치와 공식 프로필을 확인하세요."
  ],
  "404.html": [
    "페이지를 찾을 수 없습니다 · NDT & SHM Lab",
    "NDT & SHM Lab 홈페이지로 이동하세요."
  ]
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
  const canonical=file==='index.html'?`${origin}/`:`${origin}/${file==='professor.html'?'people.html':file}`;
  const labId=origin+'/#lab',siteId=origin+'/#website',personId=origin+'/people.html#profile-sanggoo-kang';
  const pageType=file==='contact.html'?'ContactPage':['people.html','professor.html','publications.html','gallery.html'].includes(file)?'CollectionPage':'WebPage';
  const breadcrumb={"@type":"BreadcrumbList","@id":canonical+'#breadcrumb',"itemListElement":[{"@type":"ListItem","position":1,"name":"NDT & SHM Lab","item":origin+'/'}]};
  if(file!=='index.html')breadcrumb.itemListElement.push({"@type":"ListItem","position":2,"name":title.split(' | ')[0],"item":canonical});
  const graph=[
    {"@type":"ResearchOrganization","@id":labId,"name":"NDT & SHM Lab","alternateName":"경북대학교 NDT & SHM Lab","url":origin+'/',"description":pages['index.html'][1],"email":"kangs@knu.ac.kr","parentOrganization":{"@type":"CollegeOrUniversity","@id":"https://www.knu.ac.kr/#university","name":"경북대학교","alternateName":"Kyungpook National University","url":"https://www.knu.ac.kr/","logo":{"@type":"ImageObject","url":officialEmblem,"width":200,"height":200}},"member":{"@id":personId}},
    {"@type":"Person","@id":personId,"name":"강상구","alternateName":"Sanggoo Kang","jobTitle":"Assistant Professor","email":"kangs@knu.ac.kr","url":origin+'/people.html',"affiliation":{"@id":"https://www.knu.ac.kr/#university"},"worksFor":{"@id":labId},"sameAs":["https://scholar.google.com/citations?hl=ko&user=CzZ7ILAAAAAJ","https://research.knu.ac.kr/en/persons/sanggoo-kang/"]},
    {"@type":"WebSite","@id":siteId,"name":"NDT & SHM Lab","alternateName":"NDT & SHM Lab · 경북대학교","url":origin+'/',"inLanguage":["ko","en"],"publisher":{"@id":labId}},
    {"@type":pageType,"@id":canonical+'#webpage',"url":canonical,"name":title,"description":description,"inLanguage":"ko","isPartOf":{"@id":siteId},"about":{"@id":labId},"breadcrumb":{"@id":canonical+'#breadcrumb'},"primaryImageOfPage":{"@type":"ImageObject","url":shareImage,"width":600,"height":315}},
    breadcrumb
  ];
  const schema=JSON.stringify({"@context":"https://schema.org","@graph":graph}).replace(/</g,'\\u003c');
  fs.writeFileSync(path.join(root,file),`<!doctype html>
<html lang="ko"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(title)}</title><meta name="description" content="${escape(description)}">
${file==='404.html'?'<meta name="robots" content="noindex, follow">':`<meta name="robots" content="index, follow, max-image-preview:large"><link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="website"><meta property="og:site_name" content="NDT &amp; SHM Lab"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:locale" content="ko_KR">
<meta property="og:image" content="${escape(shareImage)}"><meta property="og:image:secure_url" content="${escape(shareImage)}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="600"><meta property="og:image:height" content="315"><meta property="og:image:alt" content="경북대학교 공식 엠블럼">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${escape(shareImage)}"><meta name="twitter:image:alt" content="경북대학교 공식 엠블럼">
<meta name="theme-color" content="#224e3d"><link rel="icon" type="image/svg+xml" href="${prefix}favicon.svg">
<link rel="stylesheet" href="${prefix}${asset('style.css')}"><script type="application/ld+json">${schema}</script>
<script defer src="${prefix}${asset('publications.js')}"></script><script defer src="${prefix}${asset('app.js')}"></script>
</head><body data-page="${document.body.dataset.page}"><a class="skip" href="#main">본문으로 건너뛰기</a><header id="header">${header}</header>
<main id="main">${main}</main><footer id="footer">${nodes['#footer'].innerHTML}</footer>
<noscript><style>.tools,.searchbar,.member-filters{display:none}.member-detail-fallback{display:block}</style></noscript></body></html>\n`);
}
fs.writeFileSync(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).filter(x=>x!=='404.html'&&x!=='professor.html').map(x=>`<url><loc>${origin}/${x==='index.html'?'':x}</loc><lastmod>${updated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log('Built eight static pages and sitemap.');
