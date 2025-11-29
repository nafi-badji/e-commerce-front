// inscription.js
document.addEventListener('DOMContentLoaded', function(){
  // toggle password (used by buttons with class "pwd-toggle")
  window.togglePwd = function(inputId, btn){
    const inp = document.getElementById(inputId);
    if(!inp) return;
    if(inp.type === 'password'){ inp.type = 'text'; btn.textContent = 'Cacher'; }
    else { inp.type = 'password'; btn.textContent = 'Voir'; }
  };

  // avatar preview
  window.previewAvatar = function(ev){
    const file = ev.target.files && ev.target.files[0];
    const preview = document.getElementById('avatarPreview');
    if(!preview) return;
    if(file){
      const reader = new FileReader();
      reader.onload = function(e){ preview.style.backgroundImage = url(${e.target.result}); preview.style.borderStyle='solid'; };
      reader.readAsDataURL(file);
    } else {
      preview.style.backgroundImage = '';
    }
  };

  // password / confirm check (live)
  const pw = document.getElementById('password');
  const conf = document.getElementById('confirm');
  const matchEl = document.getElementById('pw-match');
  function checkMatch(){
    if(!pw || !conf || !matchEl) return;
    if(conf.value.length === 0){ matchEl.textContent = ''; return; }
    matchEl.textContent = (pw.value === conf.value) ? 'Les mots de passe correspondent.' : 'Les mots de passe ne correspondent pas.';
    matchEl.style.color = (pw.value === conf.value) ? 'green' : '#c0392b';
  }
  if(pw && conf){
    pw.addEventListener('input', checkMatch);
    conf.addEventListener('input', checkMatch);
  }
});