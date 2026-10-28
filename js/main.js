/**
 * LIVORA MAIN JAVASCRIPT
 * Interactive controls, search filtering, modals, wishlist toggles
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCity = 'All';
  let currentType = 'All';
  let maxPrice = Infinity;
  let activeTag = 'all';
  let wishlist = new Set();

  const listingsContainer = document.getElementById('listingsGrid');
  const resultsCountEl = document.getElementById('resultsCount');

  // 1. Render Properties
  function renderListings() {
    if (!listingsContainer || !LIVORA_DATA) return;

    const filtered = LIVORA_DATA.properties.filter(item => {
      // Filter by city
      if (currentCity !== 'All' && !item.city.toLowerCase().includes(currentCity.toLowerCase())) {
        return false;
      }
      // Filter by type
      if (currentType !== 'All' && item.type.toLowerCase() !== currentType.toLowerCase()) {
        return false;
      }
      // Filter by price
      if (item.price > maxPrice) {
        return false;
      }
      // Filter by tag
      if (activeTag === 'kidapawan' && item.city !== 'Kidapawan City') return false;
      if (activeTag === 'davao' && item.city !== 'Davao City') return false;
      if (activeTag === 'female' && !item.gender.toLowerCase().includes('female')) return false;
      if (activeTag === 'top-rated' && item.rating < 4.8) return false;

      return true;
    });

    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${filtered.length} verified spaces`;
    }

    if (filtered.length === 0) {
      listingsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: white; border-radius: 16px; border: 1px dashed var(--neutral-300);">
          <div style="font-size: 40px; margin-bottom: 12px;">🏡</div>
          <h3 style="font-family: var(--font-heading); font-size: 18px; margin-bottom: 8px;">No matching rooms found</h3>
          <p style="color: var(--neutral-500); font-size: 14px; margin-bottom: 16px;">Try adjusting your filters or expanding your budget range.</p>
          <button class="btn btn-secondary btn-sm" id="resetFiltersBtn">Reset All Filters</button>
        </div>
      `;
      document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);
      return;
    }

    listingsContainer.innerHTML = filtered.map(prop => {
      const isSaved = wishlist.has(prop.id);
      return `
        <article class="card-listing" data-id="${prop.id}">
          <div class="card-listing-media">
            <img src="${prop.image}" alt="${prop.title}" class="card-listing-img" loading="lazy" />
            <div class="card-top-tags">
              <span class="badge badge-dark">${prop.type}</span>
              ${prop.tag ? `<span class="badge badge-primary">${prop.tag}</span>` : ''}
            </div>
            <button class="card-wishlist-btn ${isSaved ? 'active' : ''}" data-id="${prop.id}" aria-label="Save to wishlist" title="Save to wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          </div>
          <div class="card-listing-content">
            <div class="card-meta-header">
              <span class="card-city">📍 ${prop.city}</span>
              <div class="card-rating">
                <span class="card-rating-star">★</span>
                <span>${prop.rating}</span>
                <span style="color: var(--neutral-400); font-weight: normal;">(${prop.reviews})</span>
              </div>
            </div>
            <h3 class="card-title">${prop.title}</h3>
            <p style="font-size: 12px; color: var(--neutral-500); margin: 0;">${prop.distance}</p>
            <div class="card-amenities-row">
              <span class="amenity-chip">${prop.gender}</span>
              ${prop.amenities.slice(0, 2).map(a => `<span class="amenity-chip">${a}</span>`).join('')}
            </div>
            <div class="card-footer">
              <div class="card-price">
                <span class="card-price-val">₱${prop.price.toLocaleString()}</span>
                <span class="card-price-unit">/ ${prop.period}</span>
              </div>
              <a href="listing-details.html?id=${prop.id}" class="btn btn-subtle btn-sm">View Details</a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Rebind wishlist clicks
    document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        if (wishlist.has(id)) {
          wishlist.delete(id);
          btn.classList.remove('active');
          btn.querySelector('svg').setAttribute('fill', 'none');
        } else {
          wishlist.add(id);
          btn.classList.add('active');
          btn.querySelector('svg').setAttribute('fill', 'currentColor');
        }
      });
    });
  }

  function resetFilters() {
    currentCity = 'All';
    currentType = 'All';
    maxPrice = Infinity;
    activeTag = 'all';

    document.querySelectorAll('.filter-chip-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-chip-btn[data-tag="all"]')?.classList.add('active');

    const heroCity = document.getElementById('heroCitySelect');
    if (heroCity) heroCity.value = 'All';
    const heroType = document.getElementById('heroTypeSelect');
    if (heroType) heroType.value = 'All';
    const heroBudget = document.getElementById('heroBudgetSelect');
    if (heroBudget) heroBudget.value = 'All';

    renderListings();
  }

  // 2. Hero Search Bar Handler
  const heroSearchBtn = document.getElementById('heroSearchBtn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const citySelect = document.getElementById('heroCitySelect');
      const typeSelect = document.getElementById('heroTypeSelect');
      const budgetSelect = document.getElementById('heroBudgetSelect');

      currentCity = citySelect ? citySelect.value : 'All';
      currentType = typeSelect ? typeSelect.value : 'All';
      
      const budgetVal = budgetSelect ? budgetSelect.value : 'All';
      if (budgetVal === 'under2000') maxPrice = 2000;
      else if (budgetVal === 'under3000') maxPrice = 3000;
      else maxPrice = Infinity;

      renderListings();

      // Smooth scroll down to listings
      const target = document.getElementById('listingsSection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 3. Quick Tag Filter Chips
  const filterChips = document.querySelectorAll('.filter-chip-btn');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeTag = chip.getAttribute('data-tag') || 'all';
      renderListings();
    });
  });

  // 4. Hero Search Category Tabs
  const searchTabs = document.querySelectorAll('.search-tab-btn');
  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      currentType = category === 'All' ? 'All' : category;
      renderListings();
    });
  });

  // 5. Auth Modal Controls
  const authModal = document.getElementById('authModal');
  const openLoginBtns = document.querySelectorAll('.js-open-login');
  const openSignupBtns = document.querySelectorAll('.js-open-signup');
  const closeAuthBtn = document.getElementById('closeAuthBtn');
  const tenantTabBtn = document.getElementById('tenantTabBtn');
  const landlordTabBtn = document.getElementById('landlordTabBtn');
  const landlordFields = document.querySelectorAll('.landlord-only-field');
  const authModalTitle = document.getElementById('authModalTitle');
  const authSubmitBtn = document.getElementById('authSubmitBtn');
  const toggleAuthModeBtn = document.getElementById('toggleAuthModeBtn');

  let isSignupMode = false;
  let activeRole = 'tenant';

  function openModal(signup = false) {
    if (!authModal) return;
    isSignupMode = signup;
    updateModalUI();
    authModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!authModal) return;
    authModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateModalUI() {
    if (authModalTitle) {
      authModalTitle.textContent = isSignupMode ? 'Create your Livora Account' : 'Welcome back to Livora';
    }
    if (authSubmitBtn) {
      authSubmitBtn.textContent = isSignupMode ? 'CREATE ACCOUNT' : 'LOG IN';
    }
    const nameSection = document.getElementById('signupNameFields');
    if (nameSection) {
      nameSection.style.display = isSignupMode ? 'grid' : 'none';
    }
    if (toggleAuthModeBtn) {
      toggleAuthModeBtn.textContent = isSignupMode 
        ? 'Already have an account? Log in' 
        : "Don't have an account? Sign up";
    }

    // Role state
    if (activeRole === 'landlord' && isSignupMode) {
      landlordFields.forEach(f => f.style.display = 'block');
    } else {
      landlordFields.forEach(f => f.style.display = 'none');
    }
  }

  openLoginBtns.forEach(btn => btn.addEventListener('click', () => openModal(false)));
  openSignupBtns.forEach(btn => btn.addEventListener('click', () => openModal(true)));
  if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeModal);

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeModal();
    });
  }

  if (tenantTabBtn && landlordTabBtn) {
    tenantTabBtn.addEventListener('click', () => {
      tenantTabBtn.classList.add('active');
      landlordTabBtn.classList.remove('active');
      activeRole = 'tenant';
      updateModalUI();
    });

    landlordTabBtn.addEventListener('click', () => {
      landlordTabBtn.classList.add('active');
      tenantTabBtn.classList.remove('active');
      activeRole = 'landlord';
      updateModalUI();
    });
  }

  if (toggleAuthModeBtn) {
    toggleAuthModeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isSignupMode = !isSignupMode;
      updateModalUI();
    });
  }

  // Handle Auth Form Submission
  const authForm = document.getElementById('authForm');
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('authEmail')?.value;
      const roleText = activeRole === 'landlord' ? 'Landlord' : 'Tenant';
      
      // Simulate session login
      localStorage.setItem('livora_user', JSON.stringify({ email, role: activeRole }));
      closeModal();
      
      // Notify
      alert(`Welcome to Livora! Signed in as ${roleText} (${email})`);
      window.location.reload();
    });
  }

  // Initial Render
  renderListings();
});

