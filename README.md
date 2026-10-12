# বাজার দর (Bazar Dor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজারভিত্তিক দর এবং দৈনিক মূল্য পরিবর্তন দেখার responsive ওয়েব অ্যাপ।

## Technologies

- Next.js App Router and React
- TypeScript
- Tailwind CSS and DaisyUI
- Better Auth with MongoDB
- Programming Hero Bazar Dor API

## Features

- Homepage with today's biggest price increases and decreases, plus all products.
- Category pages with live API filtering and default, low-to-high, and high-to-low price sorting.
- Responsive product cards with Bengali prices, units, and price-change indicators.
- Login-protected product detail pages with market-by-market minimum, maximum, and average prices.
- Email/password, Google, and GitHub authentication with profile and profile update pages.
- Responsive navigation with category links, a live price ticker, and a custom not-found page.

## Run locally

1. Install dependencies with `npm install`.
2. Configure the Better Auth and MongoDB environment variables used by `src/lib/auth.ts` in `.env.local`.
3. Start the development server with `npm run dev`.
4. Open [https://bazar-dor-safoun.vercel.app/](https://bazar-dor-safoun.vercel.app/).

Run `npm run lint` and `npm run build` to check the application.
