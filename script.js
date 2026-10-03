const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

const serviceGroups = [
  {
    title: 'تأسيس الشركات',
    links: [
      ['تأسيس الشركات في مصر', 'corporate-investment.html#formation'],
      ['شركة ذات مسؤولية محدودة', 'corporate-investment.html#llc'],
      ['شركة الشخص الواحد', 'corporate-investment.html#single-owner'],
      ['شركة مساهمة', 'corporate-investment.html#joint-stock'],
      ['شركات الأشخاص', 'corporate-investment.html#partnership'],
      ['تأسيس للأجانب', 'corporate-investment.html#foreign-investors'],
      ['التأسيس الإلكتروني', 'corporate-investment.html#electronic'],
      ['الهيئة العامة للاستثمار', 'corporate-investment.html#investment-authority'],
      ['تعديلات الشركات', 'corporate-investment.html#amendments']
    ]
  },
  {
    title: 'إجراءات الأعمال',
    links: [
      ['البطاقة الضريبية', 'corporate-investment.html#tax-card'],
      ['التسجيل الضريبي', 'corporate-investment.html#tax-registration'],
      ['ضريبة القيمة المضافة VAT', 'corporate-investment.html#vat'],
      ['السجل التجاري', 'corporate-investment.html#commercial-register'],
      ['ملفات الشركات', 'corporate-investment.html#company-files'],
      ['الإجراءات الإدارية المرتبطة بالنشاط', 'corporate-investment.html#administrative']
    ]
  },
  {
    title: 'الأعمال والاستثمار',
    links: [
      ['المشروعات الاستثمارية', 'corporate-investment.html#investment-projects'],
      ['المشروعات الصناعية', 'corporate-investment.html#industrial-projects'],
      ['التراخيص والإجراءات', 'corporate-investment.html#licensing'],
      ['العقود التجارية', 'contracts.html#commercial-contracts'],
      ['المراجعة القانونية', 'services.html#consultation'],
      ['التفاوض التجاري', 'contracts.html#negotiation']
    ]
  },
  {
    title: 'مجالات قانونية أخرى',
    links: [
        ['العقارات والأراضي', 'real-estate-contracts.html'],
      ['صياغة ومراجعة العقود', 'contracts.html'],
      ['القضايا والمنازعات', 'litigation.html'],
      ['الإقامات وشؤون الأجانب', 'foreigners.html'],
      ['الاستشارات القانونية', 'services.html#consultation']
    ]
  }
];

if (navigation) {
  const servicesLink = [...navigation.querySelectorAll('a')].find((link) => link.textContent.trim() === 'الخدمات');
  if (servicesLink) {
    const menu = document.createElement('div');
    menu.className = 'mega-menu';
    menu.innerHTML = `<div class="mega-menu-inner">${serviceGroups.map((group) => `
      <section class="mega-group">
        <h2>${group.title}</h2>
        ${group.links.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
      </section>`).join('')}
        <a class="mega-all" href="services.html">استعرض جميع الخدمات <span>←</span></a>
    </div>`;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'nav-menu-trigger';
    trigger.textContent = 'الخدمات';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-haspopup', 'true');
    const dropdown = document.createElement('div');
    dropdown.className = 'nav-dropdown';
    dropdown.append(trigger, menu);
    servicesLink.replaceWith(dropdown);

    trigger.addEventListener('click', () => {
      trigger.setAttribute('aria-expanded', 'true');
    });

    dropdown.addEventListener('mouseenter', () => trigger.setAttribute('aria-expanded', 'true'));
    dropdown.addEventListener('mouseleave', () => trigger.setAttribute('aria-expanded', 'false'));
    dropdown.addEventListener('focusout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  const linksToAdd = [
    ['الشركات والاستثمار', 'corporate-investment.html'],
    ['القضايا', 'litigation.html'],
    ['العقارات والعقود', 'real-estate-contracts.html'],
    ['الإقامات وشؤون الأجانب', 'foreigners.html'],
    ['المقالات القانونية', 'articles.html'],
    ['تواصل معنا', 'contact.html']
  ];
  linksToAdd.forEach(([label, href]) => {
    if (![...navigation.querySelectorAll('a')].some((link) => link.getAttribute('href') === href)) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      navigation.append(link);
    }
  });

  const casesLink = [...navigation.querySelectorAll('a')].find((link) => link.getAttribute('href') === 'litigation.html');
  if (casesLink) casesLink.textContent = 'القضايا والمنازعات';
  const contactLink = [...navigation.querySelectorAll('a')].find((link) => link.getAttribute('href') === 'contact.html');
  if (contactLink) contactLink.textContent = 'تواصل معنا';
  const bookingButton = document.querySelector('.nav-cta');
  if (bookingButton) bookingButton.textContent = 'احجز استشارة';

  const headerActions = document.querySelector('.nav-wrap');
  if (headerActions && !headerActions.querySelector('.header-whatsapp')) {
    const whatsapp = document.createElement('a');
    whatsapp.className = 'header-whatsapp';
    whatsapp.href = 'https://wa.me/201011628489';
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    whatsapp.textContent = 'واتساب';
    headerActions.append(whatsapp);
  }
}

document.querySelectorAll('.footer-links').forEach((footerLinks) => {
  const linksToAdd = [
    ['الإقامات وشؤون الأجانب', 'foreigners.html'],
    ['صياغة ومراجعة العقود', 'contracts.html'],
    ['المقالات القانونية', 'articles.html']
  ];
  linksToAdd.forEach(([label, href]) => {
    if (![...footerLinks.querySelectorAll('a')].some((link) => link.getAttribute('href') === href)) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      footerLinks.append(link);
    }
  });
});

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'فتح القائمة' : 'إغلاق القائمة');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'فتح القائمة');
      navigation.classList.remove('is-open');
    }
  });
}

document.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('.nav-dropdown')) return;
  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    if (!dropdown.contains(event.target)) dropdown.querySelector('.nav-menu-trigger')?.setAttribute('aria-expanded', 'false');
  });

});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.nav-menu-trigger[aria-expanded="true"]').forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    });
  }
});

document.querySelectorAll('.service-detail[data-destination]').forEach((card) => {
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) return;
    window.location.href = card.dataset.destination;
  });
  card.addEventListener('keydown', (event) => {
    if (event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    window.location.href = card.dataset.destination;
  });
});

const revealItems = document.querySelectorAll('.reveal');
const supportsMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && supportsMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = String(new Date().getFullYear());
});

if (supportsMotion) {
  let scheduled = false;
  const updateParallax = () => {
    document.documentElement.style.setProperty('--scroll-position', `${window.scrollY * -0.08}px`);
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      window.requestAnimationFrame(updateParallax);
      scheduled = true;
    }
  }, { passive: true });
}
