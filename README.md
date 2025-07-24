# SecureSight CCTV Dashboard

A full-stack web dashboard for monitoring and managing real-time CCTV incidents. Built with **Next.js 15 App Router**, **Prisma**, **PostgreSQL (via Neon)**, and modern UI using **Tailwind CSS**.

---

## 🚀 Features

* 🔍 View unresolved and resolved incidents
* ✅ Mark incidents as resolved
* 📷 Each incident linked to a specific camera and location
* 🧭 Fully responsive dashboard UI
* ⚡ Backend API for incidents
* 🌐 Hosted database with Neon

---

## 🧱 Tech Stack

* **Frontend**: Next.js App Router, React, Tailwind CSS
* **Backend**: Next.js API routes, Prisma ORM
* **Database**: PostgreSQL (Neon)
* **Icons**: Lucide React, React Icons

---

## 📁 Folder Structure

```
secure-sight/
├── app/
│   ├── page.js              // Home Dashboard
├── components/
│   ├── Navbar.js
│   └── UnresolvedIncidents.js
├── prisma/
│   ├── schema.prisma
│   └── seed.js              // Seed cameras + incidents
├── pages/api/
│   ├── incidents/index.js   // GET unresolved
│   └── incidents/[id]/resolve.js // PATCH resolve
├── styles/
├── public/
├── package.json
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/harshpdsingh/secure-sight-dashboard.git
cd secure-sight
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```
DATABASE_URL="<your-neon-postgres-url>"
```

### 4. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Seed the Database

```bash
node prisma/seed.js
```

### 6. Start the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 🛠 API Endpoints

### `GET /api/incidents?resolved=false`

Returns all unresolved incidents.

### `PATCH /api/incidents/:id/resolve`

Marks a specific incident as resolved.

---

## 🌐 Hosting Notes

* Neon is used for free PostgreSQL hosting.
* When deploying (e.g. Vercel), ensure your Neon DB URL is set in the environment.

---

## 📸 Credits

* Icons from [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/)

---

## 💡 Future Improvements

* Add login system for admins
* Realtime incident updates (WebSockets)
* Notification system
* Upload camera feeds / snapshots

---