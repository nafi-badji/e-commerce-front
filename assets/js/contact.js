/* contact.js
   Validation live + toast + embed map handling
*/
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  // helpers
  const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  const isValidPhone = (s) => /^\+?[0-9\s\-()]{7,20}$/.test(s);

  // live validation on inputs
  const emailEl = form.querySelector('input[name="email"]');
  const phoneEl = form.querySelector('input[name="phone"]');

  function markInvalid(el, message){
    if(!el) return;
    el.classList.add('is-invalid');
    let err = el.nextElementSibling;
    if(!err || !err.classList.contains('error-text')){
      err = document.createElement('div'); err.className = 'error-text'; el.parentNode.insertBefore(err, el.nextSibling);
    }
    err.textContent = message;
  }
  function clearInvalid(el){
    if(!el) return;
    el.classList.remove('is-invalid');
    let err = el.nextElementSibling;
    if(err && err.classList.contains('error-text')) err.remove();
  }

  if(emailEl){
    emailEl.addEventListener('input', () => {
      if(emailEl.value.trim()==='') { clearInvalid(emailEl); return; }
      isValidEmail(emailEl.value) ? clearInvalid(emailEl) : markInvalid(emailEl, 'Email invalide');
    });
  }
  if(phoneEl){
    phoneEl.addEventListener('input', () => {
      if(phoneEl.value.trim()==='') { clearInvalid(phoneEl); return; }
      isValidPhone(phoneEl.value) ? clearInvalid(phoneEl) : markInvalid(phoneEl, 'Numéro invalide');
    });
  }

  // toast container
  let toastWrap = document.querySelector('.toast-wrap');
  if(!toastWrap){
    toastWrap = document.createElement('div'); toastWrap.className = 'toast-wrap';
    document.body.appendChild(toastWrap);
  }

  function showToast(text, timeout=3500){
    const t = document.createElement('div'); t.className = 'toast';
    t.textContent = text;
    toastWrap.appendChild(t);
    setTimeout(()=> t.classList.add('visible'), 20);
    setTimeout(()=> { t.style.opacity=0; setTimeout(()=> t.remove(), 400); }, timeout);
  }

  // submit handler (simulé)
  form.addEventListener('submit', function(e){
    e.preventDefault();
    // basic check
    let ok = true;
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(f => {
      if(!f.value || f.value.trim()===''){
        markInvalid(f, 'Ce champ est requis');
        ok = false;
      }
    });
    if(emailEl && !isValidEmail(emailEl.value)) { markInvalid(emailEl,'Email invalide'); ok=false; }
    if(phoneEl && phoneEl.value.trim() && !isValidPhone(phoneEl.value)) { markInvalid(phoneEl,'Numéro invalide'); ok=false; }

    if(!ok) { showToast('Vérifiez les champs signalés', 3000); return; }

    // si tu as un endpoint PHP, remplacer la partie fetch par le vrai endpoint
    // simulation : disable btn, show spinner, fake success
    const btn = form.querySelector('button[type="submit"]') || form.querySelector('.btn-primary');
    if(btn) { btn.disabled = true; btn.style.opacity = 0.7; }
    showToast('Envoi en cours…', 1200);

    // SIMULATE sending by timeout (replace by fetch POST to server)
    setTimeout(()=>{
      if(btn){ btn.disabled = false; btn.style.opacity = 1; }
      form.reset();
      showToast('Message envoyé — nous vous répondrons sous 24-48h', 4200);
    }, 1200);

    // si tu veux un vrai envoi :
    // const fd = new FormData(form);
    // fetch('actions/contact.php', {method:'POST', body:fd}).then(...).catch(...);
  });

  // optional : lazy embed google maps if .map-embed exists and has data-src
  const mapWrap = document.querySelector('.map-embed');
  if(mapWrap && mapWrap.dataset.src){
    // inject iframe
    const iframe = document.createElement('iframe');
    iframe.src = mapWrap.dataset.src;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 0;
    iframe.loading = 'lazy';
    mapWrap.appendChild(iframe);
  }

})();
