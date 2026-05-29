# Chain Fit Web Admin

Admin dashboard untuk memverifikasi dan mengelola data gym pada aplikasi Chain Fit.

## Overview

Project ini berisi frontend admin panel berbasis React + Vite. Aplikasi utama berada di folder `chain-fit-admin/`.

Fitur utama:

- Halaman welcome dan login admin
- Protected route untuk dashboard
- Verifikasi gym: pending, approve, reject
- Theme toggle dark/light
- UI yang sudah dipisah ke komponen reusable

## Tech Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React

## Project Structure

```text
chain_fit_web_admin/
├── README.md
└── chain-fit-admin/
	├── src/
	│   ├── components/
	│   ├── hooks/
	│   ├── layouts/
	│   ├── pages/
	│   ├── routes/
	│   ├── services/
	│   └── utils/
	├── package.json
	└── vite.config.js
```

## Setup

Masuk ke folder aplikasi:

```bash
cd "chain-fit-admin"
```

Install dependency:

```bash
npm install
```

Jalankan mode development:

```bash
npm run dev
```

Build untuk production:

```bash
npm run build
```

Jalankan lint:

```bash
npm run lint
```

## Environment

Buat file `.env` di folder `chain-fit-admin/` dan isi base URL API:

```env
VITE_API_BASE_URL=https://your-api-base-url.com
```

## Notes

- Login menggunakan token yang disimpan di `localStorage`.
- Route dashboard dilindungi oleh guard auth.
- Jika backend berubah, sesuaikan endpoint di `src/services/`.

## Useful Files

- `chain-fit-admin/src/pages/Login.jsx`
- `chain-fit-admin/src/pages/Dashboard.jsx`
- `chain-fit-admin/src/services/authService.js`
- `chain-fit-admin/src/services/gymService.js`
- `chain-fit-admin/src/utils/api.js`

## License

Private project.
