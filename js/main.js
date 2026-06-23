/**
 * 汕头市文化馆 - 交互逻辑 
 */
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLang();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // 初始化全局组件
  initLanguageSwitcher(currentLang);
  initScrollAnimations();
  initHeaderScroll();
  initMobileMenu();
  initBackToTop();

  // 根据页面路由渲染
  if (['floor1.html','floor2.html','floor3.html'].includes(currentPage)) {
    const floorNum = parseInt(currentPage.match(/\d/)[0]);
    renderFloorList(floorNum, currentLang);
  } else if (currentPage === 'detail.html') {
    renderDetailPage(currentLang);
    initLightbox();
  }

  // 翻译静态文本
  translatePage(currentLang);
});

/* ========== 工具函数 ========== */
function getCurrentLang() { return localStorage.getItem('lang') || 'zh'; }

/* ========== 多语言切换 ========== */
function initLanguageSwitcher(currentLang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
    btn.addEventListener('click', () => {
      localStorage.setItem('lang', btn.dataset.lang);
      window.location.reload();
    });
  });
}

function translatePage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N_TEXTS[key] && I18N_TEXTS[key][lang]) el.innerHTML = I18N_TEXTS[key][lang];
  });
  document.documentElement.lang = lang === 'zh-hant' ? 'zh-Hant' : (lang === 'en' ? 'en' : 'zh-Hans');
}

const I18N_TEXTS = {
  // === 首页专属词条 ===
  page_title: { zh: '汕头市文化馆 · 潮汕非物质文化遗产展示馆', en: 'Shantou Cultural Center · Chaoshan Intangible Culture Heritage Exhibition Hall', 'zh-hant': '汕頭市文化館 · 潮汕非物質文化遺產展示館' },
  logo_title: { zh: '汕头市文化馆', en: 'Shantou Cultural Center', 'zh-hant': '汕頭市文化館' },
  logo_subtitle: { zh: '潮汕非物质文化遗产展示馆', en: 'Chaoshan Intangible Culture Heritage Exhibition Hall', 'zh-hant': '潮汕非物質文化遺產展示館' },
  nav_home: { zh: '首页', en: 'Home', 'zh-hant': '首頁' },
  nav_f1: { zh: '一楼 · 乡音文脉', en: '1F · Voices of Heritage', 'zh-hant': '一樓 · 鄉音文脈' },
  nav_f2: { zh: '二楼 · 南国雄风', en: '2F · Spirits of the South', 'zh-hant': '二樓 · 南國雄風' },
  nav_f3: { zh: '三楼 · 匠心万象', en: '3F · Artisan Masterpieces', 'zh-hant': '三樓 · 匠心萬象' },
  hero_title: { zh: '潮韵千年 · 一馆尽览', en: 'Millennium Charm · All in One Museum', 'zh-hant': '潮韻千年 · 一館盡覽' },
  hero_desc: { zh: '国家一级文化馆 | 广东省首个市级非遗展示馆', en: 'National First-Class Center | Guangdong\'s Intangible Culture Heritage Exhibition Hall', 'zh-hant': '國家一級文化館 | 廣東省首個市級非遺展示館' },
  
  f1_title_short: { zh: '乡音文脉', en: 'Voices of Heritage', 'zh-hant': '鄉音文脈' },
  f1_desc_short: { zh: '12项潮汕语言类非遗', en: '12 Language & Performance Heritages', 'zh-hant': '12項潮汕語言類非遺' },
  f2_title_short: { zh: '南国雄风', en: 'Spirits of the South', 'zh-hant': '南國雄風' },
  f2_desc_short: { zh: '8项传统舞蹈非遗', en: '8 Traditional Dance Heritages', 'zh-hant': '8項傳統舞蹈非遺' },
  f3_title_short: { zh: '匠心万象', en: 'Artisan Masterpieces', 'zh-hant': '匠心萬象' },
  f3_desc_short: { zh: '30项传统技艺非遗', en: '30 Traditional Craft Heritages', 'zh-hant': '30項傳統技藝非遺' },
  
  visit_title: { zh: '参观信息', en: 'Visitor Information', 'zh-hant': '參觀資訊' },
  visit_time_label: { zh: '开放时间', en: 'Opening Hours', 'zh-hant': '開放時間' },
  visit_time_val: { zh: '周二至周日 9:00-17:00（16:30停止入场）', en: 'Tue-Sun 9:00-17:00 (Last entry 16:30)', 'zh-hant': '週二至週日 9:00-17:00（16:30停止入場）' },
  visit_addr_label: { zh: '场馆地址', en: 'Address', 'zh-hant': '場館地址' },
  visit_addr_val: { zh: '金平区外马路149号（小公园历史文化街区）', en: 'No.149 Waima Rd, Jinping District (Small Park Historic & Cultural Block)', 'zh-hant': '金平區外馬路149號（小公園歷史文化街區）' },
  visit_book_label: { zh: '预约方式', en: 'Reservation', 'zh-hant': '預約方式' },
  visit_book_val: { zh: '微信公众号"汕头市文化馆"免费预约', en: 'Free via WeChat Official Account - Shantou"', 'zh-hant': '微信公眾號「汕頭市文化館」免費預約' },
  footer_copy: { zh: '© 2026 汕头市文化馆 · 潮汕非物质文化遗产展示馆', en: '© 2026 Shantou Cultural Center · Chaoshan ICH Hall', 'zh-hant': '© 2026 汕頭市文化館 · 潮汕非物質文化遺產展示館' },
  footer_info: { zh: '地址：广东省汕头市金平区外马路149号 | 电话：0754-8827xxxx', en: 'Addr: No.149 Waima Rd, Shantou | Tel: 0754-8827xxxx', 'zh-hant': '地址：廣東省汕頭市金平區外馬路149號 | 電話：0754-8827xxxx' },

  // === 楼层页原有词条 ===
  f1_title: { zh: '一楼 · 乡音文脉', en: 'Floor 1 · Voices of Heritage', 'zh-hant': '一樓 · 鄉音文脈' },
  f1_desc: { zh: '潮剧、潮乐、歌册、工夫茶……从一句乡音开始，推开潮汕文化的大门。本层共收录 12 项语言与表演类非物质文化遗产。', en: 'Chaozhou Opera, Music, Tea… Step into Chaoshan culture through its native sounds. 12 intangible heritage items.', 'zh-hant': '潮劇、潮樂、歌冊、工夫茶……從一句鄉音開始，推開潮汕文化的大門。本層共收錄 12 項語言與表演類非物質文化遺產。' },
  f2_title: { zh: '二楼 · 南国雄风', en: 'Floor 2 · Spirits of the South', 'zh-hant': '二樓 · 南國雄風' },
  f2_desc: { zh: '英歌舞、蜈蚣舞、麒麟舞……感受潮汕大地最磅礴的节庆力量。本层共收录 8 项传统舞蹈与民俗类非物质文化遗产。', en: 'Yingge Dance, Centipede Dance… Feel the majestic festive power of Chaoshan. 8 traditional dance items.', 'zh-hant': '英歌舞、蜈蚣舞、麒麟舞……感受潮汕大地最磅礡的節慶力量。本層共收錄 8 項傳統舞蹈與民俗類非物質文化遺產。' },
  f3_title: { zh: '三楼 · 匠心万象', en: 'Floor 3 · Artisan Masterpieces', 'zh-hant': '三樓 · 匠心萬象' },
  f3_desc: { zh: '木雕、潮绣、嵌瓷、潮菜……30项非遗技艺，一座潮汕生活百科全书。本层全面展示潮汕人的衣食住行与民间智慧。', en: 'Woodcarving, Embroidery, Porcelain Mosaic… 30 craft items showcasing the encyclopedia of Chaoshan life.', 'zh-hant': '木雕、潮繡、嵌瓷、潮菜……30項非遺技藝，一座潮汕生活百科全書。本層全面展示潮汕人的衣食住行與民間智慧。' }
};

/* ==========  列表页渲染 ========== */
function renderFloorList(floorNum, lang) {
  const grid = document.getElementById('exhibitGrid');
  if (!grid || !window.EXHIBIT_DATA) return;
  const items = window.EXHIBIT_DATA.filter(item => item.floor === floorNum);
  
  grid.innerHTML = items.map((item, i) => `
    <a href="detail.html?id=${item.id}" class="exhibit-card reveal-up" style="transition-delay:${i * 0.06}s">
      <div class="card-img-wrapper">
        <img src="${item.image}" alt="${item.name[lang]}" loading="lazy">
        <span class="card-level">${item.level[lang]}</span>
      </div>
      <div class="card-body">
        <h3>${item.name[lang]}</h3>
        <p>${item.desc[lang]}</p>
      </div>
    </a>
  `).join('');
  initScrollAnimations();
}

/* ========== 详情页渲染 ========== */
function renderDetailPage(lang) {
  const container = document.getElementById('detailContent');
  if (!container || !window.EXHIBIT_DATA) return;
  const itemId = new URLSearchParams(window.location.search).get('id');
  const item = window.EXHIBIT_DATA.find(i => i.id === itemId);

  if (!item) { container.innerHTML = `<div class="loading-state">未找到该展项信息 / Item not found.</div>`; return; }

  container.innerHTML = `
    <img src="${item.image}" alt="${item.name[lang]}" class="detail-img">
    <div class="detail-info">
      <h1>${item.name[lang]}</h1>
      <div class="detail-meta">
        <span class="meta-tag">${item.level[lang]}</span>
        <span class="meta-tag">${item.region[lang]}</span>
      </div>
      <div class="detail-desc">${item.detail[lang].split('\n').map(p => `<p>${p}</p>`).join('')}</div>
    </div>
  `;
}

/* ========== 滚动渐显动画 ========== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

/* ========== 导航栏滚动效果 ========== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));
}

/* ==========  移动端菜单 ========== */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.main-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
    btn.textContent = nav.classList.contains('mobile-open') ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('mobile-open'); btn.textContent = '☰'; }));
}

/* ========== 图片灯箱 ========== */
function initLightbox() {
  document.addEventListener('click', (e) => {
    const imgEl = e.target.closest('.detail-img');
    if (!imgEl) return;
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `<div class="lightbox-content"><img src="${imgEl.src}" alt="Large View"><button class="lightbox-close">&times;</button></div>`;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    setTimeout(() => lightbox.classList.add('active'), 10);
    const close = () => { lightbox.classList.remove('active'); setTimeout(() => { lightbox.remove(); document.body.style.overflow = ''; }, 300); };
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.addEventListener('click', (ev) => { if (ev.target === lightbox) close(); });
  });
}

/* ========== 回到顶部 ========== */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top'; btn.innerHTML = '↑'; btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
