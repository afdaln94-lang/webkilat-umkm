/**
 * WebKilat UMKM - Agency Interactive Scripts
 * Handling mobile menu, navbar scroll effect, dynamic WhatsApp order links, portfolio filter, and FAQs
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. WhatsApp Configuration
  const WA_PHONE = '6281234567890'; // Ganti dengan nomor WhatsApp Admin

  // 2. Sticky Navbar on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileNav.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking overlay
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Interactive WhatsApp Order & Consultation Generator
  const btnGenerateWa = document.getElementById('btnGenerateWa');
  if (btnGenerateWa) {
    btnGenerateWa.addEventListener('click', () => {
      const namaUsaha = document.getElementById('calcNamaUsaha')?.value.trim() || 'Usaha Saya';
      const jenisUsaha = document.getElementById('calcJenisUsaha')?.value || 'Jasa & Konsultan';
      const paketPilihan = document.getElementById('calcPaket')?.value || 'Paket UMKM Bisnis (Rp 899.000)';
      const catatan = document.getElementById('calcCatatan')?.value.trim() || 'Ingin konsultasi seputar pembuatan website profesional.';

      const message = `Halo Tim Konsultan WebKilat UMKM! 👋\n\nSaya ingin konsultasi pembuatan website bisnis:\n• *Nama Usaha:* ${namaUsaha}\n• *Bidang Usaha:* ${jenisUsaha}\n• *Paket Diminati:* ${paketPilihan}\n• *Catatan / Rencana:* ${catatan}\n\nMohon info estimasi pengerjaan dan rekomendasi konsep desain. Terima kasih!`;

      const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  }

  // 5. Update Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 6. Smooth Scroll with Offset for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Portfolio Category Filter Handler
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transition = 'opacity 0.3s ease';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 8. Mutually Exclusive Accordion Fallback for older browsers
  const detailsList = document.querySelectorAll('details[name="faq"]');
  detailsList.forEach((targetDetail) => {
    targetDetail.addEventListener('toggle', () => {
      if (targetDetail.open) {
        detailsList.forEach((detail) => {
          if (detail !== targetDetail && detail.open) {
            detail.open = false;
          }
        });
      }
    });
  });
});
