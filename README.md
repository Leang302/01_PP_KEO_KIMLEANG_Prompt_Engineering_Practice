# Todo App (Next.js + TypeScript + Tailwind CSS + Framer Motion)

Production-ready, offline-capable Todo List built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

## Features

- Add, edit, delete tasks with confirmation and validation
- View task details (description, created/updated timestamps)
- Complete/active status with filters and counts
- Optional search and sort (by created date and priority)
- Seeded with 3 example tasks on first run
- Local persistence via localStorage with safe in-memory fallback and warning
- Accessible UI, keyboard friendly, responsive, and animated

## Tech Stack

- Next.js (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Heroicons

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project Structure

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    ... UI components
  lib/
    storage.ts
    uuid.ts
    seeds.ts
  types/
    task.ts
```

## Notes

- Duplicate titles are allowed; a small inline notice appears on create/edit.
- If localStorage is unavailable (private mode or disabled), the app stores data in-memory and shows a non-blocking toast explaining tasks won't persist.
- Keyboard: Enter to add, Escape to close modals, Tab order and focus rings are maintained.

## License

MIT

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
