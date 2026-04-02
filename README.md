# FinFlow - Techcare Assessment

I built FinFlow which is a personal finance dashboard using React, TypeScript, and Vite.
My goal was to keep it clean, easy to read, and practical from a user perspective as per the requirements.

## Live Demo

https://thefinflow.vercel.app/

## What I Built

### Dashboard

The dashboard gives a quick overview of finances:

- Total Balance, Total Income, and Total Expenses cards
- A bar chart showing spending by category
- A 6-month spending trend displayed as an area chart

### Transactions

This is where most interaction happens:

- A transaction table with virtualized rendering for smooth scrolling (8 items visible at a time, configurable)
- Search by description
- Filters by category and status
- Sorting by date or amount (ascending/descending)
- Clear filters option
- Add Transaction drawer with form validation
- Success toast when adding a transaction

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

## Local Setup and Run

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

## Folder Structure

The app follows a feature-based structure to keep related code together:

For reference: https://dev.to/homayounmmdy/modular-architecture-in-react-how-to-build-scalable-and-maintainable-projects-1cbn

- `src/features/dashboard` contains the summary cards and chart sections for the analytics view.
- `src/features/transactions` contains the transaction table, filters, drawer form, hooks, types, and store.
- `src/shared` contains reusable UI components, constants, and utility helpers used across features.
- `src/lib` contains low-level helpers shared by the component layer.

This layout keeps business logic close to the feature that uses it and avoids turning the project into a generic component library.

## State Management

I used Zustand for application state, mainly for transactions and their derived interactions.

The reasoning was:

- I chose to use Zustand because I already had experience with it, and given the limited time, it made more sense to rely on something I’m comfortable with rather than trying to learn and implement a new state management solution without focusing on core functionality.
- The app only needs a small amount of shared state and zustand is very simple with minimal boilerplate code to implement
- Zustand is lightweight and easy to read
- The store is persisted to browser storage easily with zustand

## Trade-offs

I made a few deliberate shortcuts to stay focused on the assessment scope:

- Focused on core functionality over ui improvements
- used built-in ui libraries from shadcn like button,input,drawer,label,etc.
- The transaction drawer and virtualized list were implemented in a practical, lightweight way instead of introducing heavier abstractions

## What I Would Improve Next

Given more time, I would extend this into a fuller product by:

- I'd have added filtering transaction with date range as this is the standard approach to FinTech apps.
- I'd also add the option to export reports in pdf/excel.
- Adding optimistic updates, error handling, and loading states for networked operations.

## Notes

- This is a client-side implementation using mock data.
- Transactions are persisted in browser storage.
- I prioritized clarity and maintainability over premature abstraction.
