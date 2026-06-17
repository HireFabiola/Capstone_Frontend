# R4B Design Studio Frontend

React and TypeScript frontend for the R4B Design Studio business website,
software engineering portfolio, and internal admin dashboard.

## Development

```bash
npm install
npm run dev
```

Create a root `.env` file with:

```bash
VITE_API_URL=http://localhost:3000/api
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

## Checks

```bash
npm run lint
npm run build
```

## Main Routes

- `/` - R4B Design Studio homepage
- `/portfolio` - software engineering portfolio
- `/contact` - client inquiry form
- `/admin/login` - admin authentication
- `/admin/dashboard` - protected CRM dashboard
