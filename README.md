# R4B Design Studio

R4B Design Studio is a full-stack capstone project that combines a public business
website, a software engineering portfolio, and an internal admin dashboard for
managing inquiries, projects, and tasks.

## Highlights

- Responsive R4B Design Studio marketing site with Home, About, Services, and Contact pages
- Portfolio section showcasing featured software engineering projects
- Protected admin dashboard with inquiry, project, and task management
- Client inquiry workflow that can convert inquiries into projects
- Chart-based dashboard metrics for project and inquiry visibility

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Axios
- Chart.js
- Bootstrap Icons

## Project Structure

```text
Capstone_Frontend/
  public/
  src/
  package.json
```

## Getting Started

```bash
cd Capstone_Frontend
npm install
npm run dev
```

Create `Capstone_Frontend/.env` with:

```bash
VITE_API_URL=http://localhost:3000/api
```

## Quality Checks

```bash
cd Capstone_Frontend
npm run lint
npm run build
```

## Main Routes

- `/` - R4B Design Studio homepage
- `/about` - studio story and founder page
- `/services` - service offerings
- `/contact` - client inquiry form
- `/portfolio` - software engineering portfolio
- `/admin/login` - admin authentication
- `/admin/dashboard` - protected CRM dashboard
