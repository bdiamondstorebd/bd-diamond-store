# BD Diamond Store — Demo Prototype

A mobile-friendly, black-and-gold Free Fire top-up storefront prototype.

## Included
- Responsive homepage and diamond package cards
- Player ID and server form
- bKash/Nagad selection (visual/demo only)
- Demo order IDs and local-browser order status lookup
- Clear warning that no real payment or diamond delivery is connected

## Run on Android
1. Download and extract `bd-diamond-store.zip`.
2. Open `index.html` in a browser to preview. For editing, use a code editor app that can open HTML/CSS/JS files.
3. To publish free with GitHub Pages:
   - Sign in at https://github.com
   - Create a **public** repository named `bd-diamond-store`
   - Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root
   - Open **Settings → Pages**
   - Under **Build and deployment**, choose **Deploy from a branch**
   - Select branch `main` and folder `/ (root)`, then save
   - Wait for deployment. The URL will be `https://YOUR-USERNAME.github.io/bd-diamond-store/`

## Before taking real orders
This is a prototype, not a live store. It does not take payments, verify payments, contact a top-up supplier, or deliver diamonds. Demo orders are stored only in the same browser using localStorage and can be lost when browser data is cleared.

For production you need:
- An authorized business payment integration for bKash/Nagad, with server-side payment verification
- A secure backend and database
- A reliable, authorized top-up provider API that supports the Bangladesh server
- Server-side secrets; never place API keys in frontend files
- Order logging, duplicate-payment/idempotency handling, refunds/support, and privacy terms

GitHub Pages only serves static files; it cannot run the secure backend needed for real payment verification and automatic delivery. Package prices in this demo are sample values and must be verified before use.
