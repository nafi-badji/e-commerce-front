// assets/js/script.js - Fonction globale pour mettre à jour le compteur du panier
const CART_STORAGE_KEY = 'mn_cart_v1';

// Fonction globale pour mettre à jour le compteur du panier
function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) {
      countEl.textContent = '0';
      return;
    }
    
    const cart = JSON.parse(cartData);
    const items = cart.items || [];
    const totalQty = items.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    countEl.textContent = totalQty.toString();
  } catch (e) {
    console.error('Erreur lors de la mise à jour du compteur:', e);
    countEl.textContent = '0';
  }
}

// Initialiser le compteur au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  
  // Écouter les changements de localStorage pour mettre à jour le compteur
  // (utile si le panier est modifié dans un autre onglet)
  window.addEventListener('storage', function(e) {
    if (e.key === CART_STORAGE_KEY) {
      updateCartCount();
    }
  });
});

document.addEventListener('DOMContentLoaded', function(){
  const forms = document.querySelectorAll('.auth-form');
  forms.forEach(form=>{
    form.addEventListener('submit', function(e){
      const pwd = form.querySelector('input[name="password"]');
      const email = form.querySelector('input[name="email"]');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        e.preventDefault();
        alert('Veuillez saisir une adresse e-mail valide.');
        email.focus();
        return;
      }
      // Si inscription, vérifier confirmation
      const pwd2 = form.querySelector('input[name="password2"]');
      if (pwd2 && pwd && pwd.value !== pwd2.value) {
        e.preventDefault();
        alert('Les mots de passe ne correspondent pas.');
        pwd2.focus();
        return;
      }
      // laisser le POST se faire
    });
  });
});




































<script>
  (function(){
    const header = document.querySelector('.site-header');
    if(!header) return;

    // seuil en px pour appliquer l'effet 'scrolled'
    const THRESHOLD = 12;

    function onScroll(){
      if(window.scrollY > THRESHOLD) {
        if(!header.classList.contains('scrolled')) header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // initial state (utile si la page est rechargée au milieu)
    document.addEventListener('DOMContentLoaded', onScroll);
    window.addEventListener('scroll', onScroll);
  })();
</script>
