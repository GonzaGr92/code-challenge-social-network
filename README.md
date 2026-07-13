# Social Network

A small social-network app built as a coding challenge. Users can browse a feed of posts, create new posts, and open a post to read and add nested (threaded) comments.

Built with:

- [Next.js](https://nextjs.org) (Pages Router) with static export (`output: 'export'`)
- [React](https://react.dev) 19 + TypeScript
- [TanStack Query](https://tanstack.com/query) for data fetching and caching
- [Zustand](https://zustand-demo.pmnd.rs) for client state
- [axios](https://axios-http.com) against a [mockapi.io](https://mockapi.io) backend
- Sass (CSS modules) for styling

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

## Running with Docker

The app is built as a static export ([`output: 'export'`](next.config.ts)) and served with nginx.

Build the image:

```bash
docker build -t social-network .
```

Run the container:

```bash
docker run --rm -p 8080:80 social-network
```

Then open [http://localhost:8080](http://localhost:8080).

> To build the app under a sub-path (e.g. when deploying behind a prefix), pass the base path at build time:
> `docker build --build-arg PAGES_BASE_PATH=/my-path -t social-network .`

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
