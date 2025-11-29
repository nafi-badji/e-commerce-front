// /assets/js/panier.js (REPLACE)
(function(){
  const STORAGE_KEY = 'mn_cart_v1';
  const ROOT_ID = 'cart-root';
  const CART_COUNT_ID = 'cart-count';

  function readCart(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }catch(e){ return []; } }
  function writeCart(cart){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); render(); updateCount(); }

  function formatPrice(n){ return (Number(n)||0).toLocaleString('fr-FR') + ' FCFA'; }

  function updateCount(){
    const el = document.getElementById(CART_COUNT_ID);
    if(!el) return;
    const cart = readCart();
    const n = cart.reduce((s,i)=> s + Number(i.qty||0), 0);
    el.textContent = n;
  }

  function render(){
    const root = document.getElementById(ROOT_ID);
    if(!root) return;
    const cart = readCart();
    if(!cart.length){
      root.innerHTML = `
        <div class="cart-empty">
          <img src="/e-commerce-front/assets/images/cart-empty.png" alt="Panier vide" style="max-width:160px;margin:0 auto 12px;display:block"/>
          <h2 class="cart-empty-title">Votre panier est vide</h2>
          <p class="cart-empty-desc">Ajoutez des produits depuis la page Produits.</p>
          <div style="margin-top:14px;">
            <a class="btn btn-primary" href="index.php?page=produits">Voir les produits</a>
          </div>
        </div>
      `;
      return;
    }

    // table-like layout
    let total = 0;
    let rows = '';
    cart.forEach(item=>{
      const line = (Number(item.price)||0) * (Number(item.qty)||1);
      total += line;
      const img = item.image || '/e-commerce-front/assets/images/placeholder.png';
      rows += `
        <div class="cart-line" data-id="${item.id}" style="display:flex;gap:12px;align-items:center;padding:12px;border-bottom:1px solid #f1f6fb">
          <img src="${img}" alt="${escapeHtml(item.name)}" style="width:92px;height:92px;object-fit:cover;border-radius:8px"/>
          <div style="flex:1">
            <div style="font-weight:700">${escapeHtml(item.name)}</div>
            <div class="muted" style="font-size:.95rem">${escapeHtml(item.short||'')}</div>
            <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
              <button class="qty-dec" style="padding:6px 10px">−</button>
              <input class="qty-input" type="number" value="${item.qty}" min="1" style="width:64px;text-align:center;padding:6px;border-radius:8px;border:1px solid #eef3fb"/>
              <button class="qty-inc" style="padding:6px 10px">+</button>
              <button class="remove-item" style="margin-left:12px;background:transparent;border:0;color:#e04a4a;cursor:pointer">Supprimer</button>
            </div>
          </div>
          <div style="min-width:120px;text-align:right">
            <div style="font-weight:700">${formatPrice(item.price)}</div>
            <div style="color:#6b7280;margin-top:8px">${formatPrice(line)}</div>
          </div>
        </div>
      `;
    });

    root.innerHTML = `
      <div class="cart-list">${rows}</div>
      <div class="cart-summary" style="display:flex;justify-content:space-between;align-items:center;margin-top:18px">
        <div class="cart-total" style="font-weight:700">Total : <span id="cart-total">${formatPrice(total)}</span></div>
        <div class="cart-actions" style="display:flex;gap:12px">
          <button id="clear-cart" class="btn-outline">Vider le panier</button>
          <button id="checkout" class="btn-primary">Finaliser la commande</button>
        </div>
      </div>
    `;

    // bind controls
    root.querySelectorAll('.qty-inc').forEach(b=>{
      b.addEventListener('click', (e)=>{
        const id = e.target.closest('.cart-line').dataset.id;
        changeQty(id, +1);
      });
    });
    root.querySelectorAll('.qty-dec').forEach(b=>{
      b.addEventListener('click', (e)=>{
        const id = e.target.closest('.cart-line').dataset.id;
        changeQty(id, -1);
      });
    });
    root.querySelectorAll('.qty-input').forEach(inp=>{
      inp.addEventListener('change', (e)=>{
        const id = e.target.closest('.cart-line').dataset.id;
        const v = Math.max(1, parseInt(e.target.value||1));
        setQty(id, v);
      });
    });
    root.querySelectorAll('.remove-item').forEach(b=>{
      b.addEventListener('click', (e)=>{
        const id = e.target.closest('.cart-line').dataset.id;
        removeItem(id);
      });
    });

    const clearBtn = document.getElementById('clear-cart');
    if(clearBtn) clearBtn.addEventListener('click', ()=>{
      if(confirm('Vider le panier ?')) {
        localStorage.removeItem(STORAGE_KEY);
        render();
        updateCount();
      }
    });

    const checkoutBtn = document.getElementById('checkout');
    if(checkoutBtn) checkoutBtn.addEventListener('click', ()=>{
      // simulation de validation : ici tu peux appeler ton backend
      showToast('Votre commande a été passée avec succès 🎉');
      localStorage.removeItem(STORAGE_KEY);
      render();
      updateCount();
      setTimeout(()=> window.location.href = 'index.php?page=accueil', 1100);
    });
  }

  function changeQty(id, delta){
    const cart = readCart();
    const it = cart.find(x=> String(x.id) === String(id));
    if(!it) return;
    it.qty = Math.max(1, (Number(it.qty)||1) + delta);
    writeCart(cart);
  }
  function setQty(id, q){
    const cart = readCart();
    const it = cart.find(x=> String(x.id) === String(id));
    if(!it) return;
    it.qty = Math.max(1, Number(q)||1);
    writeCart(cart);
  }
  function removeItem(id){
    let cart = readCart();
    cart = cart.filter(x=> String(x.id) !== String(id));
    writeCart(cart);
  }

  function showToast(msg){
    let t = document.getElementById('__mn_toast');
    if(!t){
      t = document.createElement('div');
      t.id='__mn_toast';
      Object.assign(t.style,{position:'fixed',right:'18px',bottom:'18px',background:'#111',color:'#fff',padding:'10px 14px',borderRadius:'8px',zIndex:9999});
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._t);
    t._t = setTimeout(()=> { t.style.transition='opacity .5s'; t.style.opacity='0'; }, 2000);
  }

  function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  // init
  document.addEventListener('DOMContentLoaded', ()=>{
    render();
    updateCount();
  });
})();
