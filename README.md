# Wolf Bites

A modern web application built with Next.js and deployed on Vercel.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
wolf-bites/
├── src/
│   └── app/           # Next.js App Router pages
│       ├── layout.tsx # Root layout
│       └── page.tsx   # Home page
├── public/            # Static assets
├── CLAUDE.md          # AI assistant guide
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript configuration
├── next.config.js     # Next.js configuration
└── vercel.json        # Vercel deployment configuration
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting

## Deployment

This project is configured for deployment on Vercel. See [VERCEL_SETUP.md](VERCEL_SETUP.md) for details.

## Documentation

- [CLAUDE.md](CLAUDE.md) - Comprehensive guide for AI assistants
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)

## License

MIT
