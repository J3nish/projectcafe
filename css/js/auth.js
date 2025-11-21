// auth.js - simple local auth for demo (stores users in localStorage)
(function(){
  function read(key, fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch(e){return fallback}}
  function write(key,val){localStorage.setItem(key,JSON.stringify(val))}

  // ensure users array exists
  if(!localStorage.getItem('users')) write('users', []);

  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if(signupForm){
    signupForm.addEventListener('submit', function(e){
      e.preventDefault(); const name = this.name.value.trim(); const email = this.email.value.trim().toLowerCase(); const pw = this.password.value;
      const users = read('users', []);
      if(!name){ alert('Name is required'); return }
      if(!email || !/^\S+@\S+\.\S+$/.test(email)){ alert('Enter a valid email'); return }
      if(!pw || pw.length < 6){ alert('Password must be at least 6 characters'); return }
      if(users.find(u=>u.email===email)){ alert('Email already registered'); return }
      users.push({id:Date.now(),name,email,password:pw}); write('users', users); alert('Account created'); location.href='login.html';
    })
  }

  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault(); const email = this.email.value.trim().toLowerCase(); const pw = this.password.value;
      if(!email || !pw){ alert('Please enter email and password'); return }
      const users = read('users', []); const user = users.find(u=>u.email===email && u.password===pw);
    if(!user){
  const err = document.getElementById("login-error");
  if (err) {
    err.textContent = "Incorrect email or password";
    err.classList.remove("d-none");
  } else {
    alert("Incorrect email or password");
  }
  return;
}

      const sessionId = Date.now();
      const sessionUser = {id:user.id,name:user.name,email:user.email,sessionId};
      sessionStorage.setItem('user', JSON.stringify(sessionUser));
      // add to loggedInUsers list in localStorage
      const active = read('loggedInUsers', []);
      active.push(sessionUser); write('loggedInUsers', active);
      alert('Logged in');
      // redirect to home
      location.href='index.html';
    })
  }

  // forgot password for users – simple reset flow
// forgot password buttons → open reset page instead of prompt()
const userForgot = document.getElementById('user-forgot');
const userForgot2 = document.getElementById('user-forgot-2');

if (userForgot) userForgot.addEventListener('click', e => {
  e.preventDefault();
  location.href = 'forgot.html';
});
if (userForgot2) userForgot2.addEventListener('click', e => {
  e.preventDefault();
  location.href = 'forgot.html';
});

// handle reset form if on forgot.html
const resetForm = document.getElementById('reset-form');
if (resetForm) {
  resetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.email.value.trim().toLowerCase();
    const newPw = this.password.value.trim();
    const users = read('users', []);

    const user = users.find(u => u.email === email);
    if (!user) { alert('No account found with that email'); return }

    user.password = newPw;
    write('users', users);
    alert('Password reset successfully — please login');
    location.href = 'login.html';
  });
}

  // update nav username if present
  document.addEventListener('DOMContentLoaded', ()=>{
    const navUser = document.getElementById('nav-user');
    if(navUser){ const u = sessionStorage.getItem('user'); if(u){ const user = JSON.parse(u); navUser.textContent = user.name; navUser.parentElement.href='index.html';
        // add logout small button
        const li = navUser.parentElement.closest('.nav-item');
        if(li){ const logoutA = document.createElement('a'); logoutA.className='nav-link ms-2'; logoutA.href='#'; logoutA.id='nav-logout'; logoutA.innerHTML = '<i class="bi bi-box-arrow-right"></i>';
          li.parentElement.appendChild(logoutA);
          logoutA.addEventListener('click', (ev)=>{ ev.preventDefault();
            // remove from active users list
            const su = JSON.parse(sessionStorage.getItem('user')||'null');
            if(su && su.sessionId){ const active = read('loggedInUsers', []); const filtered = active.filter(x=>x.sessionId !== su.sessionId); write('loggedInUsers', filtered); }
            sessionStorage.removeItem('user'); location.reload(); }); }
      } }
  })

})();
