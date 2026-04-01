# FinFlow - Techcare Assessment

I built FinFlow as a personal finance dashboard using React, TypeScript, and Vite.
My goal was to keep it clean, easy to read, and practical from a user perspective.

## Live Demo

https://thefinflow.vercel.app/

## What I Built

### Dashboard

- Total Balance, Total Income, and Total Expenses summary cards
- Spending by Category bar chart
- Spending Trend (last 6 months) area chart

### Transactions

- Transaction table with virtualized rendering for smoother scrolling, 8 transactions shows at a time and its configurable
- Search by description
- Filters by category and status
- Sorting by date/amount with ascending and descending order
- Clear filters button
- Add Transaction drawer with form validation
- Success toast when a new transaction is added

### Data & State

- Mock transaction dataset for initial data
- Zustand store with persistence
- Data stays available after refresh (persisted in localstorage)

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Hook Form
- Recharts
- Sonner
- Radix / Vaul UI primitives

## Project Structure

I followed a feature-first structure:

- `dashboard` for analytics and chart UI
- `transactions` for filters, table, hooks, and store
- `shared` for reusable UI primitives, constants, and utility functions

This helped me keep business logic close to each feature and avoid unnecessary abstractions.

## Design Choices

- I kept most components feature-local unless there was clear repeated usage.
- I extracted repeated UI blocks only where it improved readability.
- I kept hook state in parent/container components when multiple UI blocks needed the same data.
- I added virtual list behavior in transactions to keep rendering efficient.
- I used strong typing across transactions, filters, statuses, and categories.

## Run Locally

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview production build

```bash
npm run preview
```

## Notes

- This is a client-side implementation using mock data.
- Transactions are persisted in browser storage.
- I prioritized clarity and maintainability over premature abstraction.
