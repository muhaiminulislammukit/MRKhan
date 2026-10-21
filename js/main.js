/**
 * M. R. KHAN & ASSOCIATES - Interactive Application Logic
 * Advocate Rakib Khan | CEO & Co-Founder
 * BBA, MBA, LLB, Income Tax Govt. Permit Bangladesh
 */

// Default Academic Matrix State
const DEFAULT_ACADEMIC_DATA = [
  {
    id: "mba",
    level: "Post Graduate / Master's",
    degree: "Master of Business Administration (MBA)",
    institution: "University of Dhaka / Recognized University",
    major: "Finance / Management & Corporate Governance",
    passingYear: "2018",
    status: "Completed",
    notes: "Specialized in financial management, corporate valuation, and strategic fiscal planning."
  },
  {
    id: "llb",
    level: "Legal Studies",
    degree: "Bachelor of Laws (LL.B)",
    institution: "Recognized Law Faculty / University",
    major: "Commercial, Taxation & Constitutional Law",
    passingYear: "2016",
    status: "Completed",
    notes: "Trained in civil litigation, tax appeals, land law, company law and statutory compliance."
  },
  {
    id: "bba",
    level: "Undergraduate / Bachelor's",
    degree: "Bachelor of Business Administration (BBA)",
    institution: "Recognized Business School / University",
    major: "Accounting & Information Systems / Finance",
    passingYear: "2014",
    status: "Completed",
    notes: "Strong grounding in financial accounting, cost analysis, auditing, and corporate finance."
  },
  {
    id: "hsc",
    level: "Higher Secondary (College)",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Reputed College, Dhaka",
    major: "Business Studies / Science",
    passingYear: "2010",
    status: "Completed",
    notes: "Graduated with distinction."
  },
  {
    id: "ssc",
    level: "Secondary School",
    degree: "Secondary School Certificate (SSC)",
    institution: "Reputed School, Dhaka",
    major: "General / Science",
    passingYear: "2008",
    status: "Completed",
    notes: "Solid foundation in analytical thinking and mathematics."
  },
  {
    id: "itp",
    level: "Professional License & Govt. Permit",
    degree: "Income Tax Govt. Permit (Licensed Practitioner)",
    institution: "National Board of Revenue (NBR), Bangladesh",
    major: "Income Tax Ordinance / Income Tax Act 2023",
    passingYear: "Govt. Permitted",
    status: "Active & Authorized",
    notes: "Authorized Income Tax Practitioner permitted to appear before Taxes Appellate Tribunals & Commissionerates."
  }
];

// Initialize Academic Data from LocalStorage or Defaults
function getAcademicData() {
  const saved = localStorage.getItem('mrkhan_academic_data');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing saved academic data", e);
    }
  }
  return DEFAULT_ACADEMIC_DATA;
}

function saveAcademicData(data) {
  localStorage.setItem('mrkhan_academic_data', JSON.stringify(data));
  renderAcademicTimeline();
}

// Render Academic Timeline
function renderAcademicTimeline() {
  const container = document.getElementById('academic-timeline-list');
  if (!container) return;

  const data = getAcademicData();
  container.innerHTML = '';

  data.forEach((item, index) => {
    const isOdd = index % 2 === 0;
    const itemEl = document.createElement('div');
    itemEl.className = 'edu-item';
    itemEl.innerHTML = `
      <div class="edu-marker"></div>
      <div class="edu-card">
        <span class="edu-year-badge">${item.passingYear ? 'Passing Year: ' + item.passingYear : 'Year: [Update Year]'}</span>
        <h4 class="edu-degree">${item.degree}</h4>
        <div class="edu-institution">🏛️ ${item.institution || '[Click Edit to Add University/College/School]'}</div>
        <div class="edu-details">
          <strong>Major/Field:</strong> ${item.major || 'Not specified'}<br>
          ${item.notes ? `<span>${item.notes}</span>` : ''}
        </div>
      </div>
    `;
    container.appendChild(itemEl);
  });
}

// Setup Academic Editor Modal
function setupAcademicEditor() {
  const editBtn = document.getElementById('btn-open-edu-editor');
  const modal = document.getElementById('academic-modal');
  const closeBtn = document.getElementById('close-academic-modal');
  const cancelBtn = document.getElementById('cancel-edu-edit');
  const resetBtn = document.getElementById('reset-edu-defaults');
  const form = document.getElementById('academic-editor-form');

  if (!modal) return;

  const openModal = () => {
    const data = getAcademicData();
    const formFieldsContainer = document.getElementById('edu-form-fields');
    formFieldsContainer.innerHTML = '';

    data.forEach((item, index) => {
      const fieldset = document.createElement('div');
      fieldset.style.marginBottom = '1.25rem';
      fieldset.style.padding = '1rem';
      fieldset.style.border = '1px solid var(--border-light)';
      fieldset.style.borderRadius = 'var(--radius-sm)';
      fieldset.style.background = 'rgba(6, 10, 23, 0.4)';

      fieldset.innerHTML = `
        <h5 style="color: var(--gold-400); margin-bottom: 0.5rem; font-family: var(--font-serif);">${item.degree}</h5>
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 0.75rem; margin-bottom: 0.5rem;">
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 2px;">Institution / University / School Name:</label>
            <input type="text" class="calc-input" name="inst_${index}" value="${item.institution || ''}" placeholder="e.g. University / College / School Name" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;">
          </div>
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 2px;">Passing Year:</label>
            <input type="text" class="calc-input" name="year_${index}" value="${item.passingYear || ''}" placeholder="e.g. 2018" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 2px;">Major / Group:</label>
            <input type="text" class="calc-input" name="major_${index}" value="${item.major || ''}" placeholder="e.g. Finance, Law, Science" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;">
          </div>
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 2px;">Status / Grade:</label>
            <input type="text" class="calc-input" name="status_${index}" value="${item.status || ''}" placeholder="e.g. Completed / 1st Class" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;">
          </div>
        </div>
      `;
      formFieldsContainer.appendChild(fieldset);
    });

    modal.classList.add('active');
  };

  const closeModal = () => modal.classList.remove('active');

  if (editBtn) editBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("Reset academic information to default templates?")) {
        localStorage.removeItem('mrkhan_academic_data');
        renderAcademicTimeline();
        closeModal();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = getAcademicData();
      const updated = current.map((item, index) => {
        const instInput = form.querySelector(`[name="inst_${index}"]`);
        const yearInput = form.querySelector(`[name="year_${index}"]`);
        const majorInput = form.querySelector(`[name="major_${index}"]`);
        const statusInput = form.querySelector(`[name="status_${index}"]`);

        return {
          ...item,
          institution: instInput ? instInput.value.trim() : item.institution,
          passingYear: yearInput ? yearInput.value.trim() : item.passingYear,
          major: majorInput ? majorInput.value.trim() : item.major,
          status: statusInput ? statusInput.value.trim() : item.status
        };
      });

      saveAcademicData(updated);
      closeModal();
      alert("Academic credentials saved successfully!");
    });
  }
}

// ==========================================================================
// BANGLADESH NBR INCOME TAX CALCULATOR (Act 2023 & Slabs 2024-25 / 2025-26)
// ==========================================================================
function setupTaxCalculator() {
  const calcBtn = document.getElementById('btn-calculate-tax');
  const incomeInput = document.getElementById('calc-annual-income');
  const categorySelect = document.getElementById('calc-taxpayer-category');
  const locationSelect = document.getElementById('calc-taxpayer-location');

  if (!calcBtn || !incomeInput) return;

  function calculateTax() {
    const rawIncome = parseFloat(incomeInput.value) || 0;
    const category = categorySelect.value;
    const location = locationSelect.value;

    // Threshold definition based on NBR slabs
    let threshold = 350000; // General Male
    if (category === 'female_senior') {
      threshold = 400000; // Female & 65+ years
    } else if (category === 'disabled_third') {
      threshold = 475000; // Specially abled & Third gender
    } else if (category === 'freedom_fighter') {
      threshold = 500000; // Gazetted Freedom Fighter
    }

    // Minimum tax definition based on jurisdiction
    let minTax = 5000;
    if (location === 'other_city') {
      minTax = 4000;
    } else if (location === 'non_city') {
      minTax = 3000;
    }

    let taxableIncome = rawIncome;
    let totalTax = 0;
    let slabBreakdown = [];

    if (taxableIncome <= threshold) {
      slabBreakdown.push({ slab: `First BDT ${formatBDT(threshold)} (Exempt)`, rate: '0%', tax: 0 });
      totalTax = 0;
    } else {
      // Slab 1: Exemption
      slabBreakdown.push({ slab: `First BDT ${formatBDT(threshold)} (Exemption)`, rate: '0%', tax: 0 });
      let remaining = taxableIncome - threshold;

      // Slab 2: Next 100,000 @ 5%
      const slab2Cap = 100000;
      const slab2Taxable = Math.min(remaining, slab2Cap);
      const slab2Tax = slab2Taxable * 0.05;
      totalTax += slab2Tax;
      slabBreakdown.push({ slab: `Next BDT ${formatBDT(slab2Taxable)}`, rate: '5%', tax: slab2Tax });
      remaining -= slab2Taxable;

      // Slab 3: Next 400,000 @ 10%
      if (remaining > 0) {
        const slab3Cap = 400000;
        const slab3Taxable = Math.min(remaining, slab3Cap);
        const slab3Tax = slab3Taxable * 0.10;
        totalTax += slab3Tax;
        slabBreakdown.push({ slab: `Next BDT ${formatBDT(slab3Taxable)}`, rate: '10%', tax: slab3Tax });
        remaining -= slab3Taxable;
      }

      // Slab 4: Next 500,000 @ 15%
      if (remaining > 0) {
        const slab4Cap = 500000;
        const slab4Taxable = Math.min(remaining, slab4Cap);
        const slab4Tax = slab4Taxable * 0.15;
        totalTax += slab4Tax;
        slabBreakdown.push({ slab: `Next BDT ${formatBDT(slab4Taxable)}`, rate: '15%', tax: slab4Tax });
        remaining -= slab4Taxable;
      }

      // Slab 5: Next 500,000 @ 20%
      if (remaining > 0) {
        const slab5Cap = 500000;
        const slab5Taxable = Math.min(remaining, slab5Cap);
        const slab5Tax = slab5Taxable * 0.20;
        totalTax += slab5Tax;
        slabBreakdown.push({ slab: `Next BDT ${formatBDT(slab5Taxable)}`, rate: '20%', tax: slab5Tax });
        remaining -= slab5Taxable;
      }

      // Slab 6: Balance @ 25%
      if (remaining > 0) {
        const slab6Taxable = remaining;
        const slab6Tax = slab6Taxable * 0.25;
        totalTax += slab6Tax;
        slabBreakdown.push({ slab: `Balance BDT ${formatBDT(slab6Taxable)}`, rate: '25%', tax: slab6Tax });
      }

      // Apply Minimum Tax Rule
      if (totalTax > 0 && totalTax < minTax) {
        totalTax = minTax;
      }
    }

    // Update UI
    document.getElementById('res-gross-income').textContent = `BDT ${formatBDT(rawIncome)}`;
    document.getElementById('res-exemption-limit').textContent = `BDT ${formatBDT(threshold)}`;
    document.getElementById('res-min-tax-rule').textContent = `BDT ${formatBDT(minTax)}`;
    document.getElementById('res-total-payable').textContent = `BDT ${formatBDT(Math.round(totalTax))}`;

    const slabContainer = document.getElementById('calc-slab-breakdown');
    if (slabContainer) {
      slabContainer.innerHTML = '';
      slabBreakdown.forEach(item => {
        const row = document.createElement('div');
        row.className = 'calc-result-row';
        row.innerHTML = `
          <span class="calc-result-label">${item.slab} (${item.rate})</span>
          <span class="calc-result-value">BDT ${formatBDT(Math.round(item.tax))}</span>
        `;
        slabContainer.appendChild(row);
      });
    }
  }

  calcBtn.addEventListener('click', calculateTax);
  incomeInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') calculateTax();
  });
  categorySelect.addEventListener('change', calculateTax);
  locationSelect.addEventListener('change', calculateTax);

  // Initial Calculation
  calculateTax();
}

function formatBDT(amount) {
  return Number(amount).toLocaleString('en-IN');
}

// ==========================================================================
// SERVICES FILTER & INTERACTION
// ==========================================================================
function setupServicesFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.service-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Service Enquire Buttons open booking modal with pre-selected service
  const serviceEnquireBtns = document.querySelectorAll('.service-card-btn');
  serviceEnquireBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || 'General Tax & Legal Advisory';
      openBookingModal(serviceName);
    });
  });
}

// ==========================================================================
// CONSULTATION BOOKING MODAL & DIRECT WHATSAPP INTEGRATION
// ==========================================================================
function setupBookingModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('close-booking-modal');
  const triggerBtns = document.querySelectorAll('.btn-open-consultation');
  const form = document.getElementById('consultation-booking-form');

  if (!modal) return;

  window.openBookingModal = function(preselectedService) {
    if (preselectedService) {
      const select = document.getElementById('book-service-select');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].text.toLowerCase().includes(preselectedService.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }
    modal.classList.add('active');
  };

  const closeModal = () => modal.classList.remove('active');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openBookingModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name').value.trim();
      const phone = document.getElementById('book-phone').value.trim();
      const service = document.getElementById('book-service-select').value;
      const meetingType = document.getElementById('book-type-select').value;
      const date = document.getElementById('book-date').value;
      const details = document.getElementById('book-notes').value.trim();

      // Format WhatsApp Message
      const message = `*CONSULTATION APPOINTMENT REQUEST*\n------------------------------\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Mode:* ${meetingType}\n*Preferred Date:* ${date || 'Earliest Available'}\n*Brief Notes:* ${details || 'None'}\n\n*Law Firm:* M. R. KHAN & ASSOCIATES\n*Lead Advocate:* Advocate Rakib Khan`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/8801711021569?text=${encodedMsg}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      alert(`Thank you, ${name}! Your consultation request has been prepared. We are redirecting you to WhatsApp with Advocate Rakib Khan.`);
      closeModal();
      form.reset();
    });
  }
}

// ==========================================================================
// THEME SWITCHER (DARK GOLD / CRISP LIGHT)
// ==========================================================================
function setupThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('mrkhan_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme');
    const next = active === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mrkhan_theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeToggle.innerHTML = `
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      `;
      themeToggle.setAttribute('title', 'Switch to Executive Dark Mode');
    } else {
      themeToggle.innerHTML = `
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      `;
      themeToggle.setAttribute('title', 'Switch to Crisp Ivory Mode');
    }
  }
}

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// ==========================================================================
// QUICK CONTACT FORM HANDLER
// ==========================================================================
function setupContactForm() {
  const form = document.getElementById('main-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const email = form.querySelector('[name="email"]').value;
    const subject = form.querySelector('[name="subject"]').value;
    const message = form.querySelector('[name="message"]').value;

    const fullMsg = `*INQUIRY FROM WEBSITE*\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    const encoded = encodeURIComponent(fullMsg);

    window.open(`https://wa.me/8801711021569?text=${encoded}`, '_blank');
    alert(`Thank you, ${name}! We have received your inquiry and will respond shortly.`);
    form.reset();
  });
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderAcademicTimeline();
  setupAcademicEditor();
  setupTaxCalculator();
  setupServicesFilter();
  setupBookingModal();
  setupThemeSwitcher();
  setupMobileMenu();
  setupContactForm();
});
