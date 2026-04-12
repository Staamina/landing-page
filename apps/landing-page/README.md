# Web Application

Next.js application with internationalization, authentication, and modern UI components.

## Features

- 🌍 **Internationalization**: Support for English (default) and French
- 🔐 **Authentication**: Configured with Auth.js and Zitadel
- 🎨 **UI Components**: shadcn/ui with Tailwind CSS
- 📝 **Form Handling**: React Hook Form with Yup validation
- 🔄 **Data Fetching**: TanStack Query (React Query)
- 📊 **Tables**: TanStack Table (React Table)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your Zitadel credentials:

```bash
cp .env.example .env.local
```

### Development

```bash
pnpm dev
```

Open [http://localhost:4001](http://localhost:4001) with your browser to see the result.

### Build

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## Project Structure

```
apps/web/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/     # Internationalized routes
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   └── ui/          # shadcn/ui components
│   ├── i18n/            # Internationalization config
│   └── lib/             # Utilities and configs
├── messages/            # Translation files
└── public/              # Static assets
```

## Technologies

- **Next.js 14**: React framework with App Router
- **next-intl**: Internationalization
- **@zitadel/react**: Zitadel OIDC authentication
- **shadcn/ui**: UI component library
- **Tailwind CSS**: Styling
- **React Hook Form**: Form management
- **Yup**: Schema validation
- **TanStack Query**: Data fetching and caching
- **TanStack Table**: Table component
