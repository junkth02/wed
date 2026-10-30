# 모바일 청첩장

GitHub Pages로 배포하는 정적 모바일 청첩장 템플릿입니다. 빌드 도구 없이 HTML/CSS/JS만 사용합니다.

## 구성

| 파일 | 내용 |
| --- | --- |
| `config.js` | 이름, 날짜, 장소, 인사말, 사진, 계좌 등 **모든 정보** — 보통 이 파일만 고치면 됩니다 |
| `index.html` | 페이지 구조 + 공유 미리보기(OG) 태그 |
| `style.css` | 디자인 (색상은 맨 위 `:root` 변수에서 변경) |
| `script.js` | 달력, D-day, 갤러리, 계좌 복사, 공유 기능 |
| `images/` | 사진 폴더 (지금은 임시 SVG) |

## 기능

- 커버 사진 / 인사말 / 양가 부모님 표기 / 전화·문자 연락하기
- 예식일 달력 자동 생성 + 실시간 카운트다운, D-day
- 사진 갤러리 (탭하면 전체화면, 스와이프 넘기기)
- 네이버 지도·카카오맵·티맵 바로가기, 주소 복사, 교통 안내
- 신랑측/신부측 계좌번호 접기·펼치기 + 복사
- 공유하기(모바일 공유 시트) / 링크 복사, 배경음악(선택)

## 수정하기

1. `config.js`에서 정보를 바꿉니다.
2. 사진을 `images/`에 넣고 `config.js`의 `cover`, `gallery` 경로를 바꿉니다.
   - 사진은 가로 1200px 정도, 장당 300KB 이하로 줄이면 로딩이 빠릅니다.
3. `index.html` 상단의 `<title>`, `og:title`, `og:description`, `og:image`를 바꿉니다.
   - `og:image`는 카카오톡 미리보기 사진이며 **전체 URL**이어야 합니다 (예: `https://아이디.github.io/wedding-invitation/images/og.jpg`, 가로 800×400 정도 권장).

## 로컬에서 보기

`index.html`을 브라우저로 바로 열어도 됩니다. 또는:

```bash
python -m http.server 8000
```

→ http://localhost:8000

## GitHub Pages 배포

1. GitHub에서 새 저장소 `wedding-invitation` 생성 (Public)
2. 이 폴더를 푸시
   ```bash
   git remote add origin https://github.com/아이디/wedding-invitation.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages → Branch: `main` / `(root)` → Save**
4. 1~2분 후 `https://아이디.github.io/wedding-invitation/` 에서 확인

> 카카오톡에서 미리보기가 예전 것으로 보이면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시를 초기화하세요.

## 참고

- 공개 저장소라 계좌번호·연락처가 누구에게나 보입니다. 원치 않으면 해당 항목을 비워두세요.
- 방명록·참석 여부(RSVP)는 서버가 필요해서 빠져 있습니다. 필요하면 Google Form 링크를 추가하는 방식이 가장 간단합니다.
