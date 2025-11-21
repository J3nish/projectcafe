// table.js - dine-in table ordering (creates orders assigned to a table number)
(function(){
  const $ = (s)=> document.querySelector(s);
  const $all = (s)=> Array.from(document.querySelectorAll(s));
  function read(key, fallback){try{const r=localStorage.getItem(key); return r?JSON.parse(r):fallback}catch(e){return fallback}}
  function write(key,val){localStorage.setItem(key,JSON.stringify(val))}

  // populate table select (1..20)
  const sel = $('#table-select');
  for(let i=1;i<=20;i++){ const opt = document.createElement('option'); opt.value = String(i); opt.textContent = `Table ${i}`; sel.appendChild(opt) }

  // render menu cards (reuse menu from localStorage or default menu via app's menu if missing)
  function getMenu(){ return read('menu', []) }

  function formatINR(value){ if(value==null) return '₹0'; return '₹'+Math.round(Number(value)) }

  function renderMenu(){ const menu = getMenu(); const container = $('#menu-list'); container.innerHTML=''; menu.forEach(item=>{
    const col = document.createElement('div'); col.className = 'col-sm-6 col-md-4';
    const imgSrc = item.img && item.img.length ? item.img : 'https://via.placeholder.com/800x600?text=No+Image';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${imgSrc}" class="card-img-top" alt="${item.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/800x600?text=No+Image'">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.name} <span class="text-muted small">${formatINR(item.price)}</span></h5>
          <p class="card-text text-muted small">${item.desc||''}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div class="btn-group btn-group-sm" role="group" aria-label="qty">
              <button class="btn btn-outline-secondary btn-decr" data-id="${item.id}">-</button>
              <button class="btn btn-light btn-qty" disabled data-id="${item.id}">0</button>
              <button class="btn btn-outline-secondary btn-incr" data-id="${item.id}">+</button>
            </div>
            <button class="btn btn-brown btn-sm" data-action="add" data-id="${item.id}"><i class="bi bi-cart-plus"></i> Add</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  })}

  // local in-memory cart for current table session
  // Persist session cart per table in localStorage
  function getCurrentTable() {
    return Number(sessionStorage.getItem('currentTable') || localStorage.getItem('currentTable') || 0);
  }
  function setCurrentTable(t) {
    sessionStorage.setItem('currentTable', String(t));
    localStorage.setItem('currentTable', String(t));
  }
  function getSessionCart() {
    const t = getCurrentTable();
    if (!t) return {};
    return JSON.parse(localStorage.getItem('tableCart_' + t) || '{}');
  }
  function setSessionCart(cart) {
    const t = getCurrentTable();
    if (!t) return;
    localStorage.setItem('tableCart_' + t, JSON.stringify(cart));
  }
  let sessionCart = getSessionCart();
  function updateQtyButtons(){ $all('.btn-qty').forEach(b=>{ const id = Number(b.getAttribute('data-id')); b.textContent = sessionCart[id]||0 }) }

  function addItemToSession(id){ id = Number(id); sessionCart[id] = (sessionCart[id]||0) + 1; setSessionCart(sessionCart); updateQtyButtons(); renderCart(); }
  function decrItemInSession(id){ id = Number(id); if(!sessionCart[id]) return; sessionCart[id] = Math.max(0, sessionCart[id]-1); if(sessionCart[id]===0) delete sessionCart[id]; setSessionCart(sessionCart); updateQtyButtons(); renderCart(); }

  function renderCart(){ const list = $('#cart-list'); list.innerHTML=''; const menu = getMenu(); const items = Object.keys(sessionCart).map(k=>{ const it = menu.find(m=>m.id===Number(k)); return { id: Number(k), name: it? it.name : 'Item', price: it? it.price:0, qty: sessionCart[k] } });
    if(items.length===0){ list.innerHTML = '<p class="text-muted">Cart empty.</p>'; return }
    items.forEach(i=>{ const div = document.createElement('div'); div.className='d-flex align-items-center justify-content-between my-1'; div.innerHTML = `<div>${i.qty}x ${i.name}</div><div>${formatINR(i.price * i.qty)}</div>`; list.appendChild(div) });
    const total = items.reduce((s,i)=> s + (i.price * i.qty),0);
    const totDiv = document.createElement('div'); totDiv.className='mt-2'; totDiv.innerHTML = `<strong>Total: ${formatINR(total)}</strong>`; list.appendChild(totDiv);
  }

  // menu event delegation
  document.addEventListener('click', function(e){ const actionBtn = e.target.closest('[data-action]'); if(actionBtn){ addItemToSession(actionBtn.getAttribute('data-id')); return }
    const inc = e.target.closest('.btn-incr'); if(inc){ addItemToSession(inc.getAttribute('data-id')); return }
    const decr = e.target.closest('.btn-decr'); if(decr){ decrItemInSession(decr.getAttribute('data-id')); return }
  })

  // start/clear session
  $('#start-session').addEventListener('click', function(){
    const t = Number(sel.value||0); if(!t){ alert('Select a table'); return }
    setCurrentTable(t);
    sessionCart = getSessionCart();
    updateQtyButtons();
    renderCart();
    alert(`Table ${t} session started`);
  })
  $('#clear-table').addEventListener('click', function(){
    if(!confirm('Clear current cart and session?')) return;
    const t = getCurrentTable();
    sessionCart = {};
    if(t) localStorage.removeItem('tableCart_' + t);
    sessionStorage.removeItem('currentTable');
    localStorage.removeItem('currentTable');
    updateQtyButtons();
    renderCart();
  })

  // submit order: write to localStorage orders array with table number and items
  $('#submit-order').addEventListener('click', function(){
    const table = getCurrentTable();
    if(!table){ alert('Start a table session first'); return }
    const menu = getMenu();
    const items = Object.keys(sessionCart).map(k=>{ const m = menu.find(x=>x.id===Number(k)); return { id: Number(k), name: m?m.name:'Item', price: m?m.price:0, qty: sessionCart[k] } });
    if(items.length===0){ alert('Cart empty'); return }
    const user = JSON.parse(localStorage.getItem('tableUser_'+table)||'null');
    const orders = read('orders', []) || [];
    const order = { id: Date.now(), table: table, items: items, total: items.reduce((s,i)=> s + i.price*i.qty,0), created: Date.now(), paid: false, preparing: false, status: 'pending', user: user };
    orders.push(order); write('orders', orders);
    // clear session cart
    sessionCart = {}; setSessionCart(sessionCart); updateQtyButtons(); renderCart(); alert('Order submitted to kitchen');
  })

  // render init
  try{ $('#year').textContent = new Date().getFullYear(); }catch(e){}
  // On load, restore table session if present
  const t = getCurrentTable();
  if(t) {
    sel.value = String(t);
    sessionCart = getSessionCart();
    updateQtyButtons();
    renderCart();
  }
  renderMenu();
  renderCart();
})();
