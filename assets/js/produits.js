// /assets/js/produits.js (REPLACE)
(function(){
  const STORAGE_KEY = 'mn_cart_v1';
  const USER_FLAG = 'is_logged'; // simule connexion côté front (localStorage)

<<<<<<< HEAD
  // read DOM nodes
  const grid = document.getElementById('productsGrid');
  const search = document.getElementById('searchBox');
  const catFilter = document.getElementById('catFilter');
  const sortBy = document.getElementById('sortBy');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const clearBtn = document.getElementById('clearCart');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // basic in-memory cart stored in localStorage - DÉPRÉCIÉ, utiliser le système unifié mn_cart_v1
  // Ce code est conservé pour compatibilité mais devrait être remplacé par le système unifié
  let cart = JSON.parse(localStorage.getItem('mn_cart') || '{}');

  function saveCart(){
    localStorage.setItem('mn_cart', JSON.stringify(cart));
    renderCart();
    // Mettre à jour le compteur (mais ce système utilise l'ancienne clé)
    // TODO: Migrer vers mn_cart_v1
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
=======
  function readCart(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch(e){ return []; }
  }
  function writeCart(cart){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
  }
  function updateCartCount(){
    const el = document.getElementById('cart-count');
    if(!el) return;
    const cart = readCart();
    const n = cart.reduce((s,i)=> s + Number(i.qty||0), 0);
    el.textContent = n;
>>>>>>> 0713bd37c69c23ad29b29f41ac44fd0c02e28162
  }

  function showToast(msg){
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style,{position:'fixed',right:'18px',bottom:'18px',background:'#1673d6',color:'#fff',padding:'10px 14px',borderRadius:'8px',zIndex:9999});
    document.body.appendChild(t);
    setTimeout(()=> t.remove(),2000);
  }

  // add item to cart (id, name, price, qty, image, short, stock)
  function addToCart(item){
    const cart = readCart();
    const idx = cart.findIndex(p => String(p.id) === String(item.id));
    if(idx >= 0){
      cart[idx].qty = Math.min((+cart[idx].qty || 0) + (+item.qty || 1), item.stock || 9999);
    } else {
      cart.push(item);
    }
    writeCart(cart);
  }

  // init: attach handlers on page product cards
  function init(){
    // quantity +/- buttons
    document.querySelectorAll('.qty-inc').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.dataset.id;
        const inp = document.querySelector(`.qty-input[data-id="${id}"]`);
        if(inp) inp.value = Math.min(Number(inp.max||9999), Number(inp.value||1) + 1);
      });
    });
    document.querySelectorAll('.qty-dec').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.dataset.id;
        const inp = document.querySelector(`.qty-input[data-id="${id}"]`);
        if(inp) inp.value = Math.max(1, Number(inp.value||1) - 1);
      });
    });

    // add to cart
    document.querySelectorAll('.btn-add').forEach(b=>{
      b.addEventListener('click', (e)=>{
        e.preventDefault();

        // 1) si pas connecté => rediriger vers connexion (front-only)
        const logged = localStorage.getItem(USER_FLAG) === '1';
        if(!logged){
          showToast('Veuillez vous connecter pour ajouter au panier...');
          setTimeout(()=> { window.location.href = 'index.php?page=connexion'; }, 700);
          return;
        }

<<<<<<< HEAD
        if(!cart[id]) cart[id] = { id, name, price, qty };
        else cart[id].qty = Math.min(stock, cart[id].qty + qty);

        saveCart();
        showToast('Produit ajouté au panier', 'success');
      });
    });
  }

  // render cart UI
  function renderCart(){
    // clear
    cartItemsEl.innerHTML = '';
    const keys = Object.keys(cart);
    if(keys.length === 0){
      cartItemsEl.innerHTML = '<div class="empty">Votre panier est vide.</div>';
      cartTotalEl.textContent = '0 XOF';
      return;
    }

    let total=0;
    keys.forEach(k=>{
      const it = cart[k];
      total += it.price * it.qty;
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-weight:700">${escapeHtml(it.name)}</div>
            <div style="font-size:.9rem;color:rgba(255,255,255,0.85)">${it.qty} × ${formatNumber(it.price)} XOF</div>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <button class="mini-qty-dec" data-id="${it.id}" style="background:transparent;border:none;color:#e6f3ff;font-size:18px;cursor:pointer">−</button>
            <span style="min-width:28px;text-align:center">${it.qty}</span>
            <button class="mini-qty-inc" data-id="${it.id}" style="background:transparent;border:none;color:#e6f3ff;font-size:18px;cursor:pointer">+</button>
            <button class="mini-remove" data-id="${it.id}" style="background:transparent;border:none;color:#ffd7d7;font-size:14px;cursor:pointer;margin-left:8px">Suppr</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(row);
    });

    cartTotalEl.textContent = formatNumber(total) + ' XOF';

    // attach mini controls
    cartItemsEl.querySelectorAll('.mini-qty-inc').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = b.dataset.id;
        cart[id].qty++;
        saveCart();
      });
    });
    cartItemsEl.querySelectorAll('.mini-qty-dec').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = b.dataset.id;
        if(cart[id].qty > 1) cart[id].qty--;
        else delete cart[id];
        saveCart();
      });
    });
    cartItemsEl.querySelectorAll('.mini-remove').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = b.dataset.id;
        delete cart[id];
        saveCart();
      });
    });
  }

  // clear / checkout
  if(clearBtn) clearBtn.addEventListener('click', ()=>{
    cart = {}; saveCart();
    showToast('Panier vidé', 'success');
  });

  if(checkoutBtn) checkoutBtn.addEventListener('click', ()=>{
    if(Object.keys(cart).length === 0){ showToast('Panier vide', 'info'); return; }
    // simulate order success
    cart = {}; saveCart();
    showToast('Votre commande a été passée avec succès ✔️', 'success');
    // optional: redirect to order confirmation page
  });

  // helper: toast
  function showToast(msg, type){
    const t = document.createElement('div');
    t.className = 'mn-toast mn-toast-'+(type||'default');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(()=> t.classList.add('show'), 10);
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),300); }, 3500);
  }

  // search / filter / sort (basic, re-route DOM nodes)
  function applyFilters(){
    const q = (search.value||'').trim().toLowerCase();
    const cat = catFilter.value;
    const sort = sortBy.value;

    // create array of product cards (DOM elements)
    const cards = Array.from(document.querySelectorAll('.product-card'));

    // filter by cat & search
    let filtered = cards.filter(card=>{
      if(cat && cat !== 'all'){
        const productCat = card.querySelector('.product-card') ? '' : card.dataset.category;
      }
      // category info not in data-attribute -> get from inner
      if(cat && cat!=='all'){
        const nodeCat = card.querySelector('.product-badge'); // not ideal
      }
      // simple name search:
      const name = (card.querySelector('.product-name')||{}).textContent || '';
      if(q && name.toLowerCase().indexOf(q) === -1) return false;

      // category: our XSL didn't set data-category on card, quick check using product-card attr
      if(cat && cat!=='all'){
        const pid = card.getAttribute('data-id');
        // find original product node by id in the DOM (we placed no data-category so skip)
        // easier: rely on name/category mapping in dataset via button
        const btn = card.querySelector('.btn-add');
        if(btn && btn.dataset.category && btn.dataset.category !== cat) return false;
      }
      return true;
    });

    // simple sort by price/name based on data attributes
    if(sort !== 'default'){
      filtered.sort((a,b)=>{
        const btnA = a.querySelector('.btn-add');
        const btnB = b.querySelector('.btn-add');
        const pa = Number(btnA ? btnA.dataset.price : 0);
        const pb = Number(btnB ? btnB.dataset.price : 0);
        const na = (a.querySelector('.product-name')||{}).textContent || '';
        const nb = (b.querySelector('.product-name')||{}).textContent || '';
        if(sort === 'price-asc') return pa - pb;
        if(sort === 'price-desc') return pb - pa;
        if(sort === 'name-asc') return na.localeCompare(nb);
        return 0;
      });
    }

    // re-append in order
    const gridEl = document.getElementById('productsGrid');
    filtered.forEach(c => gridEl.appendChild(c));
  }

  // helpers
  function formatNumber(n){ return new Intl.NumberFormat('fr-FR').format(n); }
  function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }

  // init
  document.addEventListener('DOMContentLoaded', ()=>{
    initControls();
    renderCart();

    // wire search/filter/sort (basic)
    [search, catFilter, sortBy].forEach(el => { if(el) el.addEventListener('input', applyFilters); });
  });
})();




document.getElementById('catFilter').addEventListener('change', function() {
    const cat = this.value;
    window.location = "index.php?page=produits&cat=" + cat;
})

// assets/js/produits.js
(function(){
  const STORAGE_KEY = 'mn_cart_v1';

  /* ---------- helpers ---------- */
  function getCart(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {items:[]}; }
    catch(e){ return {items:[]}; }
  }
  function saveCart(cart){ 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); 
    renderMiniCart(); 
    // Appeler la fonction globale updateCartCount() si elle existe
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
  }
  function formatFCFA(n){ return (Number(n)||0).toLocaleString('fr-FR') + ' FCFA'; }
  function showToast(msg, err){
    let el = document.getElementById('mn-toast');
    if(!el){ el = document.createElement('div'); el.id='mn-toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.className = 'mn-toast' + (err ? ' error' : '');
    el.classList.add('visible');
    clearTimeout(el._t); el._t = setTimeout(()=> el.classList.remove('visible'), 3000);
  }

  /* ---------- cart operations ---------- */
  function addToCartObj(it){
    const cart = getCart();
    const idx = cart.items.findIndex(x => x.id === it.id);
    if(idx >= 0){
      cart.items[idx].qty = (cart.items[idx].qty||0) + (it.qty||1);
    } else {
      cart.items.push(Object.assign({}, it, {qty: it.qty || 1}));
    }
    saveCart(cart);
  }

  function setQty(id, qty){
    const cart = getCart();
    const idx = cart.items.findIndex(x => x.id === id);
    if(idx >= 0){
      if(qty <= 0) cart.items.splice(idx,1);
      else cart.items[idx].qty = qty;
      saveCart(cart);
    }
  }
  function clearCart(){
    localStorage.removeItem(STORAGE_KEY);
    renderMiniCart();
    // Appeler la fonction globale updateCartCount() si elle existe
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
  }

  /* ---------- mini cart render (sidebar) ---------- */
  function renderMiniCart(){
    const root = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if(!root) return;
    const cart = getCart();
    if(!cart.items.length){
      root.innerHTML = '<div class="empty">Votre panier est vide.</div>';
      if(totalEl) totalEl.textContent = '0 FCFA';
      return;
    }
    let html = '';
    let total = 0;
    cart.items.forEach(it => {
      const line = (Number(it.price)||0) * (Number(it.qty)||1);
      total += line;
      html += `
        <div class="mini-item" data-id="${it.id}">
          <img src="${it.image || '/e-commerce-front/assets/images/product-placeholder.png'}" alt="${escapeHtml(it.name)}" class="mini-img"/>
          <div class="mini-info">
            <div class="mini-name">${escapeHtml(it.name)}</div>
            <div class="mini-line">
              <span class="mini-price">${formatFCFA(it.price)}</span>
              <span class="mini-qty">x ${it.qty}</span>
            </div>
          </div>
          <div class="mini-controls">
            <button class="mini-inc" data-id="${it.id}">+</button>
            <button class="mini-dec" data-id="${it.id}">−</button>
          </div>
        </div>`;
    });
    root.innerHTML = html;
    if(totalEl) totalEl.textContent = formatFCFA(total);

    // bind inc/dec
    root.querySelectorAll('.mini-inc').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = b.dataset.id;
        const cart = getCart(); const idx = cart.items.findIndex(x=>x.id===id);
        if(idx>=0){ setQty(id, (Number(cart.items[idx].qty)||0)+1); showToast('Quantité augmentée'); }
      });
    });
    root.querySelectorAll('.mini-dec').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = b.dataset.id;
        const cart = getCart(); const idx = cart.items.findIndex(x=>x.id===id);
        if(idx>=0){ setQty(id, (Number(cart.items[idx].qty)||0)-1); showToast('Quantité diminuée'); }
      });
    });
  }

  // Utiliser la fonction globale updateCartCount() définie dans script.js
  // Pas besoin de redéfinir ici, on utilise celle du scope global

  /* ---------- binding product page actions ---------- */
  function initProductControls(){
    // qty buttons inside product cards
    document.querySelectorAll('.qty-inc').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = b.dataset.id;
        const inp = document.querySelector(`.qty-input[data-id="${id}"]`);
        if(inp) inp.value = Math.max(1, Number(inp.value||0) + 1);
      });
    });
    document.querySelectorAll('.qty-dec').forEach(b=>{
      b.addEventListener('click', e=>{
        const id = b.dataset.id;
        const inp = document.querySelector(`.qty-input[data-id="${id}"]`);
        if(inp) inp.value = Math.max(1, Number(inp.value||0) - 1);
      });
    });

    // add to cart buttons
    document.querySelectorAll('.btn-add').forEach(b=>{
      b.addEventListener('click', e=>{
=======
>>>>>>> 0713bd37c69c23ad29b29f41ac44fd0c02e28162
        const id = b.getAttribute('data-id');
        const name = b.getAttribute('data-name') || b.dataset.name || '';
        const price = Number(b.getAttribute('data-price') || b.dataset.price || 0);
        const stock = Number(b.getAttribute('data-stock') || b.dataset.stock || 0);
        const image = b.getAttribute('data-image') || b.dataset.image || '';
        const row = b.closest('.product-card');
        let qty = 1;
        if(row){
          const qInput = row.querySelector(`.qty-input[data-id="${id}"]`);
          if(qInput) qty = Math.max(1, Number(qInput.value||1));
        }

        const item = {
          id: String(id),
          name: String(name).trim(),
          price: Number(price),
          qty: Number(qty),
          stock: Number(stock),
          image: String(image).trim(),
          short: row ? (row.querySelector('.product-desc')?.textContent || '') : ''
        };

        addToCart(item);
        showToast(`${item.name} ajouté au panier`);
        // rediriger vers panier (si tu veux) :
        // window.location.href = 'index.php?page=panier';
      });
    });

<<<<<<< HEAD
  /* ---------- checkout button ---------- */
  function initCheckoutButtons(){
    const checkout = document.getElementById('checkoutBtn');
    if(checkout){
      checkout.addEventListener('click', e=>{
        // go to panier page
        window.location.href = 'index.php?page=panier';
      });
    }
    const clear = document.getElementById('clearCart');
    if(clear){
      clear.addEventListener('click', e=>{
        clearCart();
        showToast('Panier vidé');
      });
    }
  }

  /* ---------- util escape ---------- */
  function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  /* ---------- init on DOM ready ---------- */
  document.addEventListener('DOMContentLoaded', function(){
    initProductControls();
    initCheckoutButtons();
    renderMiniCart();
    // Appeler la fonction globale updateCartCount() si elle existe
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
  });
=======
    // initial update cart count on load
    updateCartCount();
  }
>>>>>>> 0713bd37c69c23ad29b29f41ac44fd0c02e28162

  document.addEventListener('DOMContentLoaded', init);
})();
<<<<<<< HEAD

// Vérifie si l'utilisateur est connecté (version front simple)
// Si ta partenaire renvoie une vraie variable PHP/XSL on l'utilisera à la place
function isUserLoggedIn() {
    return localStorage.getItem("user_logged") === "1";
}

document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-add');
    if (!btn) return;

    // 1) vérifier si non connecté
    if (!isUserLoggedIn()) {
        alert("Veuillez vous connecter pour ajouter au panier.");
        window.location.href = "index.php?page=connexion";
        return;
    }

    // 2) sinon ajouter normalement
    // (ton code addToCart ici)
});

// produits.js  (front-only: login flag + cart en localStorage)

// Utilitaires panier (localStorage) - UNIFIÉ avec mn_cart_v1
const CART_KEY = 'mn_cart_v1';
function readCart() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_KEY) || '{"items":[]}');
    // Convertir l'ancien format array vers le nouveau format {items: []}
    if (Array.isArray(data)) {
      return { items: data };
    }
    return data;
  } catch(e) {
    return { items: [] };
  }
}
function writeCart(cart) {
  // S'assurer que c'est au format {items: []}
  const cartData = Array.isArray(cart) ? { items: cart } : cart;
  localStorage.setItem(CART_KEY, JSON.stringify(cartData));
  // Mettre à jour le compteur
  if (typeof updateCartCount === 'function') {
    updateCartCount();
  }
}
function addToCart(item) {
  const cart = readCart();
  const items = cart.items || [];
  const idx = items.findIndex(p => String(p.id) === String(item.id));
  if (idx >= 0) {
    items[idx].qty = Math.min((+items[idx].qty || 0) + (+item.qty || 1), item.stock || 9999);
  } else {
    items.push(item);
  }
  writeCart({ items: items });
}

// Vérifie si utilisateur connecté (front-only)
function isUserLoggedIn() {
  return localStorage.getItem('user_logged') === '1';
}

// Fonction d'aide: afficher un petit toast (simple)
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.position = 'fixed';
  t.style.bottom = '22px';
  t.style.left = '50%';
  t.style.transform = 'translateX(-50%)';
  t.style.background = 'rgba(0,0,0,0.75)';
  t.style.color = '#fff';
  t.style.padding = '10px 16px';
  t.style.borderRadius = '8px';
  t.style.zIndex = 9999;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// Interception du click sur "Ajouter au panier"
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.btn-add');
  if (!btn) return;

  // 1) si pas connecté => rediriger vers connexion
  if (!isUserLoggedIn()) {
    // tu peux remplacer alert par un modal plus joli
    showToast('Vous devez vous connecter pour ajouter au panier — redirection...');
    setTimeout(() => {
      window.location.href = 'index.php?page=connexion';
    }, 700);
    return;
  }

  // 2) si connecté => récupérer info et ajouter
  const id = btn.getAttribute('data-id');
  const name = btn.getAttribute('data-name') || btn.dataset.name;
  const price = btn.getAttribute('data-price') || btn.dataset.price || 0;
  const stock = Number(btn.getAttribute('data-stock') || btn.dataset.stock || 0);
  const qtyInput = document.querySelector(`.qty-input[data-id="${id}"]`);
  const qty = qtyInput ? Math.max(1, Number(qtyInput.value || 1)) : 1;

  const item = {
    id: String(id),
    name: String(name),
    price: Number(price),
    qty: Number(qty),
    stock: Number(stock),
    image: btn.getAttribute('data-image') || btn.dataset.image || ''
  };

  addToCart(item);
  showToast(`${item.name} ajouté au panier`);
  // Optionnel : ouvrir mini-cart ou mettre à jour l'UI
  updateMiniCartUI();
});

// OPTIONAL : fonctions pour mini-cart affichage (si tu as un mini cart)
function updateMiniCartUI() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!container) return;
  const cart = readCart();
  const items = cart.items || [];
  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<div class="empty">Votre panier est vide.</div>';
    if (totalEl) totalEl.textContent = '0 FCFA';
    // Mettre à jour le compteur
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
    return;
  }
  items.forEach(it => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <div class="cart-row-left">
        <img src="${it.image||'/e-commerce-front/assets/images/placeholder.png'}" alt="${it.name}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;margin-right:12px"/>
      </div>
      <div class="cart-row-center">
        <div class="cart-name">${it.name}</div>
        <div class="cart-qty">Quantité: ${it.qty}</div>
      </div>
      <div class="cart-row-right">
        <div class="cart-price">${(it.price*it.qty).toLocaleString()} FCFA</div>
      </div>
    `;
    container.appendChild(row);
  });
  if (totalEl) {
    const total = items.reduce((s,i)=> s + (i.price * i.qty), 0);
    totalEl.textContent = `${total.toLocaleString()} FCFA`;
  }
  // Mettre à jour le compteur
  if (typeof updateCartCount === 'function') {
    updateCartCount();
  }
}

// Run on load to update mini-cart if present
document.addEventListener('DOMContentLoaded', updateMiniCartUI);
=======
>>>>>>> 0713bd37c69c23ad29b29f41ac44fd0c02e28162
