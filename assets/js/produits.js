// /assets/js/produits.js
(function(){
  // util: format price
  function fmt(n){ return new Intl.NumberFormat('fr-FR').format(n) + ' XOF'; }

  // read DOM nodes
  const grid = document.getElementById('productsGrid');
  const search = document.getElementById('searchBox');
  const catFilter = document.getElementById('catFilter');
  const sortBy = document.getElementById('sortBy');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const clearBtn = document.getElementById('clearCart');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // basic in-memory cart stored in localStorage
  let cart = JSON.parse(localStorage.getItem('mn_cart') || '{}');

  function saveCart(){
    localStorage.setItem('mn_cart', JSON.stringify(cart));
    renderCart();
  }

  // initialize qty buttons and add buttons
  function initControls(){
    // quantity inc/dec
    document.querySelectorAll('.qty-inc').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const id = btn.dataset.id;
        const input = document.querySelector('.qty-input[data-id="'+id+'"]');
        const max = parseInt(input.getAttribute('max')||1000);
        let v = parseInt(input.value||1);
        if(v < max) input.value = v+1;
      });
    });
    document.querySelectorAll('.qty-dec').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const id = btn.dataset.id;
        const input = document.querySelector('.qty-input[data-id="'+id+'"]');
        let v = parseInt(input.value||1);
        if(v>1) input.value = v-1;
      });
    });

    // add to cart
    document.querySelectorAll('.btn-add').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price||0);
        const stock = Number(btn.dataset.stock||0);
        const qtyInput = document.querySelector('.qty-input[data-id="'+id+'"]');
        let qty = Math.max(1, parseInt(qtyInput.value||1));
        if(stock === 0){
          showToast('Produit en rupture de stock', 'error');
          return;
        }
        if(qty > stock) qty = stock;

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
  function saveCart(cart){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); renderMiniCart(); updateCartCount(); }
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
    updateCartCount();
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

  function updateCartCount(){
    const el = document.getElementById('cart-count');
    if(!el) return;
    const cart = getCart();
    const qty = cart.items.reduce((s,i)=> s + (Number(i.qty)||0),0);
    el.textContent = qty;
  }

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
        const id = b.getAttribute('data-id');
        const name = b.getAttribute('data-name') || b.dataset.name || '';
        const price = Number(b.getAttribute('data-price') || b.dataset.price || 0);
        const stock = Number(b.getAttribute('data-stock') || b.dataset.stock || 0);
        const image = b.getAttribute('data-image') || (() => {
          // try to find image in same card
          const card = b.closest('.product-card');
          if(card) {
            const img = card.querySelector('.product-image');
            if(img) return img.src;
          }
          return '/e-commerce-front/assets/images/product-placeholder.png';
        })();
        const qtyInput = document.querySelector(`.qty-input[data-id="${id}"]`);
        const qty = qtyInput ? Math.max(1, Number(qtyInput.value||1)) : 1;
        if(stock && qty > stock){
          showToast('Quantité supérieure au stock disponible', true);
          return;
        }
        addToCartObj({id:String(id), name, price, image, qty});
        showToast('Produit ajouté au panier ✓');
        // optionally animate or open miniCart
      });
    });
  }

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
    updateCartCount();
  });

})();

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

// Utilitaires panier (localStorage)
const CART_KEY = 'mn_cart';
function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch(e) {
    return [];
  }
}
function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function addToCart(item) {
  const cart = readCart();
  const idx = cart.findIndex(p => p.id === item.id);
  if (idx >= 0) {
    cart[idx].qty = Math.min((+cart[idx].qty || 0) + (+item.qty || 1), item.stock || 9999);
  } else {
    cart.push(item);
  }
  writeCart(cart);
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
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<div class="empty">Votre panier est vide.</div>';
    if (totalEl) totalEl.textContent = '0 FCFA';
    return;
  }
  cart.forEach(it => {
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
    const total = cart.reduce((s,i)=> s + (i.price * i.qty), 0);
    totalEl.textContent = `${total.toLocaleString()} FCFA`;
  }
}

// Run on load to update mini-cart if present
document.addEventListener('DOMContentLoaded', updateMiniCartUI);
