#프론트엔드 기초 웹사이트

대덕SW마이스터고 Node.js 풀스택 개발 입문반 학생들을 위한 프론트엔드 기초(HTML, CSS, JavaScript) 학습용 레퍼런스 프로젝트입니다. 

단순히 화면을 그리는 것을 넘어, 실무에서 사용하는 시맨틱 태그, CSS 애니메이션, 그리고 JavaScript 객체지향(OOP) 패턴까지 웹 프론트엔드의 핵심 원리를 하나의 프로젝트에 담았습니다.

## 📖 주요 학습 내용

### 1. HTML (웹의 뼈대)
- **시맨틱 태그**: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`를 활용한 SEO 및 접근성 최적화 구조.
- **문서 구조화**: 네비게이션, 히어로 섹션, 콘텐츠 영역의 올바른 분리.

### 2. CSS (웹의 옷)
- **Cascading & Box Model**: CSS의 상속 원리와 Block/Inline/Inline-Block 요소의 차이점 이해.
- **모던 UI 스킬**: Flexbox를 활용한 레이아웃 배치, 다크모드/라이트모드 테마 토글.
- **애니메이션**: `transition`과 `transform`을 활용한 부드러운 스크롤 페이드인(Fade-in) 효과.
- **반응형 웹**: `@media` 쿼리를 활용한 모바일 햄버거 메뉴 구현.

### 3. JavaScript (웹의 근육)
- **DOM 제어 및 이벤트**: `querySelector`, `addEventListener`를 활용한 사용자 상호작용 구현.
- **Intersection Observer**: 스크롤 위치를 감지하여 요소를 나타나게 하는 최신 웹 API 활용.
- **객체지향 프로그래밍(OOP)**: `Class`, `constructor`, `extends`를 활용하여 동적으로 학생 카드를 생성하는 심화 패턴.

---

## 📁 파일 구조

```text
📦 frontend-basics
 ┣ 📜 index.html    # 메인 페이지 (시맨틱 구조 및 각 개념 데모)
 ┣ 📜 about.html    # 서브 페이지 (페이지 간 이동 테스트용)
 ┣ 📜 style.css     # 전체 스타일링 및 다크모드/애니메이션 정의
 ┗ 📜 app.js        # 다크모드 토글, 스크롤 감지, OOP 기반 동적 렌더링 로직
