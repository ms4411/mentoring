/* =============================================================================
   📌 app.js - JavaScript 핵심 개념 총정리
   =============================================================================
   이 파일에서 배우는 것들:
   1. 변수 (const)
   2. 배열 (Array), 객체 (Object)
   3. 함수 (매개변수, return)
   4. 조건문 (if/else)
   5. 반복문 (for, for...of, for...in)
   6. 클래스 (Class): constructor, this, 메서드
   7. 상속 (Inheritance): extends, super
   8. OOP 4대 원칙: 캡슐화, 상속, 다형성, 추상화
   9. DOM 조작: querySelector, querySelectorAll, addEventListener
   10. 실무: 다크모드 토글, 햄버거 메뉴, IntersectionObserver
   ============================================================================= */

/* =============================================================================
   🔹 PART 1: OOP(객체지향 프로그래밍) 4대 원칙 + 클래스 + 상속
   =============================================================================

   OOP 4대 원칙이란?
   ┌──────────┬──────────────────────────────────────────────┐
   │ 원칙      │ 설명                                         │
   ├──────────┼──────────────────────────────────────────────┤
   │ 캡슐화    │ 데이터와 메서드를 하나로 묶고, 외부에서 직접  │
   │          │ 접근 못하게 보호 (#private 필드 사용)          │
   ├──────────┼──────────────────────────────────────────────┤
   │ 상속      │ 부모 클래스의 기능을 자식이 물려받아 재사용    │
   │          │ (extends, super 키워드 사용)                   │
   ├──────────┼──────────────────────────────────────────────┤
   │ 다형성    │ 같은 이름의 메서드가 클래스마다 다르게 동작    │
   │          │ (부모의 메서드를 자식이 "오버라이딩")           │
   ├──────────┼──────────────────────────────────────────────┤
   │ 추상화    │ 복잡한 내부 구현을 숨기고, 간단한 인터페이스만 │
   │          │ 외부에 제공 (사용자는 "어떻게" 아닌 "무엇을")  │
   └──────────┴──────────────────────────────────────────────┘
   ============================================================================= */

/* -----------------------------------------------------------------------------
   📌 추상화(Abstraction) + 캡슐화(Encapsulation)의 기본: Component 클래스

   "추상화"란?
   → 여러 UI 요소(테마매니저, 메뉴컨트롤러 등)의 공통 동작을 뽑아내서
     하나의 "틀"(=부모 클래스)로 만드는 것.
   → 사용자는 component.init() 만 호출하면 됨. 내부 동작은 몰라도 OK!

   "캡슐화"란?
   → #이름 형태의 private 필드를 사용하면 클래스 외부에서 직접 접근 불가.
   → 데이터를 보호하고, getter 메서드를 통해서만 읽을 수 있게 함.
   → 예: this.#name은 외부에서 component.#name 으로 접근하면 에러!
         대신 component.getName() 으로만 접근 가능.
   ----------------------------------------------------------------------------- */
class Component {
  // 📌 캡슐화: #(해시)로 시작하는 필드는 "private" → 클래스 외부에서 접근 불가!
  // 왜? 외부에서 마음대로 이름을 바꾸면 시스템이 꼬일 수 있으니까 보호하는 것.
  #name;

  // 📌 constructor: 클래스로 객체를 만들 때(new) 자동으로 실행되는 함수
  // 📌 this: "지금 만들어지는 이 객체 자신"을 가리킴
  constructor(name) {
    this.#name = name; // private 필드에 이름 저장
    this.isActive = false; // 활성화 상태 (public)
  }

  // 📌 캡슐화의 getter: private 필드를 읽을 수 있는 "공식 통로"
  getName() {
    return this.#name;
  }

  // 📌 추상화: init()이라는 간단한 인터페이스만 제공.
  //    내부적으로 뭘 하는지는 자식 클래스마다 다르게 구현함 (→ 다형성과 연결!)
  init() {
    this.isActive = true;
    console.log(`[${this.#name}] 초기화 완료`);
  }

  // 📌 다형성(Polymorphism)을 위한 메서드
  // 이 메서드는 "자식 클래스에서 같은 이름으로 다시 정의(오버라이딩)"될 예정!
  // → 같은 getStatus()를 호출해도 ThemeManager와 MenuController가 다른 결과를 반환
  getStatus() {
    return `${this.#name}: ${this.isActive ? "활성" : "비활성"}`;
  }
}

/* -----------------------------------------------------------------------------
   📌 상속(Inheritance): ThemeManager extends Component

   "상속"이란?
   → 부모(Component)의 모든 기능(필드, 메서드)을 자식(ThemeManager)이 물려받음.
   → 코드 중복 없이 기존 기능을 재사용하면서 새 기능을 추가!

   extends: "이 클래스는 저 클래스를 확장(상속)합니다"
   super(): "부모 클래스의 constructor를 먼저 실행해주세요"
            (상속받을 때 반드시 호출해야 함!)

   📌 다형성(Polymorphism): getStatus() 오버라이딩
   → 부모의 getStatus()를 "덮어쓰기"해서 ThemeManager만의 동작으로 변경
   → 이게 다형성! 같은 메서드 이름이지만 클래스마다 다르게 동작.
   ----------------------------------------------------------------------------- */
class ThemeManager extends Component {
  #isDark; // 캡슐화: 다크모드 상태도 private으로 보호

  constructor() {
    // 📌 super(): 부모(Component)의 constructor(name)를 호출
    super("ThemeManager");
    this.#isDark = false;
  }

  // 다크모드 토글 메서드
  toggle() {
    this.#isDark = !this.#isDark;
    // 📌 DOM 조작: body에 "dark" 클래스를 추가/제거
    document.body.classList.toggle("dark");
    return this.#isDark;
  }

  // 현재 다크모드 상태 확인 (캡슐화된 getter)
  isDarkMode() {
    return this.#isDark;
  }

  // 📌 다형성: 부모의 getStatus()를 오버라이딩(덮어쓰기)!
  // 부모는 "이름: 활성/비활성"만 반환하지만,
  // ThemeManager는 "다크모드 켜짐/꺼짐" 정보도 추가로 반환함.
  getStatus() {
    return `${this.getName()}: 다크모드 ${this.#isDark ? "켜짐 🌙" : "꺼짐 ☀️"}`;
  }
}

/* -----------------------------------------------------------------------------
   📌 상속 + 다형성: MenuController extends Component

   또 하나의 자식 클래스. 햄버거 메뉴 제어를 담당.
   Component를 상속받으므로 init(), getName(), getStatus() 모두 사용 가능.
   getStatus()를 오버라이딩해서 메뉴 상태에 맞는 정보를 반환.
   ----------------------------------------------------------------------------- */
class MenuController extends Component {
  #isOpen;
  #menuElement; // DOM 요소 참조 (캡슐화)

  constructor(menuSelector) {
    super("MenuController");
    this.#isOpen = false;
    // 📌 querySelector: CSS 선택자로 HTML 요소를 찾아옴
    this.#menuElement = document.querySelector(menuSelector);
  }

  // 메뉴 열기/닫기 토글
  toggle() {
    this.#isOpen = !this.#isOpen;
    // classList.toggle: 클래스가 있으면 제거, 없으면 추가
    if (this.#menuElement) {
      this.#menuElement.classList.toggle("open");
    }
    return this.#isOpen;
  }

  // 메뉴 강제 닫기
  close() {
    this.#isOpen = false;
    if (this.#menuElement) {
      this.#menuElement.classList.remove("open");
    }
  }

  // 📌 다형성: getStatus() 오버라이딩 — 메뉴 열림/닫힘 상태 반환
  getStatus() {
    return `${this.getName()}: 메뉴 ${this.#isOpen ? "열림 📂" : "닫힘 📁"}`;
  }
}

/* -----------------------------------------------------------------------------
   📌 상속 + 캡슐화: ScrollAnimator extends Component

   IntersectionObserver를 활용한 스크롤 페이드인 애니메이션 담당.
   복잡한 Observer 로직을 클래스 내부에 캡슐화 → 외부에서는 init()만 호출!
   이것이 "추상화"의 힘: 복잡한 것을 감추고 간단한 인터페이스만 제공.
   ----------------------------------------------------------------------------- */
class ScrollAnimator extends Component {
  #observer; // IntersectionObserver 인스턴스 (private)

  constructor() {
    super("ScrollAnimator");
    this.#observer = null;
  }

  // 📌 다형성: init()도 오버라이딩 가능!
  // 부모의 init()은 단순히 isActive=true + 로그만 출력하지만,
  // ScrollAnimator의 init()은 IntersectionObserver까지 설정함.
  init() {
    // 📌 super.init(): 부모의 init()을 먼저 실행 (isActive = true 설정)
    super.init();
    this.#setupObserver();
  }

  // 📌 캡슐화: #으로 시작하는 private 메서드 → 외부에서 호출 불가
  // 내부 구현을 숨기는 것 = 캡슐화의 핵심!
  #setupObserver() {
    /* =============================================
       📌 IntersectionObserver란?
       "요소가 화면(뷰포트)에 보이는지"를 자동으로 감시하는 브라우저 API.

       왜 쓰나?
       - 스크롤 이벤트를 직접 감시하면 성능이 나쁨 (1초에 수십번 발생)
       - IntersectionObserver는 브라우저가 최적화해서 감시 → 성능 좋음!

       동작 원리:
       1. observer.observe(element) → 이 요소를 감시 시작
       2. 요소가 화면에 보이면 → 콜백 함수 실행
       3. 콜백에서 "visible" 클래스 추가 → CSS transition으로 애니메이션!

       threshold: 0.15 = 요소가 15% 이상 보이면 콜백 실행
    ============================================= */
    this.#observer = new IntersectionObserver(
      (entries) => {
        // 📌 for...of 반복문: 배열(또는 유사 배열)의 각 "값"을 순회
        // for...of는 배열의 값(value)을 직접 꺼내옴!
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.15 },
    );

    // 📌 querySelectorAll: 조건에 맞는 모든 요소를 NodeList로 반환
    // querySelector: 첫 번째 하나만 / querySelectorAll: 전부 다!
    const fadeElements = document.querySelectorAll(".fade-in");

    // 📌 for...of로 NodeList 순회 → 각 요소를 observer에 등록
    for (const element of fadeElements) {
      this.#observer.observe(element);
    }
  }

  getStatus() {
    const count = document.querySelectorAll(".fade-in.visible").length;
    const total = document.querySelectorAll(".fade-in").length;
    return `${this.getName()}: ${count}/${total} 요소 표시됨`;
  }
}

/* =============================================================================
   🔹 PART 2: 변수(const), 배열(Array), 객체(Object)
   =============================================================================

   📌 const: 값을 재할당할 수 없는 변수 선언
   - const name = "홍길동";  →  name = "임꺽정"; ← 에러!
   - 하지만 배열/객체의 "내용물"은 변경 가능 (참조가 안 바뀌니까)
   - const arr = [1,2]; → arr.push(3); ← OK!  arr = [4,5]; ← 에러!

   📌 배열(Array): 여러 값을 순서대로 저장하는 자료구조
   - const fruits = ["사과", "바나나", "포도"];
   - fruits[0] → "사과" (인덱스는 0부터 시작!)

   📌 객체(Object): key-value 쌍으로 데이터를 저장
   - const person = { name: "홍길동", age: 17 };
   - person.name → "홍길동"
   ============================================================================= */

// 📌 학생 데이터 배열 - 각 요소가 "객체(Object)"
// 배열 안에 객체를 넣으면 → 여러 학생의 정보를 체계적으로 관리할 수 있음!
const students = [
  { name: "김민수", grade: 92, major: "프론트엔드" },
  { name: "이서연", grade: 88, major: "백엔드" },
  { name: "박지훈", grade: 75, major: "프론트엔드" },
  { name: "최수아", grade: 95, major: "디자인" },
  { name: "정우진", grade: 60, major: "백엔드" },
];

/* =============================================================================
   🔹 PART 3: 함수 (매개변수, return)
   =============================================================================

   📌 함수란?
   → 특정 작업을 수행하는 코드 블록. 재사용 가능!

   📌 매개변수(Parameter): 함수에 전달하는 입력값
   📌 return: 함수가 결과를 돌려주는 키워드

   function 더하기(a, b) {    ← a, b가 매개변수
     return a + b;            ← 결과를 반환
   }
   더하기(3, 5);              ← 8을 반환
   ============================================================================= */

// 📌 함수: 성적에 따라 등급 문자열을 반환
// 매개변수: grade (숫자)
// return: 등급 문자열
function getGradeLabel(grade) {
  // 📌 조건문 (if / else if / else)
  // 조건이 true이면 해당 블록 실행, 아니면 다음 조건으로 넘어감
  if (grade >= 90) {
    return "우수 🏆"; // 90점 이상
  } else if (grade >= 80) {
    return "양호 👍"; // 80~89점
  } else if (grade >= 70) {
    return "보통 📚"; // 70~79점
  } else {
    return "노력 필요 💪"; // 70점 미만
  }
}

// 📌 함수: 성적에 따라 CSS 클래스명을 반환 (카드 색상 결정용)
function getGradeClass(grade) {
  if (grade >= 90) return "grade-high";
  if (grade >= 70) return "grade-mid";
  return "grade-low";
}

/* =============================================================================
   🔹 PART 4: 학생 카드 렌더링 (반복문 + DOM 조작)
   =============================================================================

   📌 반복문의 3가지 종류:
   ┌─────────────┬────────────────────────────────────────┐
   │ 종류         │ 용도                                    │
   ├─────────────┼────────────────────────────────────────┤
   │ for          │ 인덱스(숫자)가 필요할 때. 가장 기본적.   │
   │ for...of     │ 배열의 "값"을 하나씩 꺼낼 때. 깔끔!     │
   │ for...in     │ 객체의 "키(key)"를 하나씩 꺼낼 때.      │
   └─────────────┴────────────────────────────────────────┘
   ============================================================================= */

// 학생 카드를 화면에 그리는 함수
function renderStudentCards() {
  // 📌 querySelector: CSS 선택자로 HTML 요소 1개를 가져옴
  const container = document.querySelector("#studentCards");
  if (!container) return; // about.html 등에서는 이 요소가 없으므로 안전하게 종료

  container.innerHTML = ""; // 기존 내용 비우기

  // ═══════════════════════════════════════════════════
  // 📌 for...of 반복문: 배열의 각 "값(value)"을 순회
  //
  // for (const student of students) {
  //   → students 배열에서 객체를 하나씩 꺼내서 student에 담음
  //   → 첫 바퀴: student = { name: '김민수', grade: 92, major: '프론트엔드' }
  //   → 둘째 바퀴: student = { name: '이서연', grade: 88, major: '백엔드' }
  //   → ... 배열 끝까지 반복
  // }
  //
  // for...of vs for...in 차이:
  // for...of → 배열의 값(value) 순회: "김민수", "이서연", ...
  // for...in → 배열의 인덱스(key) 순회: 0, 1, 2, ...
  // ═══════════════════════════════════════════════════
  for (const student of students) {
    const card = document.createElement("div");
    card.className = "student-card";

    // 📌 함수 호출: 매개변수로 student.grade를 전달 → return값을 받아서 사용
    const gradeLabel = getGradeLabel(student.grade);
    const gradeClass = getGradeClass(student.grade);

    // innerHTML: HTML 문자열을 요소 안에 삽입
    // 템플릿 리터럴(`...`): 백틱 안에서 ${변수}로 변수값 삽입 가능!
    card.innerHTML = `
      <h3>${student.name}</h3>
      <p>전공: ${student.major}</p>
      <p>성적: ${student.grade}점</p>
      <span class="grade-badge ${gradeClass}">${gradeLabel}</span>
    `;

    container.appendChild(card); // 컨테이너에 카드 추가
  }
}

/* =============================================================================
   🔹 PART 5: 통계 계산 (for 반복문 + for...in)
   ============================================================================= */

function renderStats() {
  const statsOutput = document.querySelector("#statsOutput");
  if (!statsOutput) return;

  // ═══════════════════════════════════════════════════
  // 📌 기본 for 반복문: 인덱스(i)로 배열 순회
  //
  // for (let i = 0; i < students.length; i++) {
  //   → i가 0부터 시작, students.length(=5)보다 작을 때까지, 1씩 증가
  //   → students[i]로 각 학생에 접근
  // }
  //
  // 인덱스가 필요할 때 유용! (예: "1번째 학생", "2번째 학생" 표시)
  // ═══════════════════════════════════════════════════
  let totalGrade = 0;
  let highestGrade = 0;
  let highestStudent = "";

  for (let i = 0; i < students.length; i++) {
    totalGrade += students[i].grade;

    // 📌 조건문: 최고점 학생 찾기
    if (students[i].grade > highestGrade) {
      highestGrade = students[i].grade;
      highestStudent = students[i].name;
    }
  }

  const average = totalGrade / students.length;

  // ═══════════════════════════════════════════════════
  // 📌 for...in 반복문: 객체의 "키(key)"를 순회
  //
  // const obj = { a: 1, b: 2, c: 3 };
  // for (const key in obj) {
  //   console.log(key);     → "a", "b", "c"  (키 이름)
  //   console.log(obj[key]); → 1, 2, 3       (값)
  // }
  //
  // 여기서는: 전공별 학생 수를 세기 위해 사용
  // majorCount = { '프론트엔드': 2, '백엔드': 2, '디자인': 1 }
  // for...in으로 각 전공(key)을 순회하며 출력!
  // ═══════════════════════════════════════════════════
  const majorCount = {}; // 빈 객체 생성

  // 먼저 전공별 학생 수를 집계 (for...of로 배열 순회)
  for (const student of students) {
    const major = student.major;
    if (majorCount[major]) {
      majorCount[major] += 1; // 이미 있으면 +1
    } else {
      majorCount[major] = 1; // 처음이면 1로 시작
    }
  }

  // 📌 for...in으로 객체(majorCount)의 키를 순회하여 문자열 생성
  let majorText = "";
  for (const major in majorCount) {
    majorText += `  - ${major}: ${majorCount[major]}명\n`;
  }

  statsOutput.innerHTML = `
    <strong>📊 학생 통계</strong><br>
    총 학생 수: ${students.length}명<br>
    평균 성적: ${average.toFixed(1)}점<br>
    최고 성적: ${highestStudent} (${highestGrade}점)<br><br>
    <strong>📂 전공별 분포:</strong><br>
    ${majorText.replace(/\n/g, "<br>")}
  `;
}

/* =============================================================================
   🔹 PART 6: JS 핵심 개념 데모 출력
   ============================================================================= */

function renderJSConceptsDemo() {
  const output = document.querySelector("#jsOutput");
  if (!output) return;

  let text = "";

  // --- 변수 ---
  text += "═══ 변수 (const) ═══\n";
  const siteName = "프론트엔드 학습";
  const version = 2;
  text += `const siteName = "${siteName}"\n`;
  text += `const version = ${version}\n\n`;

  // --- 배열 ---
  text += "═══ 배열 (Array) ═══\n";
  const skills = ["HTML", "CSS", "JavaScript"];
  text += `skills = [${skills.join(", ")}]\n`;
  text += `skills[0] = ${skills[0]}  (인덱스는 0부터!)\n`;
  text += `skills.length = ${skills.length}\n\n`;

  // --- 객체 ---
  text += "═══ 객체 (Object) ═══\n";
  const project = {
    name: "프론트엔드 학습",
    year: 2026,
    isActive: true,
  };
  text += `project.name = "${project.name}"\n`;
  text += `project.year = ${project.year}\n\n`;

  // --- 함수 ---
  text += "═══ 함수 (매개변수, return) ═══\n";
  function multiply(a, b) {
    return a * b;
  }
  text += `multiply(4, 5) = ${multiply(4, 5)}\n`;
  text += `getGradeLabel(92) = "${getGradeLabel(92)}"\n\n`;

  // --- 조건문 ---
  text += "═══ 조건문 (if/else) ═══\n";
  const testScore = 85;
  if (testScore >= 90) {
    text += `${testScore}점 → 우수\n`;
  } else if (testScore >= 80) {
    text += `${testScore}점 → 양호\n`;
  } else {
    text += `${testScore}점 → 보통\n`;
  }
  text += "\n";

  // --- 반복문 3종 비교 ---
  text += "═══ 반복문 비교 (for / for...of / for...in) ═══\n";

  // for: 인덱스 기반
  text += "▸ for (인덱스 기반):\n";
  for (let i = 0; i < skills.length; i++) {
    text += `  skills[${i}] = ${skills[i]}\n`;
  }

  // for...of: 값 기반
  text += "▸ for...of (값 기반):\n";
  for (const skill of skills) {
    text += `  skill = ${skill}\n`;
  }

  // for...in: 키(key) 기반 — 객체에 사용
  text += "▸ for...in (키 기반 - 객체 순회):\n";
  for (const key in project) {
    text += `  project.${key} = ${project[key]}\n`;
  }

  output.textContent = text;
}

/* =============================================================================
   🔹 PART 7: OOP 4대 원칙 데모 출력
   ============================================================================= */

function renderOOPDemo() {
  const output = document.querySelector("#oopOutput");
  if (!output) return;

  let text = "";

  // --- 캡슐화 데모 ---
  text += "═══ 1. 캡슐화 (Encapsulation) ═══\n";
  text += "ThemeManager 내부의 #isDark는 외부에서 직접 접근 불가!\n";
  text += "themeManager.isDarkMode() 메서드로만 상태를 읽을 수 있음.\n";
  text += "→ 데이터를 보호하고, 정해진 통로로만 접근하게 강제!\n\n";

  // --- 상속 데모 ---
  text += "═══ 2. 상속 (Inheritance) ═══\n";
  text +=
    "Component (부모) → ThemeManager, MenuController, ScrollAnimator (자식)\n";
  text += "자식들은 부모의 getName(), init(), getStatus()를 물려받음.\n";
  text += "extends로 상속 선언, super()로 부모 생성자 호출.\n\n";

  // --- 다형성 데모 ---
  text += "═══ 3. 다형성 (Polymorphism) ═══\n";
  text += "모든 컴포넌트에 getStatus()를 호출하면 각각 다른 결과:\n";

  // 📌 다형성 실전: 같은 getStatus() 메서드지만 결과가 다름!
  // 부모 타입의 배열에 서로 다른 자식 객체를 담아서 동일 메서드 호출
  const themeDemo = new ThemeManager();
  const menuDemo = new MenuController("#navMenu");
  const scrollDemo = new ScrollAnimator();

  // 📌 배열에 서로 다른 타입의 객체를 담고, 동일한 메서드를 호출
  // → 이것이 다형성의 핵심! "하나의 인터페이스, 여러 구현"
  const components = [themeDemo, menuDemo, scrollDemo];

  for (const comp of components) {
    text += `  ${comp.getStatus()}\n`;
  }
  text += "→ 같은 getStatus()인데 클래스마다 다른 결과 = 다형성!\n\n";

  // --- 추상화 데모 ---
  text += "═══ 4. 추상화 (Abstraction) ═══\n";
  text += "Component 클래스가 공통 인터페이스(init, getStatus)를 정의.\n";
  text += "사용자는 comp.init()만 호출하면 됨.\n";
  text += "ThemeManager가 내부에서 뭘 하는지, ScrollAnimator가\n";
  text += "IntersectionObserver를 어떻게 설정하는지 몰라도 OK!\n";
  text += "→ 복잡한 구현을 숨기고 간단한 사용법만 제공 = 추상화!\n";

  output.textContent = text;
}

/* =============================================================================
   🔹 PART 8: 모든 것을 연결! (초기화)
   =============================================================================

   📌 addEventListener: HTML 요소에 이벤트(클릭, 스크롤 등)가 발생했을 때
      실행할 함수를 등록하는 메서드.

   사용법: element.addEventListener('이벤트종류', 실행할함수);
   예: button.addEventListener('click', () => { alert('클릭!'); });

   📌 화살표 함수 (() => {})
   function() {} 의 짧은 표기법.
   const add = (a, b) => a + b;  ← return도 생략 가능 (한 줄일 때)
   ============================================================================= */

// --- 실제 사용할 OOP 인스턴스 생성 ---
const themeManager = new ThemeManager();
const menuController = new MenuController("#navMenu");
const scrollAnimator = new ScrollAnimator();

// --- DOM 요소 가져오기 ---
// 📌 querySelector: CSS 선택자로 HTML 요소 1개를 찾아서 가져옴
// '#themeBtn' → id가 "themeBtn"인 요소
// '.hero' → class가 "hero"인 첫 번째 요소
const themeBtn = document.querySelector("#themeBtn");
const greetBtn = document.querySelector("#greetBtn");
const menuBtn = document.querySelector("#menuBtn");
const addStudentBtn = document.querySelector("#addStudentBtn");

// --- 이벤트 리스너 등록 ---

// 📌 다크모드 토글: ThemeManager 클래스의 toggle() 메서드 사용
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = themeManager.toggle();
    // 버튼 텍스트를 현재 상태에 맞게 변경
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    console.log(themeManager.getStatus());
  });
}

// 📌 인사하기 버튼
if (greetBtn) {
  greetBtn.addEventListener("click", () => {
    alert("반갑습니다! 여러분의 멋진 서비스를 기대할게요! 🚀");
    console.log("인사하기 버튼 클릭됨");
  });
}

// 📌 햄버거 메뉴 토글: MenuController 클래스 사용
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    menuController.toggle();
    console.log(menuController.getStatus());
  });
}

// 📌 학생 추가 버튼: 배열에 새 객체 추가 후 다시 렌더링
if (addStudentBtn) {
  addStudentBtn.addEventListener("click", () => {
    // 📌 배열의 push() 메서드: 배열 끝에 새 요소 추가
    const newNames = ["강하늘", "윤서준", "한예린", "송민호", "임채원"];
    const newMajors = ["프론트엔드", "백엔드", "디자인"];
    const randomName = newNames[Math.floor(Math.random() * newNames.length)];
    const randomMajor = newMajors[Math.floor(Math.random() * newMajors.length)];
    const randomGrade = Math.floor(Math.random() * 41) + 60; // 60~100점

    students.push({
      name: randomName,
      grade: randomGrade,
      major: randomMajor,
    });

    // 카드와 통계를 다시 그림
    renderStudentCards();
    renderStats();
    console.log(
      `학생 추가됨: ${randomName} (${randomGrade}점, ${randomMajor})`,
    );
  });
}

// --- 초기 렌더링 실행 ---

// 📌 컴포넌트 초기화 (OOP의 추상화: init()만 호출하면 됨!)
themeManager.init();
menuController.init();
scrollAnimator.init(); // IntersectionObserver 자동 설정됨

// 📌 학생 카드, 통계, JS 개념 데모, OOP 데모 렌더링
renderStudentCards();
renderStats();
renderJSConceptsDemo();
renderOOPDemo();

// --- 콘솔에 OOP 다형성 최종 데모 출력 ---
console.log("═══ OOP 다형성 최종 데모 (F12 콘솔 확인) ═══");
const allComponents = [themeManager, menuController, scrollAnimator];
for (const comp of allComponents) {
  // 📌 다형성: 같은 getStatus()지만 각각 다른 결과!
  console.log(comp.getStatus());
}
