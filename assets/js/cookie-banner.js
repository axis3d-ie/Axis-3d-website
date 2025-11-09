/* cookie-banner.js - Minimal GDPR consent manager for Axis3D
   Drop into /assets/js/ and include on pages (defer recommended).
   It blocks non-essential scripts until consent for "analytics" is given.
*/

(function(){
  const ROOT_ID = 'cookie-consent-root';
  const STORAGE_KEY = 'axis3d_cookie_consent';

  // Default categories
  const CATEGORIES = {
    essential: { required: true, description: "Essential cookies required for site functionality." },
    analytics: { required: false, description: "Analytics to help us improve the site (optional)." }
  };

  // Utilities
  function nowISO(){ return (new Date()).toISOString(); }
  function readConsent(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return null;
      return JSON.parse(raw);
    } catch(e) { return null; }
  }
  function writeConsent(consent){
    const payload = { choices: consent, ts: nowISO(), ua: navigator.userAgent || null };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    // Custom event so other scripts can listen
    window.dispatchEvent(new CustomEvent('axis3d:consentChanged', { detail: payload }));
    return payload;
  }

  // Build banner HTML
  function renderBanner(){
    const root = document.getElementById(ROOT_ID);
    if(!root) return;

    // container
    const banner = document.createElement('div');
    banner.className = 'cc-banner';
    banner.innerHTML = `
      <p>
        Axis3D uses essential cookies to run this site. We also use optional analytics cookies to improve our service.
        See our <a href="/legal/privacy.html" target="_blank" rel="noopener">Privacy Policy</a>.
      </p>
      <div class="cc-actions" role="region" aria-label="Cookie actions">
        <button class="cc-btn ghost" id="cc-reject">Reject</button>
        <button class="cc-btn" id="cc-settings">Manage</button>
        <button class="cc-btn primary" id="cc-accept">Accept</button>
      </div>
    `;
    root.appendChild(banner);

    // Button handlers
    document.getElementById('cc-accept').addEventListener('click', ()=> {
      const choices = { essential: true, analytics: true };
      writeConsent(choices);
      removeBanner();
    });
    document.getElementById('cc-reject').addEventListener('click', ()=> {
      const choices = { essential: true, analytics: false };
      writeConsent(choices);
      removeBanner();
    });
    document.getElementById('cc-settings').addEventListener('click', ()=> {
      openSettings();
    });
  }

  function removeBanner(){
    const root = document.getElementById(ROOT_ID);
    if(!root) return;
    root.innerHTML = ''; // remove banner
    ensureManageButton();
  }

  // Manage button so users can change preferences later
  function ensureManageButton(){
    if(document.getElementById('cc-manage-btn')) return;
    const btn = document.createElement('a');
    btn.href = '#';
    btn.id = 'cc-manage-btn';
    btn.className = 'cc-manage';
    btn.textContent = 'Manage cookies';
    btn.addEventListener('click', (e)=>{ e.preventDefault(); openSettings(); });
    document.body.appendChild(btn);
  }

  // Settings modal
  function openSettings(){
    // backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'cc-modal-backdrop';
    backdrop.setAttribute('role','dialog');
    backdrop.setAttribute('aria-modal','true');

    const modal = document.createElement('div');
    modal.className = 'cc-modal';
    modal.innerHTML = `
      <h3>Cookie settings</h3>
      <p>Choose which cookies you consent to. Essential cookies are always enabled.</p>
      <div id="cc-rows"></div>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
        <button class="cc-btn" id="cc-cancel">Cancel</button>
        <button class="cc-btn primary" id="cc-save">Save preferences</button>
      </div>
    `;

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    const rows = modal.querySelector('#cc-rows');

    // Populate rows for categories
    Object.keys(CATEGORIES).forEach(key => {
      const cat = CATEGORIES[key];
      const row = document.createElement('div');
      row.className = 'cc-cookie-row';
      row.innerHTML = `
        <div>
          <strong>${key.charAt(0).toUpperCase()+key.slice(1)}</strong>
          <div class="cc-cookie-desc">${cat.description}</div>
        </div>
        <div>
          ${cat.required ? `<span style="font-size:13px;color:#666">Required</span>` : `<label><input type="checkbox" id="cc_chk_${key}"> Allow</label>`}
        </div>
      `;
      rows.appendChild(row);
    });

    // Prefill from storage if present
    const existing = readConsent();
    if(existing && existing.choices){
      Object.keys(CATEGORIES).forEach(k=>{
        const cb = document.getElementById('cc_chk_'+k);
        if(cb) cb.checked = !!existing.choices[k];
      });
    } else {
      // default: analytics unchecked
      const cb = document.getElementById('cc_chk_analytics');
      if(cb) cb.checked = false;
    }

    // Handlers
    modal.querySelector('#cc-save').addEventListener('click', ()=> {
      const choices = {
        essential: true,
        analytics: !!document.getElementById('cc_chk_analytics') && document.getElementById('cc_chk_analytics').checked
      };
      writeConsent(choices);
      document.body.removeChild(backdrop);
      // remove banner if present
      const root = document.getElementById(ROOT_ID);
      if(root) root.innerHTML = '';
      ensureManageButton();
    });

    modal.querySelector('#cc-cancel').addEventListener('click', ()=> {
      document.body.removeChild(backdrop);
    });
  }

  // Public helper to check consent for a category
  function hasConsent(category){
    const stored = readConsent();
    if(!stored || !stored.choices) return false;
    return !!stored.choices[category];
  }

  // Expose global API for site scripts
  window.Axis3DConsent = {
    hasConsent,
    getRaw: readConsent,
    set: function(choices){ return writeConsent(choices); },
    revoke: function(){ // remove stored consent (user revokes)
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('axis3d:consentChanged', { detail: null }));
      // Show banner again
      const root = document.getElementById(ROOT_ID);
      if(root) renderBanner();
    },
    onChange: function(cb){ window.addEventListener('axis3d:consentChanged', (e)=> cb(e.detail)); }
  };

  // Loads third-party analytics when consent exists (user or script should call this)
  // Example usage: Axis3DConsent.loadAnalyticsIfAllowed(()=>{ /* load GA script */ });
  window.Axis3DConsent.loadAnalyticsIfAllowed = function(loaderFn){
    if(typeof loaderFn !== 'function') return;
    if(hasConsent('analytics')) loaderFn();
    // Otherwise, wait until consent is given
    const handler = function(detail){
      if(detail && detail.choices && detail.choices.analytics){
        loaderFn();
        window.removeEventListener('axis3d:consentChanged', handler);
      }
    };
    window.addEventListener('axis3d:consentChanged', (e)=> handler(e.detail));
  };

  // On init, show banner if no stored consent
  function init(){
    const stored = readConsent();
    if(!stored){
      renderBanner();
    } else {
      // ensure manage button present
      ensureManageButton();
    }
  }

  // Run
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else init();

})();
