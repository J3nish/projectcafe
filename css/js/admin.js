// admin.js - simple admin authentication and management
(function(){
  const $ = (s)=> document.querySelector(s);
  const $all = (s)=> Array.from(document.querySelectorAll(s));
  function read(key, fallback){try{const r=localStorage.getItem(key); return r?JSON.parse(r):fallback}catch(e){return fallback}}
  function write(key,val){localStorage.setItem(key,JSON.stringify(val))}

  // default admin credentials (set to jenish / 1234)
  if(!localStorage.getItem('admin')) write('admin', {username:'jenish', password:'1234'});
  // For security of the demo, enforce a single allowed admin credential (hard-coded)
  const DEMO_ADMIN_USER = 'jenish';
  const DEMO_ADMIN_PASS = '1234';

  function checkSession(){
    const s = sessionStorage.getItem('adminUser');
    if(s){ $('#login-panel').classList.add('hidden'); $('#admin-panel').classList.remove('hidden'); renderAdmin(); }
    else{ $('#login-panel').classList.remove('hidden'); $('#admin-panel').classList.add('hidden'); }
  }

  $('#admin-login').addEventListener('submit', function(e){
    e.preventDefault(); const u = this.username.value.trim(); const p = this.password.value;
    // Only allow the single demo admin credentials — ignore any changes stored in localStorage
    if(u === DEMO_ADMIN_USER && p === DEMO_ADMIN_PASS){ sessionStorage.setItem('adminUser', u); checkSession(); }
    else showAlert('Invalid credentials — use jenish / 1234', 'danger');
  });

  $('#logout').addEventListener('click', ()=>{ sessionStorage.removeItem('adminUser'); checkSession(); });

  // admin forgot password flow
  const adminForgot = document.getElementById('admin-forgot');
  if(adminForgot){
    adminForgot.addEventListener('click', function(e){
      e.preventDefault();
      // Disable password reset for admin in this demo — only demo credentials are valid
      alert('Admin password reset is disabled for this demo. Use username: jenish and password: 1234');
    })
  }

  function showAlert(msg, type='success'){
    const el = document.createElement('div'); el.className = `alert alert-${type} mt-3`; el.textContent = msg; document.querySelector('main .container')?.prepend(el);
    setTimeout(()=> el.remove(), 3000);
  }

  // admin toast helper (top-right corner)
  function adminToast(msg, type='success'){
    const id = 'admin-toast-container';
    let container = document.getElementById(id);
    if(!container){ container = document.createElement('div'); container.id = id; container.style.position = 'fixed'; container.style.top = '12px'; container.style.right = '12px'; container.style.zIndex = '1080'; document.body.appendChild(container); }
    const t = document.createElement('div'); t.className = `toast align-items-center text-bg-${type==='danger'?'danger':'success'} mb-2`; t.style.minWidth = '220px'; t.innerHTML = `<div class="d-flex"><div class="toast-body">${msg}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button></div>`;
    container.appendChild(t);
    const close = t.querySelector('.btn-close'); close.addEventListener('click', ()=> t.remove());
    // animate in
    setTimeout(()=> t.classList.add('show'), 10);
    setTimeout(()=> t.remove(), 3000);
  }

  function renderAdmin(){ renderOverview(); renderMenuAdmin(); renderOrdersAdmin(); renderUsersAdmin(); }
  
  function renderOverview(){
    const orders = read('orders', []);
    const totalOrders = orders.length;
    const revenue = orders.filter(o=>o.paid).reduce((s,o)=>s + (Number(o.total)||0), 0);
    const pending = orders.filter(o=> o.status === 'pending' || o.status === 'preparing').length;
    const completed = orders.filter(o=> o.status === 'completed' || o.status === 'paid' || o.status === 'served').length;
    const elOrders = document.getElementById('stat-orders'); if(elOrders) elOrders.textContent = totalOrders;
    const elRev = document.getElementById('stat-revenue'); if(elRev) elRev.textContent = '₹' + Math.round(revenue);
    const elPend = document.getElementById('stat-pending'); if(elPend) elPend.textContent = pending;
    const elComp = document.getElementById('stat-completed'); if(elComp) elComp.textContent = completed;

    // Payment method summary
    const paidOrders = orders.filter(o=>o.paid);
    const cashCount = paidOrders.filter(o=>o.paymentMethod==='cash').length;
    const upiCount = paidOrders.filter(o=>o.paymentMethod==='upi').length;
    const cashAmt = paidOrders.filter(o=>o.paymentMethod==='cash').reduce((s,o)=>s+(Number(o.total)||0),0);
    const upiAmt = paidOrders.filter(o=>o.paymentMethod==='upi').reduce((s,o)=>s+(Number(o.total)||0),0);
    let paySummary = `
      <div class="row g-3">
        <div class="col-md-6"><div class="p-3 bg-white rounded shadow-sm"><strong>₹${Math.round(cashAmt)}</strong><div class="text-muted">Cash Payments (${cashCount})</div></div></div>
        <div class="col-md-6"><div class="p-3 bg-white rounded shadow-sm"><strong>₹${Math.round(upiAmt)}</strong><div class="text-muted">UPI Payments (${upiCount})</div></div></div>
      </div>
    `;
    const statPay = document.getElementById('stat-payment-summary');
    if(statPay) statPay.innerHTML = paySummary;
    // recent orders
    const recent = document.getElementById('overview-orders');
    if(recent){
      recent.innerHTML='';
      orders.slice().reverse().slice(0,6).forEach(o=>{
        const div = document.createElement('div');
        div.className='p-2 mb-2 bg-white rounded shadow-sm';
        const userText = o.user ? `${o.user.name} (${o.user.email})` : (o.table ? `Table ${o.table}` : 'Guest');
        div.innerHTML = `<div><strong>#${o.id}</strong> — ${o.items.map(i=>i.qty+'x '+i.name).join(', ')} <div class="text-muted small">${userText} • ${o.status} • ${o.paid? 'Paid':'Unpaid'}</div></div>`;
        recent.appendChild(div);
      })
    }
  }

  function renderMenuAdmin(){
    const menu = read('menu', []); const container = $('#admin-menu'); container.innerHTML='';
    menu.forEach(item=>{
      const row = document.createElement('div'); row.className='card p-3 mb-3';
      row.innerHTML = `
        <div class="d-flex gap-3 align-items-start">
          <img src="${item.img||''}" alt="" style="width:80px;height:60px;object-fit:cover;border-radius:8px">
          <div class="flex-grow-1">
            <input data-id="${item.id}" class="form-control form-control-sm mb-1 edit-name" value="${item.name}">
            <div class="d-flex gap-2 mb-2">
              <input class="form-control form-control-sm edit-price" data-id="${item.id}" value="${item.price}">
              <input class="form-control form-control-sm edit-category" data-id="${item.id}" value="${item.category||''}" placeholder="Category">
            </div>
            <input class="form-control form-control-sm edit-img mb-2" data-id="${item.id}" value="${item.img||''}" placeholder="Image URL">
            <input type="file" accept="image/*" class="form-control form-control-sm edit-img-file mb-2" data-id="${item.id}">
            <div class="d-flex gap-2 mb-2">
              <input class="form-control form-control-sm edit-stock" data-id="${item.id}" value="${typeof item.stock==='number'?item.stock:''}" placeholder="Stock (number)">
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-success save" data-id="${item.id}">Save</button>
              <button class="btn btn-sm btn-outline-danger delete" data-id="${item.id}">Delete</button>
            </div>
            <textarea class="form-control form-control-sm mt-2 edit-desc" data-id="${item.id}">${item.desc||''}</textarea>
          </div>
        </div>
      `;
      container.appendChild(row);
    });

    // wire image file inputs for immediate preview and populate the edit-img text field with data URL
    $all('#admin-menu .edit-img-file').forEach(fi => {
      fi.addEventListener('change', function(){
        const id = this.getAttribute('data-id'); const file = this.files && this.files[0]; if(!file) return;
        const reader = new FileReader();
        reader.onload = ()=>{
          const data = reader.result;
          const imgInput = document.querySelector(`#admin-menu .edit-img[data-id="${id}"]`);
          if(imgInput) imgInput.value = data;
          const card = this.closest('.card'); if(card){ const imgTag = card.querySelector('img'); if(imgTag) imgTag.src = data; }
        };
        reader.readAsDataURL(file);
      })
    })

    $all('#admin-menu .save').forEach(b=> b.addEventListener('click', ()=>{
      const id = Number(b.getAttribute('data-id'));
      const name = container.querySelector(`.edit-name[data-id="${id}"]`).value.trim();
      const price = parseFloat(container.querySelector(`.edit-price[data-id="${id}"]`).value);
      const desc = container.querySelector(`.edit-desc[data-id="${id}"]`).value;
      const category = container.querySelector(`.edit-category[data-id="${id}"]`).value.trim();
      const img = container.querySelector(`.edit-img[data-id="${id}"]`).value.trim();
      // basic validation
      if(!name){ alert('Name is required'); return }
      if(isNaN(price) || price <= 0){ alert('Price must be a positive number'); return }
      if(!category) { if(!confirm('No category set — continue as Uncategorized?')) return }
      // simple URL-ish check for image (allow empty)
      if(img && !/^https?:\/\/.+\..+/.test(img)){ if(!confirm('Image URL looks invalid. Continue anyway?')) return }
      const menu = read('menu', []); const idx = menu.findIndex(m=>m.id===id);
      if(idx>=0){
        menu[idx].name=name; menu[idx].price=price; menu[idx].desc=desc; menu[idx].category=category||'Uncategorized'; menu[idx].img=img;
        const stockVal = container.querySelector(`.edit-stock[data-id="${id}"]`).value;
        const stockNum = stockVal === '' ? undefined : parseInt(stockVal,10);
        if(typeof stockNum === 'number' && !isNaN(stockNum)) menu[idx].stock = stockNum; else delete menu[idx].stock;
        write('menu', menu); showAlert('Saved', 'success'); renderMenuAdmin(); renderOverview();
      }
    }))

    $all('#admin-menu .delete').forEach(b=> b.addEventListener('click', ()=>{
      if(!confirm('Delete item?')) return; const id = Number(b.getAttribute('data-id'));
      const menu = read('menu', []).filter(m=>m.id!==id); write('menu', menu); renderMenuAdmin();
      // notify admin and refresh overview after delete
      adminToast('Menu item deleted', 'danger');
      renderOverview();
    }))
  }

  $('#add-item-form').addEventListener('submit', function(e){
    e.preventDefault(); const name = this.name.value.trim(); const price = parseFloat(this.price.value); const category = this.category.value.trim() || 'Uncategorized'; const img = this.img.value.trim() || ''; const desc = this.desc.value; const menu = read('menu', []);
    const stockInput = this.stock ? this.stock.value.trim() : '';
    const stockNum = stockInput === '' ? undefined : parseInt(stockInput,10);
    if(!name){ alert('Please provide a name for the item'); return }
    if(isNaN(price) || price <= 0){ alert('Please provide a valid positive price'); return }
    if(img && !/^https?:\/\/.+\..+/.test(img)){ if(!confirm('Image URL looks invalid. Add item anyway?')){} }
    const id = menu.length? Math.max(...menu.map(m=>m.id))+1 : 1;
    const newItem = {id,name,price,desc,img,category}; if(typeof stockNum === 'number' && !isNaN(stockNum)) newItem.stock = stockNum;
    menu.push(newItem); write('menu', menu); this.reset(); renderMenuAdmin(); renderOverview(); showAlert('Item added', 'success');
  });

  function renderUsersAdmin(){
    const container = document.getElementById('admin-users'); if(!container) return; container.innerHTML='';
    const active = read('loggedInUsers', []);
    const users = read('users', []);
    // build a deduped map keyed by email. count active sessions per email
    const map = new Map();
    active.forEach(a=>{
      const email = (a.email||'').toLowerCase(); if(!email) return;
      const cur = map.get(email) || { email, name: a.name || '', sessions: [], registered: false };
      cur.sessions.push(a.sessionId || ''); cur.name = cur.name || a.name || '';
      map.set(email, cur);
    })
    users.forEach(u=>{
      const email = (u.email||'').toLowerCase(); if(!email) return;
      const cur = map.get(email) || { email, name: u.name || '', sessions: [], registered: true, userId: u.id };
      cur.name = cur.name || u.name || '';
      cur.registered = cur.registered || true; cur.userId = cur.userId || u.id;
      map.set(email, cur);
    })

    // if map empty, show message
    if(map.size === 0){ container.innerHTML = '<p class="text-muted">No users logged in.</p>'; return }

    // render one entry per unique email, show session count if >1
    Array.from(map.values()).sort((a,b)=> (b.sessions.length - a.sessions.length)).forEach(entry=>{
      const count = entry.sessions.length || 0;
      const div = document.createElement('div'); div.className='p-2 mb-2 bg-white rounded shadow-sm';
      const displayName = entry.name || entry.email;
      const sessText = count>0 ? `${count} session${count>1?'s':''}` : 'Not currently logged in';
      div.innerHTML = `<div><strong>${displayName}</strong> <div class="text-muted small">${entry.email} • ${sessText}</div><div class="mt-2"><button class='btn btn-sm btn-outline-primary view-user-orders' data-email='${entry.email}'>View Orders</button></div></div>`;
      container.appendChild(div);
    })

    // attach handlers: navigate to Orders tab and filter
    container.querySelectorAll('.view-user-orders').forEach(btn=> btn.addEventListener('click', function(){
      const email = this.getAttribute('data-email');
      // switch to Orders tab using Bootstrap Tab API
      const tabBtn = document.querySelector('[data-bs-target="#ordersTab"]');
      if(tabBtn && window.bootstrap && typeof window.bootstrap.Tab === 'function'){
        try{ new bootstrap.Tab(tabBtn).show(); }catch(e){}
      }
      // render orders filtered to this user
      renderOrdersAdmin(email);
    }))
  }

  // renderOrdersAdmin optionally accepts an email to filter orders for a specific user
  function renderOrdersAdmin(filterEmail){
    const ordersAll = read('orders', []);
    const container = $('#admin-orders'); container.innerHTML='';

    // build user dropdown to filter orders
    const usersMap = new Map();
    (read('users', [])).forEach(u=> usersMap.set((u.email||'').toLowerCase(), {name: u.name, email: u.email}));
    (read('loggedInUsers', [])).forEach(s=>{ const e=(s.email||'').toLowerCase(); if(!usersMap.has(e)) usersMap.set(e, {name: s.name||'', email: s.email}) });

    const filterRow = document.createElement('div'); filterRow.className = 'd-flex gap-2 align-items-center mb-3';
    const sel = document.createElement('select'); sel.className = 'form-select form-select-sm w-auto'; sel.id = 'orders-user-filter';
    const allOpt = document.createElement('option'); allOpt.value=''; allOpt.textContent = 'All Users'; sel.appendChild(allOpt);
    Array.from(usersMap.values()).forEach(u=>{ const opt = document.createElement('option'); opt.value = u.email; opt.textContent = u.name ? `${u.name} — ${u.email}` : u.email; sel.appendChild(opt); });
    filterRow.appendChild(sel);
    const clearBtn = document.createElement('button'); clearBtn.className='btn btn-sm btn-outline-secondary'; clearBtn.textContent='Clear Filter'; filterRow.appendChild(clearBtn);
    container.appendChild(filterRow);

    // handler for select change
    sel.addEventListener('change', ()=> renderOrdersAdmin(sel.value || null));
    clearBtn.addEventListener('click', ()=>{ sel.value=''; renderOrdersAdmin(null); });

    // decide which orders to show
    const orders = filterEmail ? ordersAll.filter(o=> o.user && (o.user.email||'').toLowerCase() === (filterEmail||'').toLowerCase()) : (sel.value ? ordersAll.filter(o=> o.user && (o.user.email||'').toLowerCase() === (sel.value||'').toLowerCase()) : ordersAll);

    if(orders.length===0){ const p = document.createElement('p'); p.className='text-muted'; p.textContent = 'No orders match the filter.'; container.appendChild(p); return }

    orders.slice().reverse().forEach(o=>{
      const div = document.createElement('div'); div.className='card p-3 mb-3';
      let extraInfo = '';
      if (o.orderType === 'table' && o.tableNumber) {
        extraInfo = `<div class='text-muted small'>Table: ${o.tableNumber}</div>`;
      } else if (o.orderType === 'delivery' && o.deliveryAddress) {
        extraInfo = `<div class='text-muted small'>Delivery: ${o.deliveryAddress}</div>`;
      }
      div.innerHTML = `<div><strong>Order #${o.id}</strong> <div class="text-muted small">${o.user? o.user.name + ' ('+o.user.email+')' : (o.table? 'Table '+o.table : 'Guest')} • ${o.created? new Date(o.created).toLocaleString() : ''}</div>${extraInfo}<div class="text-muted small">${o.items.map(i=>`${i.qty}x ${i.name}`).join(', ')}</div><div class="mt-2">Total: $${(Number(o.total)||0).toFixed(2)}</div><div class="mt-2">Status: <select class="form-select form-select-sm" data-id="${o.id}"><option>pending</option><option>preparing</option><option>served</option><option>delivered</option><option>paid</option><option>completed</option></select></div><div class="mt-2"><button class="btn btn-sm btn-primary update-status" data-id="${o.id}">Update</button></div></div>`;
      container.appendChild(div);
      const sel2 = div.querySelector('select'); sel2.value = o.status || 'pending';
      div.querySelector('.update-status').addEventListener('click', ()=>{
        const btn = div.querySelector('.update-status'); btn.disabled = true; btn.textContent = 'Updating...';
        const orders = read('orders', []); const ord = orders.find(x=>x.id===o.id); if(!ord){ adminToast('Order not found', 'danger'); btn.disabled = false; btn.textContent = 'Update'; return }
        ord.status = sel2.value; if(sel2.value === 'paid' || sel2.value === 'completed' || sel2.value === 'delivered') ord.paid = true;
        write('orders', orders); adminToast('Order updated', 'success'); renderOrdersAdmin(filterEmail); renderOverview();
      })
    })
    // if render was triggered by a direct filterEmail call, reflect that in the select
    if(filterEmail){ const selectBox = document.getElementById('orders-user-filter'); if(selectBox){ selectBox.value = filterEmail; } }
  }

  checkSession();

})();
