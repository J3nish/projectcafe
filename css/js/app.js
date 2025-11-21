// app.js - handles public UI, menu, cart, checkout, payment
(function(){
  const defaultMenu = [
    {id:1,name:'Cappuccino',price:3.5,desc:'Espresso with steamed milk foam',img:'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',category:'Coffee'},
    {id:2,name:'Latte',price:4.0,desc:'Smooth milk with espresso',img:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',category:'Coffee'},
    {id:3,name:'Espresso',price:2.5,desc:'Strong and bold',img:'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',category:'Coffee'},
    {id:4,name:'Iced Americano',price:3.0,desc:'Chilled espresso over ice',img:'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?q=80&w=800&auto=format&fit=crop',category:'Cold Beverages'},
    {id:5,name:'Iced Latte',price:4.2,desc:'Cold milk and espresso',img:'https://images.unsplash.com/photo-1524594154909-2f8f4d8c90f3?q=80&w=800&auto=format&fit=crop',category:'Cold Beverages'},
    {id:6,name:'Blueberry Muffin',price:2.9,desc:'Fresh baked daily',img:'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',category:'Bakery'},
    {id:7,name:'Chocolate Croissant',price:3.1,desc:'Buttery and flaky',img:'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=800&auto=format&fit=crop',category:'Bakery'},
    {id:8,name:'Club Sandwich',price:6.5,desc:'Turkey, lettuce, tomato',img:'https://images.unsplash.com/photo-1543352634-7f4b039a53df?q=80&w=800&auto=format&fit=crop',category:'Sandwiches'},
    {id:9,name:'Veggie Panini',price:5.5,desc:'Grilled veggies and cheese',img:'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=800&auto=format&fit=crop',category:'Sandwiches'},
    {id:10,name:'Masala Dosa',price:4.5,desc:'Crispy rice crepe with spiced potatoes',img:'https://images.unsplash.com/photo-1604908177522-9f16b0b5e8e9?q=80&w=800&auto=format&fit=crop',category:'Indian'},
    {id:11,name:'Paneer Wrap',price:5.0,desc:'Indian spiced paneer wrap',img:'https://images.unsplash.com/photo-1597309361111-8b6a0b1a9f44?q=80&w=800&auto=format&fit=crop',category:'Indian'},
    {id:12,name:'Margherita Pizza',price:8.5,desc:'Classic tomato, basil & mozzarella',img:'https://images.unsplash.com/photo-1548365328-5d64b6b0d7d6?q=80&w=800&auto=format&fit=crop',category:'Pizza'},
    {id:13,name:'Pepperoni Pizza',price:9.5,desc:'Pepperoni and cheese',img:'https://images.unsplash.com/photo-1601924582975-4b5d1a3b9eae?q=80&w=800&auto=format&fit=crop',category:'Pizza'},
    {id:14,name:'Cold Brew',price:3.8,desc:'Slow brewed cold coffee',img:'https://images.unsplash.com/photo-1517705008127-3616d0d2d2a4?q=80&w=800&auto=format&fit=crop',category:'Cold Beverages'},
    {id:15,name:'Strawberry Smoothie',price:4.5,desc:'Fresh strawberry smoothie',img:'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop',category:'Cold Beverages'},
    {id:16,name:'Greek Salad',price:5.0,desc:'Feta, olives, fresh greens',img:'https://images.unsplash.com/photo-1568051243858-0a9a3b9d8f11?q=80&w=800&auto=format&fit=crop',category:'Salads'},
    {id:17,name:'Chicken Biryani',price:7.5,desc:'Fragrant rice with spiced chicken',img:'https://images.unsplash.com/photo-1603076113493-7f2c6a7d7c2a?q=80&w=800&auto=format&fit=crop',category:'Indian'},
    {id:18,name:'Cheesecake',price:4.0,desc:'Classic creamy cheesecake',img:'https://images.unsplash.com/photo-1541976076758-5d0b6c7e2a8e?q=80&w=800&auto=format&fit=crop',category:'Dessert'},
    {id:19,name:'French Fries',price:2.5,desc:'Crispy salted fries',img:'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop',category:'Sides'},
    {id:20,name:'Chicken Burger',price:6.9,desc:'Grilled chicken burger with lettuce',img:'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',category:'Burgers'},
    {id:21,name:'Veggie Burger',price:6.5,desc:'House-made veggie patty with greens',img:'https://images.unsplash.com/photo-1606755962770-6b89f2a4a9a6?q=80&w=800&auto=format&fit=crop',category:'Burgers'},
    {id:22,name:'BBQ Chicken Wings',price:7.0,desc:'Sticky BBQ wings',img:'https://images.unsplash.com/photo-1604908177522-9f16b0b5e8e9?q=80&w=800&auto=format&fit=crop',category:'Sides'},
    {id:23,name:'Tiramisu',price:4.5,desc:'Classic Italian dessert',img:'https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=800&auto=format&fit=crop',category:'Dessert'},
    {id:24,name:'Pumpkin Soup',price:4.0,desc:'Creamy pumpkin soup with croutons',img:'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=800&auto=format&fit=crop',category:'Soups'},
    {id:25,name:'Garlic Bread',price:2.5,desc:'Buttery garlic baguette',img:'https://images.unsplash.com/photo-1547592180-3a2b9b8e7d9e?q=80&w=800&auto=format&fit=crop',category:'Sides'},
    {id:26,name:'Pesto Pasta',price:7.5,desc:'Penne with fresh basil pesto',img:'https://images.unsplash.com/photo-1521389508051-d7ffb5dc8e5d?q=80&w=800&auto=format&fit=crop',category:'Pasta'},
    {id:27,name:'Mango Lassi',price:3.5,desc:'Refreshing mango yogurt drink',img:'https://images.unsplash.com/photo-1589307000328-2c1b1a6a3a9f?q=80&w=800&auto=format&fit=crop',category:'Cold Beverages'},
    {id:28,name:'Onion Rings',price:3.0,desc:'Crispy beer-battered onion rings',img:'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',category:'Sides'},
    {id:29,name:'Grilled Salmon',price:11.0,desc:'Herb-grilled salmon with lemon',img:'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',category:'Mains'},
    {id:30,name:'Samosa',price:1.5,desc:'Spiced potato pastry',img:'https://images.unsplash.com/photo-1597309361111-8b6a0b1a9f44?q=80&w=800&auto=format&fit=crop',category:'Snacks'},
    {id:31,name:'Lasagna',price:9.0,desc:'Baked layers of pasta, meat, and cheese',img:'https://images.unsplash.com/photo-1604908898051-3f9b1dd4b1f2?q=80&w=800&auto=format&fit=crop',category:'Italian'},
    {id:32,name:'Four Cheese Pizza',price:11.0,desc:'Mozzarella, parmesan, gorgonzola, and ricotta',img:'https://images.unsplash.com/photo-1601924582975-4b5d1a3b9eae?q=80&w=800&auto=format&fit=crop',category:'Pizza'},
    {id:33,name:'Chocolate Éclair',price:3.2,desc:'Choux pastry filled with cream and chocolate glaze',img:'https://images.unsplash.com/photo-1526312426976-3d75a2bd4a12?q=80&w=800&auto=format&fit=crop',category:'Pastry'},
    {id:34,name:'Spaghetti Carbonara',price:8.0,desc:'Creamy egg, pancetta, and pecorino Romano',img:'https://images.unsplash.com/photo-1604908177522-9f16b0b5e8e9?q=80&w=800&auto=format&fit=crop',category:'Pasta'},
    {id:35,name:'Penne Bolognese',price:8.5,desc:'Hearty meat sauce with penne pasta',img:'https://images.unsplash.com/photo-1521389508051-d7ffb5dc8e5d?q=80&w=800&auto=format&fit=crop',category:'Pasta'},
    {id:36,name:'Cold Coffee (Frappe)',price:3.5,desc:'Iced blended coffee with frothy topping',img:'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',category:'Cold Beverages'},
    {id:37,name:'Diet Coke (Can)',price:1.8,desc:'Chilled sugar-free cola',img:'https://images.unsplash.com/photo-1560847879-4a8a6e9a3f6a?q=80&w=800&auto=format&fit=crop',category:'Cold Beverages'},
    {id:38,name:'Pastry Platter',price:7.5,desc:'Assorted croissants, danish and tarts',img:'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',category:'Pastry'},
    {id:39,name:'Focaccia Bread',price:3.0,desc:'Olive oil and rosemary flatbread',img:'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop',category:'Bread'},
    {id:40,name:'Gelato (Vanilla)',price:3.5,desc:'Creamy Italian-style ice cream',img:'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=800&auto=format&fit=crop',category:'Dessert'}
  ];

  const $ = (s)=> document.querySelector(s);
  const $all = (s)=> Array.from(document.querySelectorAll(s));

  function read(key, fallback){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch(e){return fallback}}
  function write(key,val){localStorage.setItem(key,JSON.stringify(val))}

  // --- IMPORTANT: only write the default menu if no menu exists.
  // Previously the code merged missing defaults on every load which caused deleted items to reappear.
  if (!localStorage.getItem('menu')) {
    // initialize with the demo menu
    write('menu', defaultMenu);
  }
  // Else do not merge default items back in (this preserves admin deletions).

  const sections = $all('.page');
  function showSection(id){
    sections.forEach(s=> s.id===id ? s.classList.remove('hidden') : s.classList.add('hidden'));
    // update active nav
    $all('.nav-link').forEach(n=>{
      if(n.getAttribute('data-section')===id) n.classList.add('active'); else n.classList.remove('active');
    })
  }

  // attach nav triggers (both buttons and links)
  document.addEventListener('click', function(e){
    const t = e.target.closest('[data-section]'); if(!t) return;
    const sec = t.getAttribute('data-section'); if(!sec) return;
    e.preventDefault(); if(sec==='menu') renderMenu(); if(sec==='orders') renderCart(); if(sec==='payment') renderPayment(); showSection(sec);
  })

  // Render menu with category filtering and +/- quantity controls on card
  function renderMenu(category){
    const menu = read('menu', []);
    const container = $('#menu-list'); if(!container) return; container.innerHTML='';
    const filtered = category && category !== 'All' ? menu.filter(m=>m.category===category) : menu;
    // determine quantities from current unpaid order
    const user = JSON.parse(sessionStorage.getItem('user')||'null');
    const allOrders = read('orders', []);
    let currentOrder = null;
    if(user){ currentOrder = allOrders.filter(o=> !o.paid && o.user && (o.user.email||'').toLowerCase() === (user.email||'').toLowerCase()).slice(-1)[0]; }
    else { currentOrder = allOrders.filter(o=> !o.paid && !o.user).slice(-1)[0]; }
    const currentItems = currentOrder ? (currentOrder.items||[]) : [];
    filtered.forEach(item=>{
      const col = document.createElement('div'); col.className='col-sm-6 col-md-4';
      const qty = currentItems.find(c=>c.id===item.id)?.qty || 0;
      const imgSrc = item.img && item.img.length ? item.img : 'https://via.placeholder.com/800x600?text=Food+Image';
      // add onerror fallback so broken or blocked images are replaced with a placeholder
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${imgSrc}" class="card-img-top" alt="${item.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/800x600?text=No+Image'">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.name} <span class="text-muted small">${formatINR(item.price)}</span></h5>
            <p class="card-text text-muted">${item.desc||''}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <div class="btn-group btn-group-sm" role="group" aria-label="qty">
                <button class="btn btn-outline-secondary btn-decr" data-id="${item.id}">-</button>
                <button class="btn btn-light btn-qty" disabled data-id="${item.id}">${qty}</button>
                <button class="btn btn-outline-secondary btn-incr" data-id="${item.id}">+</button>
              </div>
              <button class="btn btn-brown btn-sm" data-action="add" data-id="${item.id}"><i class="bi bi-cart-plus"></i> Add</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(col);
    })
  }

  function getCart(){return read('cart', [])}
  function saveCart(c){write('cart', c)}
  function addToCart(id){
    const menu = read('menu', []); const item = menu.find(m=>m.id===Number(id)); if(!item) return;
    const user = JSON.parse(sessionStorage.getItem('user')||'null');
    const orders = read('orders', []) || [];
    const order = {
      id: Date.now(),
      items: [{ id: item.id, name: item.name, price: item.price, qty: 1 }],
      total: item.price * 1,
      created: Date.now(),
      paid: false,
      preparing: false,
      user: user ? { name: user.name, email: user.email } : null
    };
    orders.push(order);
    write('orders', orders);
    sessionStorage.setItem('currentOrderId', String(order.id));
    updateMenuQtyButtons(); updateCartBadge(); renderToast('Added to order');
    try{ renderCart(); }catch(e){ console.error(e) }
  }

  function decrementFromCart(id){
    const user = JSON.parse(sessionStorage.getItem('user')||'null');
    const orders = read('orders', []) || [];
    let candidates = [];
    if(user){ candidates = orders.filter(o=> !o.paid && o.user && (o.user.email||'').toLowerCase() === (user.email||'').toLowerCase()); }
    else { candidates = orders.filter(o=> !o.paid && !o.user); }
    let foundIdx = -1; for(let i=candidates.length-1;i>=0;i--){ const ord = candidates[i]; if((ord.items||[]).some(it=>it.id===id)){ foundIdx = orders.findIndex(o=>o.id===ord.id); break } }
    if(foundIdx === -1){ renderToast('Nothing to remove', 'warning'); return }
    const ord = orders[foundIdx];
    const itIdx = (ord.items||[]).findIndex(it=>it.id===id);
    if(itIdx === -1){ renderToast('Nothing to remove', 'warning'); return }
    if(ord.items[itIdx].qty > 1){ ord.items[itIdx].qty = Math.max(0, ord.items[itIdx].qty - 1); ord.total = ord.items.reduce((s,i)=>s + i.price*i.qty,0); orders[foundIdx] = ord; write('orders', orders); }
    else {
      orders.splice(foundIdx,1);
      write('orders', orders);
    }
    const currentId = Number(sessionStorage.getItem('currentOrderId'));
    if(currentId && !orders.find(o=>o.id===currentId)) sessionStorage.removeItem('currentOrderId');
    updateMenuQtyButtons(); updateCartBadge(); renderCart(); renderToast('Updated order');
  }

  function orderItemIncrement(orderId, itemId){
    const orders = read('orders', []) || [];
    const idx = orders.findIndex(o=> o.id === Number(orderId)); if(idx === -1) return;
    const ord = orders[idx];
    const it = (ord.items||[]).find(i=> i.id === Number(itemId));
    if(!it){ return }
    it.qty = (it.qty||0) + 1;
    ord.total = (ord.items||[]).reduce((s,i)=> s + (i.price * i.qty), 0);
    orders[idx] = ord; write('orders', orders);
    updateMenuQtyButtons(); updateCartBadge(); renderCart();
  }

  function orderItemDecrement(orderId, itemId){
    const orders = read('orders', []) || [];
    const idx = orders.findIndex(o=> o.id === Number(orderId)); if(idx === -1) return;
    const ord = orders[idx];
    const itIdx = (ord.items||[]).findIndex(i=> i.id === Number(itemId));
    if(itIdx === -1) return;
    if(ord.items[itIdx].qty > 1){ ord.items[itIdx].qty = Math.max(0, ord.items[itIdx].qty - 1); ord.total = ord.items.reduce((s,i)=> s + i.price*i.qty, 0); orders[idx] = ord; write('orders', orders); }
    else {
      ord.items.splice(itIdx,1);
      if((ord.items||[]).length === 0){ orders.splice(idx,1); }
      write('orders', orders);
    }
    const currentId = Number(sessionStorage.getItem('currentOrderId'));
    if(currentId && !orders.find(o=>o.id===currentId)) sessionStorage.removeItem('currentOrderId');
    updateMenuQtyButtons(); updateCartBadge(); renderCart();
  }

  // event delegation for menu buttons (+, -, Add)
  document.addEventListener('click', function(e){
    const actionBtn = e.target.closest('[data-action]');
    if(actionBtn){ const action = actionBtn.getAttribute('data-action'); const id = actionBtn.getAttribute('data-id'); if(action==='add') addToCart(id); return }
    const inbtn = e.target.closest('.btn-incr'); if(inbtn){ addToCart(inbtn.getAttribute('data-id')); updateMenuQtyButtons(); return }
    const decr = e.target.closest('.btn-decr'); if(decr){ decrementFromCart(Number(decr.getAttribute('data-id'))); updateMenuQtyButtons(); return }
  })

  function updateMenuQtyButtons(){
    const user = JSON.parse(sessionStorage.getItem('user')||'null');
    const orders = read('orders', []) || [];
    let unpaid = [];
    if(user){ unpaid = orders.filter(o=> !o.paid && o.user && (o.user.email||'').toLowerCase() === (user.email||'').toLowerCase()); }
    else { unpaid = orders.filter(o=> !o.paid && !o.user); }
    const qtyMap = unpaid.reduce((m,o)=>{ (o.items||[]).forEach(i=>{ m[i.id] = (m[i.id]||0) + (i.qty||0) }); return m }, {});
    $all('.btn-qty').forEach(b=>{
      const id = Number(b.getAttribute('data-id'));
      b.textContent = qtyMap[id] || 0;
    })
  }

  function updateCartBadge(){
    const el = document.getElementById('cart-count');
    const user = JSON.parse(sessionStorage.getItem('user')||'null');
    const orders = read('orders', []) || [];
    let currentOrders = [];
    if(user){ currentOrders = orders.filter(o=> o.user && (o.user.email||'').toLowerCase() === (user.email||'').toLowerCase() && !o.paid); }
    else { currentOrders = orders.filter(o=> !o.paid); }
    const totalOrders = currentOrders.length;
    if(el) el.textContent = totalOrders;
    const navUser = document.getElementById('nav-user'); if(navUser){ if(user) navUser.textContent = user.name || user.email || 'Account'; else navUser.textContent = 'Login' }
  }

  function renderCart() {
    const container = $('#cart-list'); if(!container) return;
    container.innerHTML = '';
    const orders = read('orders', []) || [];
    const user = JSON.parse(sessionStorage.getItem('user')||'null');

    // Add order type/table/delivery UI
    const orderTypeSel = document.getElementById('order-type');
    const tableNumSel = document.getElementById('table-number');
    const deliveryAddr = document.getElementById('delivery-address');
    // ...existing code...

    const currentHeader = document.createElement('h5');
    currentHeader.textContent = 'Current Orders';
    container.appendChild(currentHeader);
    let currentOrders = [];
    if(user){
      currentOrders = orders.filter(o=> o.user && (o.user.email||'').toLowerCase() === (user.email||'').toLowerCase() && !o.paid);
    } else {
      currentOrders = orders.filter(o=> !o.paid);
    }
    if(currentOrders.length === 0){
      const p = document.createElement('p');
      p.className = 'text-muted';
      p.textContent = 'No current orders.';
      container.appendChild(p);
    } else {
      currentOrders.slice().reverse().forEach(o=>{
        const div = document.createElement('div');
        div.className = 'p-3 mb-2 bg-white rounded shadow-sm';
        let status = o.preparing ? 'Preparing' : 'Pending';
        let statusIcon = o.preparing ? '<span title="Preparing" style="color:#3498db;">&#x1F373;</span>' : '<span title="Pending" style="color:#e67e22;">&#x23F3;</span>';
        const itemsHtml = (o.items||[]).map(i=>{
          return `<div class="d-flex align-items-center justify-content-between my-1">
                    <div class="small">${i.name}</div>
                    <div class="btn-group btn-group-sm" role="group" aria-label="order-item-${i.id}">
                      <button class="btn btn-outline-secondary order-item-dec" data-order="${o.id}" data-id="${i.id}">-</button>
                      <button class="btn btn-light btn-qty" disabled>${i.qty}</button>
                      <button class="btn btn-outline-secondary order-item-inc" data-order="${o.id}" data-id="${i.id}">+</button>
                    </div>
                  </div>`;
        }).join('');
        // Order type and address fields inside the card
        let orderType = o.orderType || 'table';
        let tableNumber = o.tableNumber || '';
        let deliveryAddress = o.deliveryAddress || '';
        const orderTypeId = `order-type-${o.id}`;
        const tableNumId = `table-number-${o.id}`;
        const deliveryAddrId = `delivery-address-${o.id}`;
        let orderTypeFields = `
          <div class="mb-2">
            <label class="form-label">Order Type</label>
            <div class="d-flex gap-3 align-items-center mb-2 flex-wrap">
              <select id="${orderTypeId}" class="form-select w-auto" style="min-width:140px;">
                <option value="table"${orderType==='table'?' selected':''}>Dine-in (Table)</option>
                <option value="delivery"${orderType==='delivery'?' selected':''}>Deliver to you</option>
              </select>
              <select id="${tableNumId}" class="form-select w-auto" style="min-width:120px;${orderType==='table'?'':'display:none;'}">
                <option value="">Select Table</option>
                ${Array.from({length:20},(_,i)=>`<option value=\"${i+1}\"${tableNumber==i+1?' selected':''}>Table ${i+1}</option>`).join('')}
              </select>
              <div class="d-flex align-items-center" style="${orderType==='delivery'?'':'display:none;'}">
                <textarea id="${deliveryAddrId}" class="form-control" rows="3" style="min-width:220px;max-width:340px;resize:vertical;" placeholder="Select address from map above" readonly>${deliveryAddress||''}</textarea>
                <button type="button" class="btn btn-outline-primary ms-2" id="mapBtn-${o.id}">Select from map</button>
              </div>
            </div>
          </div>
        `;
        // Show table or delivery info summary
        let extraInfo = '';
        if (orderType === 'table' && tableNumber) {
          extraInfo = `<div class='text-muted small'>Table: ${tableNumber}</div>`;
        } else if (orderType === 'delivery' && deliveryAddress) {
          extraInfo = `<div class='text-muted small'>Delivery: ${deliveryAddress}</div>`;
        }
        div.innerHTML = `<div><strong>Order #${o.id}</strong> • ${o.created ? new Date(o.created).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'}) : ''} ${statusIcon} <span class="ms-2">${status}</span>${orderTypeFields}${extraInfo}<div class="text-muted small mt-2">${itemsHtml}</div><div class='mt-2'><strong>Total: ${formatINR(o.total)}</strong></div></div>`;
        // Wire up order type fields
        setTimeout(()=>{
          const typeSel = document.getElementById(orderTypeId);
          const tableSel = document.getElementById(tableNumId);
          const addrBox = document.getElementById(deliveryAddrId);
          const mapBtn = document.getElementById(`mapBtn-${o.id}`);
          if(typeSel && tableSel && addrBox) {
            typeSel.onchange = function() {
              if(typeSel.value==='table') {
                tableSel.style.display='';
                if(addrBox.parentElement) addrBox.parentElement.style.display='none';
                o.orderType = 'table';
                o.tableNumber = tableSel.value;
                o.deliveryAddress = '';
              } else {
                tableSel.style.display='none';
                if(addrBox.parentElement) addrBox.parentElement.style.display='';
                o.orderType = 'delivery';
                o.tableNumber = '';
                o.deliveryAddress = addrBox.value;
              }
              write('orders', orders);
              renderCart();
            };
            tableSel.onchange = function() {
              o.tableNumber = tableSel.value;
              write('orders', orders);
              renderCart();
            };
            // addrBox is readonly, value set by map
          }
          if(mapBtn && addrBox) {
            mapBtn.onclick = function() {
              window._mapOrderId = o.id;
              showMapModal(addrBox.value, addrBox);
            };
          }
        }, 0);
        // Map modal logic for address selection (Google Maps embed)
        function showMapModal(currentAddress, cartAddrBox) {
          const mapModalEl = document.getElementById('mapModal');
          const mapModal = new bootstrap.Modal(mapModalEl);
          document.getElementById('confirmMapAddress').onclick = function() {
            if (window._mapOrderId != null) {
              const orders = read('orders') || [];
              const order = orders.find(x=>x.id==window._mapOrderId);
              if (order) {
                order.deliveryAddress = 'Selected address';
                write('orders', orders);
                renderCart();
              }
              if (cartAddrBox) cartAddrBox.value = 'Selected address';
            }
            mapModal.hide();
          };
          mapModal.show();
        }
        // ...existing code for buttons...
        const clearBtn = document.createElement('button');
        clearBtn.className = 'btn btn-danger mt-2 me-2';
        clearBtn.textContent = 'Remove Order';
        clearBtn.onclick = function(){
          const updatedOrders = orders.filter(ord => ord.id !== o.id);
          write('orders', updatedOrders);
          renderCart();
          updateCartBadge();
          renderToast('Order removed');
        };
        div.appendChild(clearBtn);
        const payBtn = document.createElement('button');
        payBtn.className = 'btn btn-primary mt-2';
        payBtn.textContent = 'Pay';
        payBtn.onclick = function(){
          // Save order type info before payment
          o.orderType = document.getElementById(orderTypeId)?.value || 'table';
          o.tableNumber = document.getElementById(tableNumId)?.value || '';
          o.deliveryAddress = document.getElementById(deliveryAddrId)?.value || '';
          write('orders', orders);
          sessionStorage.setItem('currentOrderId', String(o.id));
          renderPayment();
          showSection('payment');
        };
        div.appendChild(payBtn);
        container.appendChild(div);
      });
    }

    renderPastOrders();
  }

  function renderPastOrders(){
    const orders = read('orders', []) || [];
    const container = document.getElementById('past-orders'); if(!container) return; container.innerHTML='';
    const user = JSON.parse(sessionStorage.getItem('user')||'null');
    let list = user ? orders.filter(o=> o.paid && o.user && (o.user.email||'').toLowerCase() === (user.email||'').toLowerCase()) : orders.filter(o=> o.paid);
    list = list.sort((a,b)=> (b.created || b.id) - (a.created || a.id));

    container.innerHTML = `
      <div class="mb-2 d-flex">
        <input id="past-order-search" class="form-control me-2" placeholder="Search by Order ID, user name or item name" />
        <button id="past-order-search-btn" class="btn btn-primary">Search</button>
      </div>
      <div id="past-results"></div>
    `;

    const results = document.getElementById('past-results');
    const search = document.getElementById('past-order-search');

    function renderResults(query){
      const q = (query||'').trim().toLowerCase();
      const filtered = list.filter(o=>{
        if(!q) return true;
        if(!isNaN(Number(q)) && String(o.id).includes(q)) return true;
        if(o.user && ((o.user.name||'').toLowerCase().includes(q) || (o.user.email||'').toLowerCase().includes(q))) return true;
        if((o.items||[]).some(i=> (i.name||'').toLowerCase().includes(q))) return true;
        return false;
      });
      results.innerHTML = '';
      if(!filtered || filtered.length === 0){ results.innerHTML = '<p class="text-muted">No past orders.</p>'; return }
      filtered.forEach(o=>{
        const div = document.createElement('div'); div.className = 'p-3 mb-2 bg-white rounded shadow-sm';
        const userText = o.user ? `${o.user.name} (${o.user.email})` : 'Guest';
        div.innerHTML = `<div><strong>Order #${o.id}</strong> • ${new Date(o.created).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})} <div class="text-muted small">${userText} • ${o.status || ''} • ${o.paid? 'Paid':''}</div><div class="mt-2">${(o.items||[]).map(i=>i.qty+'x '+i.name).join(', ')}</div><div class="mt-2"><strong>Total: ${formatINR(o.total)}</strong></div></div>`;
        results.appendChild(div);
      })
    }

    const searchBtn = document.getElementById('past-order-search-btn');
    searchBtn.addEventListener('click', function(){ renderResults(search.value); });
    search.addEventListener('keypress', function(e){ if(e.key === 'Enter' || e.keyCode === 13){ e.preventDefault(); renderResults(this.value); } });
    renderResults('');
  }

  document.addEventListener('click', function(e){
    const btn = e.target.closest('[data-op]'); if(btn){ const id = Number(btn.getAttribute('data-id')); const op = btn.getAttribute('data-op'); if(op === 'inc') { addToCart(id); } else if(op === 'dec') { decrementFromCart(id); } return }
    const incBtn = e.target.closest('.order-item-inc'); if(incBtn){ const oid = incBtn.getAttribute('data-order'); const iid = incBtn.getAttribute('data-id'); orderItemIncrement(oid, iid); return }
    const decBtn = e.target.closest('.order-item-dec'); if(decBtn){ const oid = decBtn.getAttribute('data-order'); const iid = decBtn.getAttribute('data-id'); orderItemDecrement(oid, iid); return }
  })

  function renderPayment(){
    const id = Number(sessionStorage.getItem('currentOrderId'));
    const orders = read('orders', []) || []; const order = orders.find(o=>o.id===id);
    const sum = $('#order-summary'); const form = $('#payment-form');
    if(!order){ if(sum) sum.innerHTML = '<p class="text-muted">No pending order. Use the cart to create an order.</p>'; if(form) form.style.display='none'; return }
    if(sum) sum.innerHTML = `<div class="card p-3"><h5>Order #${order.id}</h5>${order.items.map(i=>`<div>${i.qty}x ${i.name} — ${formatINR(i.price*i.qty)}</div>`).join('')}<h6 class="mt-2">Total: ${formatINR(order.total)}</h6></div>`;
    if(form) form.style.display='block';
    const cardFields = document.getElementById('card-fields'); const upiFields = document.getElementById('upi-fields'); const cashNote = document.getElementById('cash-note');
    const setVisibility = ()=>{
      const m = (document.querySelector('input[name="method"]:checked')||{}).value || 'card';
      if(cardFields) cardFields.style.display = m === 'card' ? 'block' : 'none';
      if(upiFields) upiFields.style.display = m === 'upi' ? 'block' : 'none';
      if(cashNote) cashNote.style.display = m === 'cash' ? 'block' : 'none';
    }
    $all('input[name="method"]').forEach(r=> r.addEventListener('change', setVisibility));
    setVisibility();
  }

  const paymentForm = document.getElementById('payment-form');
  if(paymentForm){
    paymentForm.addEventListener('submit', function(e){
      e.preventDefault();
      const method = (this.method.value || 'card');
      const orders = read('orders', []) || [];
      const id = Number(sessionStorage.getItem('currentOrderId')); const order = orders.find(o=>o.id===id);
      if(!order){ renderToast('No order to pay for', 'warning'); return }
      if(method === 'upi'){
        const upi = (this.upi && this.upi.value || '').trim(); if(!upi || !/^[\w.-]+@[\w.-]+$/.test(upi)){ renderToast('Enter a valid UPI ID', 'warning'); return }
      } else if(method === 'cash'){
        // no validation required for demo
      }
      order.paid = true;
      order.status = 'paid';
      order.paymentMethod = method;
      write('orders', orders);
      sessionStorage.removeItem('currentOrderId'); updateCartBadge(); renderCart(); renderToast('Payment recorded'); location.href = "index.html";
    })
  }

  function renderToast(msg, type='success'){
    const wrapper = document.createElement('div'); wrapper.className = `toast-container position-fixed bottom-0 end-0 p-3`;
    wrapper.innerHTML = `<div class="toast show align-items-center text-bg-${type==='warning'?'warning':'success'} border-0" role="alert"><div class="d-flex"><div class="toast-body">${msg}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div>`;
    document.body.appendChild(wrapper);
    setTimeout(()=> wrapper.remove(), 2600);
  }

  function formatINR(value) {
    if (value == null) return '₹0';
    return '₹' + Math.round(Number(value));
  }

  function randomINRPrice() {
    return Math.floor(Math.random() * 901) + 100;
  }

  // initial UI
  try{ $('#year').textContent = new Date().getFullYear(); }catch(e){}
  showSection('home');
  document.addEventListener('DOMContentLoaded', ()=>{
    if(location.hash) showSection(location.hash.replace('#',''));
    const menu = read('menu', []);
    const cats = Array.from(new Set(menu.map(m=>m.category).filter(Boolean)));
    const sel = document.getElementById('category-filter');
    if(sel){ sel.innerHTML = '<option>All</option>' + cats.map(c=>`<option>${c}</option>`).join(''); sel.addEventListener('change', ()=> renderMenu(sel.value)); }
    const orderNow = document.getElementById('order-now'); if(orderNow){ orderNow.addEventListener('click', ()=>{ showSection('menu'); renderMenu('All'); try{ window.scrollTo({top: document.getElementById('menu').offsetTop - 60, behavior:'smooth'}); }catch(e){} }); }
    renderMenu('All');
    updateMenuQtyButtons();
    updateCartBadge();
    const navLogout = document.getElementById('nav-logout');
    const navMyProfile = document.getElementById('nav-myprofile');
    const navUserEl = document.getElementById('nav-user');
    if(navLogout){ navLogout.addEventListener('click', function(e){ e.preventDefault(); sessionStorage.removeItem('user'); renderToast('Logged out'); updateCartBadge(); window.location.href = 'login.html'; }); }
    if(navMyProfile){ navMyProfile.addEventListener('click', function(e){ e.preventDefault(); const user = JSON.parse(sessionStorage.getItem('user')||'null'); if(!user){ window.location.href = 'login.html'; return } const nameFld = document.getElementById('profile-name'); const emailFld = document.getElementById('profile-email'); if(nameFld) nameFld.value = user.name || ''; if(emailFld) emailFld.value = user.email || ''; renderMenu(); renderCart(); showSection('profile'); }); }
    const profileForm = document.getElementById('profile-form'); if(profileForm){ profileForm.addEventListener('submit', function(e){ e.preventDefault(); const name = (document.getElementById('profile-name')||{}).value || ''; const user = JSON.parse(sessionStorage.getItem('user')||'null'); if(!user){ renderToast('Please login first', 'warning'); window.location.href = 'login.html'; return } user.name = name; sessionStorage.setItem('user', JSON.stringify(user)); if(navUserEl) navUserEl.textContent = user.name || user.email || 'Account'; renderToast('Profile updated'); updateCartBadge(); }); }
    const profileCancel = document.getElementById('profile-cancel'); if(profileCancel){ profileCancel.addEventListener('click', function(){ showSection('home'); }); }
  });

})();
