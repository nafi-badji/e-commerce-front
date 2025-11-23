// assets/js/login.js
(function(){
  const loginBtn = document.getElementById('loginBtn');
  const authAction = document.getElementById('auth-action');
  const email = document.getElementById('email');
  const pwd = document.getElementById('password');
  const toggle = document.getElementById('togglePwd');

  // Toggle password visibility
  toggle && toggle.addEventListener('click', function(){
    if (pwd.type === 'password') {
      pwd.type = 'text';
      toggle.textContent = '🙈';
    } else {
      pwd.type = 'password';
      toggle.textContent = '👁';
    }
  });

  // helper: update auth button text depending on logged state (localStorage simulation)
  function updateAuthState(){
    const logged = localStorage.getItem('mn_logged') === '1';
    if (logged) {
      authAction.textContent = 'Se déconnecter';
      authAction.href = '#logout';
      authAction.classList.add('btn-login-logout');
    } else {
      authAction.textContent = 'Connexion';
      authAction.href = '#login';
      authAction.classList.remove('btn-login-logout');
    }
  }

  // On click login: simple simulation
  loginBtn && loginBtn.addEventListener('click', function(){
    // minimal validation
    if (!email.value || !pwd.value) {
      alert('Entrez votre e-mail et mot de passe.');
      return;
    }
    // simulate success: set logged flag
    localStorage.setItem('mn_logged','1');
    updateAuthState();
    // change button to déconnexion and inform user
    loginBtn.querySelector('.label').textContent = 'Connecté';
    setTimeout(()=> {
      // redirect to accueil (simulate post-login)
      window.location.href = 'index.php?page=accueil';
    }, 600);
  });

  // Auth action click -> logout if logged
  authAction && authAction.addEventListener('click', function(e){
    e.preventDefault();
    const logged = localStorage.getItem('mn_logged') === '1';
    if (logged) {
      // logout
      localStorage.removeItem('mn_logged');
      updateAuthState();
      // go to home
      window.location.href = 'index.php?page=accueil';
    } else {
      // not logged -> go to login (we are on login page)
      window.location.href = 'index.php?page=connexion';
    }
  });

  // initialize
  updateAuthState();
})();
