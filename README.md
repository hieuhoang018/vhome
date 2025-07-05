
# MyApp

A fullstack application built with a **Next.js (TypeScript)** frontend and an **Express.js (TypeScript)** backend for managing an E-Commerce furniture store.

---

## 📑 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Documentation](#api-documentation)
- [Contact](#contact)

---

## 🚀 Features

- User authentication
- RESTful API with JWT
- Responsive UI
- Type-safe with TypeScript
- Database integration (e.g. PostgreSQL / MongoDB)
- [Add more features here]

---

## 🖼️ Screenshots

*(Add screenshots or GIFs here to showcase your app)*

---

## 🛠 Tech Stack

- **Frontend:** Next.js (TypeScript)
- **Backend:** Express.js (TypeScript)
- **Database:** MongoDB 
- **Other tools:** Tailwind CSS, JSON Web Token, Stripe API, NodeMailer, Axios

---

## ⚙️ Installation

### Prerequisites

- Node.js >= 18
- npm / pnpm / yarn

### Clone the repository

```bash
git clone https://github.com/hieuhoang018/vhome.git
```

### Install dependencies

```bash
# install frontend
cd frontend
npm install

# install backend
cd ../backend
npm install
```

---

## 🔑 Environment Variables

Create `.env` files in both `frontend/` and `backend/`:

### `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

### `backend/.env`
```env
DATABASE = mongodb_database_url  
NODE_ENV=development (or production)
PORT=8080

JWT_SECRET=your_jwt_secret_string_here
JWT_COOKIE_EXPIRES_IN=90

// Your email service options here
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_HOST=
EMAIL_PORT=

STRIPE_SECRET_KEY=your_stripe_secret_key_here

FRONTEND_URL=http://localhost:3000

```
---

## ▶️ Running the App

### Development

```bash
# start backend
cd backend
npm run dev

# start frontend
cd frontend
npm run dev
```

### Production

```bash
# build backend
cd backend
npm run build

# build and start frontend
cd frontend
npm run build
npm start
```

---

## 📚 API Documentation

### Auth Routes

```
POST /api/auth/login
POST /api/auth/register
```

### User Routes

```
GET /api/users
```

*(expand with more details or link to Swagger/Postman)*

---

## ☁️ Deployment

### Frontend (Next.js)

- Recommended: [Vercel](https://vercel.com)
- Build command: `npm run build`
- Output directory: `.next`

### Backend (Express.js)

- Can deploy to:
  - Render
  - Railway
  - Heroku
  - AWS / GCP
- Environment:
  - Node.js >= 18
  - `npm run build`
  - `node dist/index.js`

---

## 📬 Contact

- **Author:** Hoang Vu Hieu
- **Email:** hoangvuhieu1802@gmail.com
- **GitHub:** [@hieuhoang018](https://github.com/hieuhoang018)


