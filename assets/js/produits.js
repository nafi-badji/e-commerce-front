// /assets/js/produits.js (REPLACE)
(function(){
  const STORAGE_KEY = 'mn_cart_v1';
  const USER_FLAG = 'is_logged'; // simule connexion côté front (localStorage)

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

    // initial update cart count on load
    updateCartCount();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
