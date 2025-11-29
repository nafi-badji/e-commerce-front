localStorage.setItem('is_admin','1'); // pour simuler admin

// admin.js - front-only admin UI using localStorage
(function(){
  const PRODUCTS_KEY = 'mn_products';
  const ORDERS_KEY   = 'mn_orders';
  const ADMIN_KEY    = 'is_admin';

// exemple : pointe vers tes images copiées
const DEFAULT_IMG = '/e-commerce-front/assets/images/robe-elegante.jpg';
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));
  function uid(){ return 'id'+Math.random().toString(36).slice(2,9); }

  // storage helpers
  function read(key, fallback){ try { return JSON.parse(localStorage.getItem(key)||'null') || fallback; } catch(e){ return fallback; } }
  function write(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

  // sample seed
  function seedDemo(){
  const demoProducts = [
    {id: uid(), name: 'Robe Élégante', price: 10000, stock: 50, category: 'Femme', image: '/e-commerce-front/assets/images/robe moulante.png', short: 'Robe élégante.'},
    {id: uid(), name: 'Chemise Casual Homme', price: 8000, stock: 50, category: 'Homme', image: '/e-commerce-front/assets/images/chemise.png', short: 'Chemise casual homme.'},
    {id: uid(), name: 'Pantalon Chino Coupe Droite', price: 12000, stock: 50, category: 'Unisexe', image: '/e-commerce-front/assets/images/pantalon-chino.png', short: 'Coupe moderne, confortable.'}
  ];

  const demoOrders = [
    {id: uid(), items: [{id: demoProducts[0].id, name: demoProducts[0].name, price: 25000, qty: 1}], total: 25000, status: 'Nouveau', customer: {name: 'Fatou', email: 'fatou@example.com'}, created: Date.now()}
  ];

  write(PRODUCTS_KEY, demoProducts);
  write(ORDERS_KEY, demoOrders);
  renderProducts();
  renderOrders();
  showToast('Données de démonstration chargées');
}

  // toast
  function showToast(msg){ const t=document.createElement('div'); t.textContent=msg; Object.assign(t.style,{position:'fixed',right:'20px',bottom:'20px',background:'#1673d6',color:'#fff',padding:'10px 14px',borderRadius:'8px',zIndex:9999}); document.body.appendChild(t); setTimeout(()=>t.remove(),2400); }

  // render products grid
  function renderProducts(){
    const wrap = $('#productsContainer');
    const products = read(PRODUCTS_KEY,[]);
    if(!wrap) return;
    if(!products.length){
      wrap.innerHTML = '<div class="admin-empty">Aucun produit — ajoutez-en un ou chargez la demo.</div>';
      return;
    }
    let html = '<div class="products-table">';
    products.forEach(p=>{
      html += `<div class="product-card">
        <img src="${p.image||DEFAULT_IMG}" alt="${p.name}"/>
        <div style="font-weight:700">${p.name}</div>
        <div class="small muted">${p.category} · ${p.stock} en stock</div>
        <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center">
          <div style="font-weight:700">${Number(p.price).toLocaleString()} FCFA</div>
          <div class="product-actions">
            <button class="btn editProduct" data-id="${p.id}">Éditer</button>
            <button class="btn btn-danger deleteProduct" data-id="${p.id}">Suppr</button>
          </div>
        </div>
      </div>`;
    });
    html += '</div>';
    wrap.innerHTML = html;

    // attach events
    $$('.editProduct').forEach(btn => btn.addEventListener('click', e=>{
      const id = btn.dataset.id;
      openEditProduct(id);
    }));
    $$('.deleteProduct').forEach(btn => btn.addEventListener('click', e=>{
      const id = btn.dataset.id;
      if(!confirm('Supprimer ce produit ?')) return;
      let list = read(PRODUCTS_KEY,[]);
      list = list.filter(p=>p.id!==id);
      write(PRODUCTS_KEY,list);
      renderProducts();
      showToast('Produit supprimé');
    }));
  }

  // render orders list
  function renderOrders(){
    const wrap = $('#ordersContainer');
    const orders = read(ORDERS_KEY,[]);
    if(!wrap) return;
    if(!orders.length){
      wrap.innerHTML = '<div class="admin-empty">Aucune commande pour le moment.</div>';
      return;
    }
    let html = '<div class="orders-list">';
    orders.forEach(o=>{
      const date = new Date(o.created||Date.now()).toLocaleString();
      html += `<div class="order-card">
        <div>
          <div style="font-weight:700">Commande ${o.id}</div>
          <div class="small muted">${o.customer?.name||'Client'} · ${date}</div>
          <div style="margin-top:8px">${o.items.map(i=>`${i.qty}× ${i.name}`).join('<br/>')}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700">${Number(o.total||0).toLocaleString()} FCFA</div>
          <div style="margin-top:8px">
            <select class="orderStatus" data-id="${o.id}">
              <option ${o.status==='Nouveau'?'selected':''}>Nouveau</option>
              <option ${o.status==='En traitement'?'selected':''}>En traitement</option>
              <option ${o.status==='Expédiée'?'selected':''}>Expédiée</option>
              <option ${o.status==='Livrée'?'selected':''}>Livrée</option>
              <option ${o.status==='Annulée'?'selected':''}>Annulée</option>
            </select>
          </div>
          <div style="margin-top:8px">
            <button class="btn btn-danger removeOrder" data-id="${o.id}">Suppr</button>
          </div>
        </div>
      </div>`;
    });
    html += '</div>';
    wrap.innerHTML = html;

    $$('.orderStatus').forEach(s=>{
      s.addEventListener('change', e=>{
        const id = s.dataset.id; const newStatus = s.value;
        let orders = read(ORDERS_KEY,[]);
        orders = orders.map(o=> o.id===id ? Object.assign({},o,{status:newStatus}) : o );
        write(ORDERS_KEY, orders);
        showToast('Statut mis à jour');
      });
    });
    $$('.removeOrder').forEach(b=>{
      b.addEventListener('click', e=>{
        if(!confirm('Supprimer cette commande ?')) return;
        let id=b.dataset.id;
        let orders = read(ORDERS_KEY,[]);
        orders = orders.filter(o=>o.id!==id);
        write(ORDERS_KEY,orders);
        renderOrders();
        showToast('Commande supprimée');
      });
    });
  }

  // product form open / save
  function openNewProduct(){
    $('#productFormWrap').style.display='block';
    $('#formTitle').textContent='Ajouter un produit';
    $('#p_name').value=''; $('#p_price').value=''; $('#p_stock').value=1; $('#p_cat').value=''; $('#p_image').value=''; $('#p_short').value='';
    $('#deleteProduct').style.display='none';
    $('#saveProduct').dataset.mode='create';
  }
  function openEditProduct(id){
    const products = read(PRODUCTS_KEY,[]);
    const p = products.find(x=>x.id===id);
    if(!p) return alert('Produit introuvable');
    $('#productFormWrap').style.display='block';
    $('#formTitle').textContent='Modifier le produit';
    $('#p_name').value=p.name; $('#p_price').value=p.price; $('#p_stock').value=p.stock; $('#p_cat').value=p.category; $('#p_image').value=p.image||''; $('#p_short').value = p.short||'';
    $('#saveProduct').dataset.mode='edit'; $('#saveProduct').dataset.id = id;
    $('#deleteProduct').style.display='inline-block'; $('#deleteProduct').dataset.id=id;
  }

  function saveProductHandler(){
    const mode = this.dataset.mode;
    const name = $('#p_name').value.trim();
    const price = Number($('#p_price').value||0);
    const stock = Number($('#p_stock').value||0);
    const category = $('#p_cat').value.trim();
    const image = $('#p_image').value.trim() || DEFAULT_IMG;
    const short = $('#p_short').value.trim();

    if(!name || !price){ return alert('Nom et prix requis'); }

    let products = read(PRODUCTS_KEY,[]);
    if(mode==='create'){
      const newP = { id: uid(), name, price, stock, category, image, short };
      products.unshift(newP);
      write(PRODUCTS_KEY, products);
      showToast('Produit ajouté');
    } else if(mode==='edit'){
      const id = this.dataset.id;
      products = products.map(p=> p.id===id ? Object.assign({},p,{name,price,stock,category,image,short}) : p );
      write(PRODUCTS_KEY,products);
      showToast('Produit modifié');
    }
    $('#productFormWrap').style.display='none';
    renderProducts();
  }

  function deleteProductHandler(){
    const id = this.dataset.id;
    if(!confirm('Supprimer définitivement ce produit ?')) return;
    let products = read(PRODUCTS_KEY,[]);
    products = products.filter(p=>p.id!==id);
    write(PRODUCTS_KEY,products);
    $('#productFormWrap').style.display='none';
    renderProducts();
    showToast('Produit supprimé');
  }

  // clear data
  function clearAll(){
    if(!confirm('Effacer produits et commandes (local only) ?')) return;
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(ORDERS_KEY);
    renderProducts(); renderOrders();
    showToast('Données effacées (local)');
  }

  // check admin
  function checkAdmin(){
    const isAdmin = localStorage.getItem(ADMIN_KEY) === '1' || localStorage.getItem(ADMIN_KEY) === 'true';
    if(!isAdmin){
      $('#adminBlocked').style.display='block';
      $('#adminContent').style.display='none';
    } else {
      $('#adminBlocked').style.display='none';
      $('#adminContent').style.display='block';
      renderProducts();
      renderOrders();
    }
  }

  // logoutAdmin (remove flag)
  function logoutAdmin(){
    localStorage.removeItem(ADMIN_KEY);
    checkAdmin();
    showToast('Déconnexion admin (simulée)');
  }

  // bind UI
  document.addEventListener('DOMContentLoaded',function(){
    checkAdmin();
    $('#btnNewProduct').addEventListener('click', openNewProduct);
    $('#saveProduct').addEventListener('click', saveProductHandler);
    $('#cancelProduct').addEventListener('click', ()=>{ $('#productFormWrap').style.display='none'; });
    $('#deleteProduct').addEventListener('click', deleteProductHandler);
    $('#seedDemo').addEventListener('click', seedDemo);
    $('#clearData').addEventListener('click', clearAll);
    $('#logoutAdmin').addEventListener('click', logoutAdmin);
  });

})();
