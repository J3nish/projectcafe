
# CaféDeluxe — Local Static Demo

This is a Bootstrap-based static cafe/restaurant demo built with plain HTML/CSS/JavaScript (no build tools required).

Features
- Responsive Bootstrap layout with hero, features, and menu cards
- Menu listing (editable from Admin)
- Cart / Orders using `localStorage`
- Checkout -> creates an order and simulated Payment
- Admin panel with login (default `admin`/`password`) to add/edit/delete menu items and update orders
- Session management using `sessionStorage` for admin and current order

How to run
1. Open `d:/Downloads/latestproject/index.html` in your browser.
2. Use the header navigation to view the menu, cart, and payment.
3. Visit `d:/Downloads/latestproject/admin.html` to manage menu items and orders. Default admin credentials: `admin` / `password`.

Notes
- All data (menu, orders, cart) is stored in your browser's `localStorage`.
- To change admin password: open DevTools -> Application -> Local Storage -> edit the `admin` key (JSON: `{ "username": "admin","password": "newpass" }`).
- This is a local demo: for production use a backend and secure authentication.

Assets
- Images are loaded from Unsplash placeholders. Replace them with your own images in the `menu` items (edit `localStorage` or the default menu in `js/app.js`).

