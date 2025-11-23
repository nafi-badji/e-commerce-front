// panier.js
(function(){
  const STORAGE_KEY = "mn_cart_v1"; // doit être la même clé que ta page produits utilise

  function getCart(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {items:[]}; }
    catch(e){ return {items:[]}; }
  }

  function saveCart(cart){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    render();
  }

  function formatPrice(n){
    // si prix numériques -> formattage
    const num = Number(n) || 0;
    return num.toLocaleString("fr-FR") + " FCFA";
  }

  function render(){
    const root = document.getElementById("cart-root");
    if(!root) return;

    const cart = getCart();
    if(!cart.items || !cart.items.length){
      root.innerHTML = `
        <div class="cart-empty">
          <h2 class="cart-empty-title">Votre panier est vide</h2>
          <p class="cart-empty-desc">Ajoutez des produits depuis la page Produits.</p>
          <a class="btn btn-primary" href="index.php?page=produits">Voir les produits</a>
        </div>
      `;
      return;
    }

    let total = 0;
    const rows = cart.items.map(item=>{
      const line = (Number(item.price)||0) * (Number(item.qty)||1);
      total += line;
      // protège src vide
      const src = item.image ? item.image : "/e-commerce-front/assets/images/placeholder.png";
      return `
        <tr data-id="${item.id}">
          <td><img src="${src}" alt="${item.name}"/></td>
          <td><strong>${escapeHtml(item.name)}</strong><div class="muted">${escapeHtml(item.short||"")}</div></td>
          <td>${formatPrice(item.price)}</td>
          <td>
            <div class="qty-control">
              <button class="qty-btn dec">−</button>
              <input class="qty-input" type="number" value="${item.qty}" min="1"/>
              <button class="qty-btn inc">+</button>
            </div>
          </td>
          <td class="line-total">${formatPrice(line)}</td>
        </tr>
      `;
    }).join("");

    root.innerHTML = `
      <table class="cart-table" role="table" aria-label="Liste des articles du panier">
        <thead><tr><th>Produit</th><th>Nom</th><th>Prix</th><th>Quantité</th><th>Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>

      <div class="cart-summary">
        <div class="cart-total">Total : <span id="cart-total">${formatPrice(total)}</span></div>
        <div class="cart-actions">
          <button id="clear-cart" class="btn-outline">Vider le panier</button>
          <button id="checkout" class="btn-primary">Finaliser la commande</button>
        </div>
      </div>
    `;

    // lier les boutons
    document.querySelectorAll(".qty-btn.inc").forEach(btn=>{
      btn.addEventListener("click", (e)=>{
        const tr = e.target.closest("tr");
        const id = tr.dataset.id;
        changeQty(id, +1);
      });
    });

    document.querySelectorAll(".qty-btn.dec").forEach(btn=>{
      btn.addEventListener("click", (e)=>{
        const tr = e.target.closest("tr");
        const id = tr.dataset.id;
        changeQty(id, -1);
      });
    });

    document.querySelectorAll(".qty-input").forEach(input=>{
      input.addEventListener("change", (e)=>{
        const tr = e.target.closest("tr");
        const id = tr.dataset.id;
        const v = Math.max(1, parseInt(e.target.value)||1);
        setQty(id, v);
      });
    });

    document.getElementById("clear-cart").addEventListener("click", ()=>{
      if(confirm("Vider le panier ?")) {
        localStorage.removeItem(STORAGE_KEY);
        render();
      }
    });

    document.getElementById("checkout").addEventListener("click", ()=>{
      // ici tu peux appeler back-end / action php si tu veux, mais on simule la validation côté front
      // => affiche confirmation et vide le panier
      showToast("Votre commande a été passée avec succès 🎉");
      localStorage.removeItem(STORAGE_KEY);
      // redirection facultative
      setTimeout(()=>{ window.location.href = "index.php?page=accueil"; }, 1100);
    });
  }

  function changeQty(id, delta){
    const cart = getCart();
    const it = cart.items.find(x=>String(x.id) === String(id));
    if(!it) return;
    it.qty = Math.max(1, (Number(it.qty)||1) + delta);
    saveCart(cart);
  }

  function setQty(id, q){
    const cart = getCart();
    const it = cart.items.find(x=>String(x.id) === String(id));
    if(!it) return;
    it.qty = Math.max(1, Number(q)||1);
    saveCart(cart);
  }

  // simple toast en bas
  function showToast(msg){
    let t = document.getElementById("__mn_toast");
    if(!t){
      t = document.createElement("div");
      t.id = "__mn_toast";
      t.style.position = "fixed";
      t.style.right = "18px";
      t.style.bottom = "18px";
      t.style.background = "rgba(10,20,40,0.92)";
      t.style.color = "#fff";
      t.style.padding = "12px 18px";
      t.style.borderRadius = "10px";
      t.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
      t.style.zIndex = 9999;
      document.body.appendChild(t);
    }
    t.innerText = msg;
    t.style.opacity = "1";
    setTimeout(()=>{ t.style.transition = "opacity .6s"; t.style.opacity = "0"; }, 1600);
  }

  function escapeHtml(s){
    if(!s) return "";
    return String(s).replace(/[&<>"']/g, function(m){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
    });
  }

  // init
  document.addEventListener("DOMContentLoaded", render);
})();




// exemple simple: ajouter au panier depuis la page produits
(function(){
  const STORAGE_KEY = 'mn_cart_v1';

  function getCart(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { items: [] }; }
    catch(e){ return { items: [] }; }
  }
  function saveCart(cart){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  // appelé quand on clique sur un bouton "Ajouter au panier"
  function addToCart(obj){
    // obj: { id, name, price, qty, image, short, stock }
    const cart = getCart();
    const existing = cart.items.find(i => String(i.id) === String(obj.id));
    if(existing){
      existing.qty = Math.min((existing.qty||0) + (obj.qty||1), Number(obj.stock||9999));
    } else {
      cart.items.push({
        id: obj.id,
        name: obj.name,
        price: Number(obj.price||0),
        qty: Number(obj.qty||1),
        image: obj.image || '',
        short: obj.short || '',
        stock: obj.stock || 0
      });
    }
    saveCart(cart);
    // petit feedback UI si tu veux
    console.log('Produit ajouté ->', obj, 'Cart now:', JSON.parse(localStorage.getItem(STORAGE_KEY)));
  }

  // liaison globale : boutons qui ont la classe .btn-add (comme dans ton XSL)
  document.addEventListener('click', function(e){
    const btn = e.target.closest && e.target.closest('.btn-add');
    if(!btn) return;
    const id = btn.getAttribute('data-id');
    const name = btn.getAttribute('data-name');
    const price = btn.getAttribute('data-price');
    const stock = btn.getAttribute('data-stock') || 1;
    // récupère quantité depuis l'input voisin si présent
    let qty = 1;
    const row = btn.closest('.product-card');
    if(row){
      const qInput = row.querySelector('.qty-input');
      if(qInput) qty = Math.max(1, parseInt(qInput.value)||1);
      // recherche aussi une image si tu veux l'enregistrer
      const img = row.querySelector('img.product-image');
      var image = img ? img.getAttribute('src') : '';
      const short = row.querySelector('.product-desc') ? row.querySelector('.product-desc').textContent.trim() : '';
    }
    addToCart({ id, name, price, qty, image, short, stock });
  });

})();
// panier.js
document.addEventListener('DOMContentLoaded', function(){
  const container = document.getElementById('cartItems');
  if (!container) return;
  const cart = JSON.parse(localStorage.getItem('mn_cart') || '[]');
  if (cart.length === 0) {
    container.innerHTML = '<div class="empty">Votre panier est vide.</div>';
    return;
  }
  let html = '';
  cart.forEach(it => {
    html += `<div class="cart-line">
      <img src="${it.image || '/e-commerce-front/assets/images/placeholder.png'}" alt="${it.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-right:10px"/>
      <div class="cart-line-info">
        <div class="name">${it.name}</div>
        <div class="qty">Quantité: ${it.qty}</div>
        <div class="price">${(it.price * it.qty).toLocaleString()} FCFA</div>
      </div>
    </div>`;
  });
  container.innerHTML = html;

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', function(){
    // Exemple simple: simule validation commande et affiche toast/alerte
    // Ici tu peux appeler ton backend pour créer la commande.
    showToast('Votre commande a été passée avec succès.');
    // vider le panier si tu veux:
    // localStorage.removeItem('mn_cart');
    // rediriger si nécessaire
  });
});
