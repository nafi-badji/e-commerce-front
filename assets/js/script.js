// assets/js/site.js (simple demo pour afficher un compteur si présent)
document.addEventListener('DOMContentLoaded', function(){
  var countEl = document.getElementById('cart-count');
  if(!countEl) return;
  // exemple : récupérer depuis localStorage
  var c = localStorage.getItem('cart_count') || 0;
  countEl.textContent = c;
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
