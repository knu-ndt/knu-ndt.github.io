# NDT & SHM Lab

경북대학교 건축학부 강상구 교수의 연구실 홈페이지입니다.

홈, 연구분야, People, Publications, Gallery, 연락처 페이지를 제공합니다. 한국어/영어 전환, 화면 테마 전환, 논문 제목·저자·학술지 검색과 연도 필터를 지원합니다. 논문과 구성원 소개는 JavaScript 없이도 읽을 수 있도록 HTML에 포함됩니다.

## GitHub Pages 배포

1. GitHub 사용자명 `knu-ndt`로 공개 저장소 `knu-ndt.github.io`를 생성합니다.
2. 이 폴더의 파일을 저장소 루트에 업로드합니다. `index.html`이 최상위에 있어야 합니다.
3. 저장소 **Settings → Pages → Build and deployment**에서 **Deploy from a branch**, **main**, **/ (root)**를 선택하고 저장합니다.
4. 배포가 완료되면 `https://knu-ndt.github.io/`에서 확인합니다.

`.nojekyll`은 정적 파일을 그대로 게시하도록 합니다. 다른 계정이나 조직을 사용할 경우 `build.cjs`의 `origin`과 `robots.txt`의 사이트 주소를 변경하세요.

## 수정과 빌드

Node.js 외 추가 패키지가 필요 없습니다.

```sh
node build.cjs
```

- `app.js`: 페이지 구성, 한국어/영어 문구와 인터랙션. 상단 `labData`에 구성원·갤러리 데이터를 입력합니다.
  - `members`: 과정별 구성원, 시작 시기, 이력, 선택적 `photo` 경로. 사진이 없으면 프로필 아이콘을 표시합니다. 학생 영문 이름은 공식 표기를 받으면 `nameEn`에 추가합니다.
  - `gallery`: 사진 경로, 제목, 촬영일과 설명. 제목과 설명은 `[한국어, 영어]` 배열입니다.
  - 사진은 `assets/` 폴더에 넣고 상대 경로를 입력합니다. 실제 자료만 등록하세요.
- `publications.js`: 논문 데이터. 연도, 분류, 제목, 저자, 학술지, Scholar 문헌 ID, 선택적 DOI 순서입니다.
- `style.css`: 화면 구성과 반응형 스타일
- `build.cjs`: 검색엔진·JavaScript 미사용 환경을 위한 HTML 생성

위 파일을 수정한 뒤 빌드를 실행하고, 생성된 HTML과 변경 파일을 함께 커밋합니다. 인용 지표는 실시간 연동이 아닌 **2026-10-13 확인 값**이며, `app.js`에서 지표와 확인 날짜를 함께 수정해야 합니다. 논문 목록도 수동으로 관리합니다.

## 정보 출처

- 교수 공식 프로필: https://research.knu.ac.kr/en/persons/sanggoo-kang/
- Google Scholar: https://scholar.google.com/citations?hl=ko&user=CzZ7ILAAAAAJ
- 대학 주소: https://www.knu.ac.kr/wbbs/wbbs/main/main.action

연구 개념도는 코드로 제작한 설명용 도식입니다. 구성원 정보는 연구실이 제공한 과정과 시기를 반영했습니다. 박재한의 석사 졸업 이력은 현재 박사과정 프로필에 함께 표시합니다. 정성원은 입학 예정으로 구분합니다. 갤러리는 실제 자료를 받은 뒤 추가하며, 연구실 호실은 아직 확인되지 않았습니다. 주소는 대학 주소이며, 실제 방문 장소는 교수에게 확인해야 합니다.

## 공유 미리보기와 SEO

모든 HTML의 Open Graph 대표 이미지는 경북대학교 공식 엠블럼에 흰 여백을 넣은 600×315 JPEG입니다. 마크의 원본 크기·비율·색상을 유지하며 카카오톡의 가로형 미리보기에서 잘리지 않도록 했습니다. 공개 이미지 서비스 wsrv.nl이 대학 원본을 읽고 여백을 추가합니다. 원본 주소는 build.cjs의 officialEmblem, 공유용 주소는 shareImage입니다. 대학 원본 주소가 변경되거나 이미지 서비스에 문제가 생기면 해당 값을 갱신하거나 같은 이미지를 저장소에 직접 업로드해 교체합니다. 구성원 정보나 사이트 방문자 정보는 이미지 서비스에 전달하지 않습니다.

페이지별 제목·설명, canonical, robots, Open Graph, Twitter 카드와 ResearchOrganization·Person·WebSite·WebPage·BreadcrumbList JSON-LD를 HTML에 포함합니다. 교수 소개의 이전 주소는 people.html을 canonical로 사용하고, sitemap에는 대표 URL 6개만 넣습니다. sitemap의 lastmod는 실제 수정일을 반영해 갱신하세요. 언어 전환은 같은 URL에서 동작하므로 별도 영어 hreflang URL을 만들지 않았습니다.

카카오톡에 이전 미리보기가 남아 있으면 카카오디벨로퍼스의 카카오톡 URL 메타정보 관리에서 해당 URL의 캐시를 초기화합니다. 사이트맵: https://knu-ndt.github.io/sitemap.xml . Google Search Console과 네이버 서치어드바이저의 사이트 소유권 확인·등록은 해당 계정에서 진행해야 합니다.

엠블럼 출처: https://www.knu.ac.kr/wbbs/wbbs/contents/index.action?menu_idx=194&menu_url=intro/about04

## 2026-10-15 변경

홈의 structure-visual.svg는 구조물·센싱·안전성 평가를 표현한 설명용 일러스트이며 실제 연구실 측정 결과가 아닙니다. 연구분야에는 건설안전을 추가했습니다. Awards 페이지와 국제 학술대회 분류는 제거했습니다. Publications는 국제 학술지·국내 학술지·특허·학위논문으로 구분합니다.

publications.js의 각 항목은 [연도, 분류, 제목, 저자, 발행처 또는 특허 번호, 고유 ID, 선택적 DOI, 선택적 원출처 URL, 선택적 링크 명칭]입니다. 특허 분류는 patent입니다. Scholar에 없는 대학 학위논문이나 특허는 원출처 URL과 링크 명칭을 넣습니다. 박재한의 석사학위논문은 경북대학교 dCollection 000000112159에서 확인했습니다. 발행연도 2025와 학위수여 2026.02를 구분해 표기합니다. 확인되지 않은 제목·특허 번호를 추측해 입력하지 마세요.

박재한 석사학위논문 원출처: https://dcollection.knu.ac.kr/srch/srchDetail/000000112159 (국문·영문 제목, 저자, 지도교수 강상구, 학위명 석사, 발행연도 2025, 학위수여 2026.2 확인).
