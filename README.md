# NDT & SHM Lab

경북대학교 건축학부 강상구 교수의 연구실 홈페이지입니다.

홈, 연구분야, 교수 소개, Publications, 연락처 페이지를 제공합니다. 한국어/영어 전환, 화면 테마 전환, 논문 제목·저자·학술지 검색과 연도 필터를 지원합니다. 논문과 교수 소개는 JavaScript 없이도 읽을 수 있도록 HTML에 포함됩니다.

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

- `app.js`: 페이지 구성, 한국어/영어 문구와 인터랙션
- `publications.js`: 논문 데이터. 연도, 분류, 제목, 저자, 학술지, Scholar 문헌 ID, 선택적 DOI 순서입니다.
- `style.css`: 화면 구성과 반응형 스타일
- `build.cjs`: 검색엔진·JavaScript 미사용 환경을 위한 HTML 생성

위 파일을 수정한 뒤 빌드를 실행하고, 생성된 HTML과 변경 파일을 함께 커밋합니다. 인용 지표는 실시간 연동이 아닌 **2026-10-13 확인 값**이며, `app.js`에서 지표와 확인 날짜를 함께 수정해야 합니다. 논문 목록도 수동으로 관리합니다.

## 정보 출처

- 교수 공식 프로필: https://research.knu.ac.kr/en/persons/sanggoo-kang/
- Google Scholar: https://scholar.google.com/citations?hl=ko&user=CzZ7ILAAAAAJ
- 대학 주소: https://www.knu.ac.kr/wbbs/wbbs/main/main.action

연구 개념도는 코드로 제작한 설명용 도식입니다. 구성원, 연구실 호실, 연구실 사진은 확인되지 않아 추가하지 않았습니다. 주소는 대학 주소이며, 실제 방문 장소는 교수에게 확인해야 합니다.
