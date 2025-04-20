# Portfolio Website

A modern, interactive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Interactive UI**: Modern and engaging user interface with animations and responsive design
- **Dynamic Components**: Interactive elements like particle animations, typewriter effects, and hover states
- **PDF Viewer**: Enhanced PDF viewer for certificates and CV with navigation controls
- **Filterable Gallery**: Certificate gallery with filtering, search, and grid/list views
- **Dark/Light Mode**: Theme switcher with persistent preferences
- **Responsive Design**: Fully responsive layout for all device sizes
- **SEO Optimized**: Metadata and proper HTML structure for better SEO
- **Accessibility**: ARIA attributes and keyboard navigation

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app directory containing pages and global styles
- `components/` - Reusable React components
- `public/` - Static assets like images, fonts, and PDFs

### Key Components

- `PDFViewer.tsx` - Enhanced PDF viewer with navigation and zoom
- `Background.tsx` - Interactive canvas background with particles
- `ThemeProvider.tsx` - Context provider for dark/light mode
- `Navbar.tsx` and `Footer.tsx` - Layout components

## Customization

### Adding Your Projects

Edit the projects array in `app/projects/page.tsx` with your own project details:

```typescript
const projects = [
  {
    title: "Project Name",
    description: "Project description",
    tags: ["React", "TypeScript", "Node.js"],
    image: "/path/to/image.jpg",
    link: "https://yourproject.com"
  },
  // Add more projects
];
```

### Adding Certificates

Add your certificates to the certificates array in `app/certificates/page.tsx`:

```typescript
const certificates = [
  {
    id: 1,
    title: "Certificate Name",
    category: "Category",
    date: "2023-01-01",
    issuer: "Issuer Name",
    path: "/certificates/your-certificate.pdf",
    pages: 2
  },
  // Add more certificates
];
```

## Deployment

The site is ready to be deployed to platforms like Vercel, Netlify, or any other hosting service that supports Next.js.

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Deploy to your preferred hosting service.

## License

MIT License

## Acknowledgments

- Next.js
- TailwindCSS
- Lucide React
- React PDF