# Food Delivery

A full-stack food delivery application with separate `client`, `admin`, and `server` folders.

**Contents:**
- **server**: Express backend and API (MongoDB + Mongoose)
- **client**: React/Vite user-facing application
- **admin**: React/Vite admin dashboard

**Prerequisites:**
- Node.js (16+ recommended)
- npm or yarn
- MongoDB (local or hosted) and a connection string

Getting started
1. Clone the repository:

	 git clone <repo-url>
	 cd Food\ Delivery

2. Configure environment variables for the server (create `server/.env`). Common vars:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — JSON Web Token secret
- `STRIPE_KEY` — Stripe API key (if payments used)

Install & run

- Server

	cd server
	npm install
	npm start

	The server's start script runs `node server.js` (see `server/package.json`).

- Client (user app)

	cd client
	npm install
	npm run dev

	Available scripts in `client/package.json`:
	- `dev`: start Vite dev server
	- `build`: build for production
	- `preview`: preview built app

- Admin (dashboard)

	cd admin
	npm install
	npm run dev

	`admin/package.json` provides the same Vite scripts as the client.

Project structure (top-level)

- `server/` — backend API and controllers
- `client/` — React user-facing app
- `admin/` — React admin dashboard

Notes
- The backend depends on `mongodb`/`mongoose`. Ensure `MONGO_URI` points to a running MongoDB instance.
- For development you can use tools like `nodemon` (not included by default) if desired.

Contributing
- Open an issue or submit a pull request. Keep changes focused and include notes to reproduce.

License
- MIT
