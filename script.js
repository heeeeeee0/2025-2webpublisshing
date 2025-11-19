// ============================
// 부드러운 스크롤 이동 (UX)
// ============================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth' });
  });
});

// ============================
// 모바일 메뉴 Toggle (U3: classList.toggle)
// ============================
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav__list');

if (navToggle && navList) {
  navToggle.addEventListener('click', function () {
    navList.classList.toggle('nav__list--open');
  });

  // 메뉴 항목 클릭 시 자동 닫기
  navList.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navList.classList.remove('nav__list--open');
    }
  });
}

// ============================
// 스크롤 탑 버튼
// ============================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============================
// setTimeout: 일정 시간 뒤 배너 표시 (U4)
// ============================
const notifyBanner = document.getElementById('notifyBanner');
const bannerCloseBtn = document.getElementById('bannerCloseBtn');

if (notifyBanner && bannerCloseBtn) {
  const timeoutId = setTimeout(function () {
    notifyBanner.classList.add('notify-banner--visible');
  }, 2000);

  bannerCloseBtn.addEventListener('click', function () {
    notifyBanner.classList.remove('notify-banner--visible');
    clearTimeout(timeoutId);
  });
}

// ============================
// setInterval + clearInterval : 마라탕 한 줄 평 (U5, U6)
// ============================
const quoteText = document.getElementById('quoteText');
const quotePauseBtn = document.getElementById('quotePauseBtn');
const quoteResumeBtn = document.getElementById('quoteResumeBtn');

const quotes = [
  '마라탕은 국물의 예술이다.',
  '오늘의 고민은 내일의 마라탕으로 잊자.',
  '얼얼할수록 행복해지는 신비한 음식.',
  '추운 날엔 마라탕이 최고의 히터다.',
  '나만의 재료 조합을 찾는 재미, 마라탕.'
];

let quoteIndex = 0;
let quoteIntervalId = null;

function startQuoteRotation() {
  if (!quoteText || quoteIntervalId !== null) return;

  quoteIntervalId = setInterval(function () {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteText.textContent = quotes[quoteIndex];
  }, 3000);
}

function stopQuoteRotation() {
  if (quoteIntervalId !== null) {
    clearInterval(quoteIntervalId);
    quoteIntervalId = null;
  }
}

// 초기 시작
startQuoteRotation();

if (quotePauseBtn) {
  quotePauseBtn.addEventListener('click', function () {
    stopQuoteRotation();
  });
}

if (quoteResumeBtn) {
  quoteResumeBtn.addEventListener('click', function () {
    startQuoteRotation();
  });
}

// ============================
// Form 유효성 검사 (U7)
// ============================
const feedbackForm = document.getElementById('feedbackForm');
const formMessage = document.getElementById('formMessage');

if (feedbackForm && formMessage) {
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('nameInput');
    const storeInput = document.getElementById('storeInput');
    const messageInput = document.getElementById('messageInput');

    if (
      !nameInput.value.trim() ||
      !storeInput.value.trim() ||
      !messageInput.value.trim()
    ) {
      formMessage.textContent = '모든 칸을 입력해 주세요! 😀';
      formMessage.style.color = '#c62828';
      alert('빈 칸 없이 입력해 주세요.'); // 경고창 (U7)
      return;
    }

    formMessage.textContent = '추천 감사합니다! 마라탕 맛집 리스트에 저장할게요. 🍲';
    formMessage.style.color = '#2e7d32';
    feedbackForm.reset();
  });
}

// ============================
// fetch API + async/await + JSON + DOM + Error 처리 (D1~D5)
// ============================
const apiContainer = document.getElementById('apiData');

async function loadExternalData() {
  if (!apiContainer) return;

  try {
    // D1: fetch API 사용 (외부 JSON / Mock API)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');

    if (!response.ok) {
      throw new Error('네트워크 응답이 정상이 아닙니다.');
    }

    // D3: JSON 변환
    const data = await response.json();

    // 기존 내용 초기화
    apiContainer.innerHTML = '';

    // D4: DOM 생성해서 출력
    const listEl = document.createElement('ul');
    listEl.className = 'api-data__list';

    data.forEach(function (item) {
      const li = document.createElement('li');
      li.className = 'api-data__item';

      const title = document.createElement('h3');
      title.className = 'api-data__title';
      title.textContent = item.title;

      const body = document.createElement('p');
      body.className = 'api-data__body';
      body.textContent = item.body;

      li.appendChild(title);
      li.appendChild(body);
      listEl.appendChild(li);
    });

    apiContainer.appendChild(listEl);
  } catch (error) {
    // D5: Error 처리
    console.error(error);
    apiContainer.innerHTML = '<p class="api-data__error">데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</p>';
  }
}

// D2: async/await 사용
loadExternalData();
