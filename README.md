
<hr>
</div>

<!--> Logo of the project </!-->
<div align="center">
<img src="./assets/logo.png" width="90" alt="Logo" />
</a>

<!--> Title </!-->
<h2> ConArt : Convention Sales Counter for artist </h2>

<!--> Tech Stack icon </!-->
![](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)

</div>

## 💡 Overview

ConArt is a sales tracker for artists at conventions. It shows the items on sale and lets you record each sale. It is accessed through a web-based application.

## ✨ Features

- **🔐 User Authentication:** Email and password login (not yet configured).
- **Sales View:** Browse the items on sale.
- **Sales Log:** Record each sale.

## 👩‍💻 Tech Stack

- **Next.js 16** (App Router): React framework for the pages and `/api` route handlers.
- **TypeScript**: Typed JavaScript for the whole codebase.
- **React 19**: UI library.
- **TanStack Query**: Data-fetching library for managing server state in the browser (planned).
- **Tailwind CSS 4**: A utility-first CSS framework for styling.
- **Drizzle ORM and SQLite** (planned): Database access and storage.
- **Vitest**: Unit testing. **ESLint** and **Prettier**: Linting and formatting.


## 📦 Getting Started


### 🚀 Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or later (Node.js LTS recommended)
- [pnpm](https://pnpm.io/)


## 🛠️ Installation

```bash
git clone https://github.com/<your-username>/ConArt.git
cd ConArt
pnpm install
```


## 📖 Usage


### ✔ Running the Website

Start the development server:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 🧪 Other Commands

| Command | Purpose |
|---|---|
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests (Vitest, in `tests/unit/`) |
| `pnpm exec tsc --noEmit` | Type-check |
| `pnpm exec prettier --check .` | Check formatting |

Production builds run on the Raspberry Pi because the SQLite driver must match its ARM64 CPU.


### 📃 API Documentation

The API is not implemented yet. Endpoints will be documented here once available.


## 🤝 Contributing

Contributions are welcome. Please open an issue to discuss your idea before submitting a pull request.


## 🐛 Issues

Report bugs or request features on the [Issues page](https://github.com/<your-username>/ConArt/issues).


## 📜 License

This project is licensed under the MIT License.
