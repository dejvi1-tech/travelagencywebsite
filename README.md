# Travel Agency Website

A modern, responsive travel agency website built with Vite + React + TypeScript. Features a clean design, interactive components, and a complete admin panel for managing destinations, packages, and orders.

## 🌟 Features

### Public Website
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, travel-focused design with smooth animations
- **Interactive Search**: Hero search with filters for destinations, dates, and budget
- **Destination Showcase**: Beautiful destination cards with detailed information
- **Package Management**: Browse and book travel packages
- **Shopping Cart**: Add packages to cart and proceed to checkout
- **Special Deals**: Featured deals with discount pricing
- **Customer Testimonials**: Social proof from satisfied travelers
- **Contact Forms**: Contact page with validation

### Admin Panel
- **Dashboard**: Overview with KPIs and charts
- **Destination Management**: Full CRUD operations for destinations
- **Package Management**: Create and manage travel packages
- **Order Management**: View and track customer orders
- **Data Export/Import**: Backup and restore functionality
- **Authentication**: Simple demo authentication system

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts (for admin dashboard)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Create the project**:
```bash
npm create vite@latest travel-agency -- --template react-ts
cd travel-agency
```

2. **Install dependencies**:
```bash
npm install react-router-dom zustand framer-motion lucide-react recharts react-hook-form zod react-day-picker
npm install -D tailwindcss postcss autoprefixer @types/react-router-dom
```

3. **Initialize Tailwind CSS**:
```bash
npx tailwindcss init -p
```

4. **Set up shadcn/ui**:
```bash
npx shadcn@latest init
npx shadcn@latest add button input card badge avatar accordion dialog sheet table textarea select tabs dropdown-menu navigation-menu form toast
```

5. **Copy all the files** from this project into your directory structure

6. **Start the development server**:
```bash
npm run dev
```

Visit `http://localhost:5173` to see the website.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── DestinationCard.tsx
│   ├── PackageCard.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/               # Page components
│   ├── admin/           # Admin panel pages
│   ├── Home.tsx
│   ├── Destinations.tsx
│   └── ...
├── stores/              # Zustand state stores
│   ├── auth.ts
│   ├── cart.ts
│   └── data.ts
├── utils/               # Utility functions
├── types.ts             # TypeScript type definitions
├── config.ts            # App configuration
└── ...

public/
├── data/                # Seed data (JSON files)
│   ├── destinations.json
│   ├── packages.json
│   ├── deals.json
│   └── testimonials.json
└── images/              # Static images
```

## 🔧 Configuration

### Admin Credentials
Default admin login (configured in `src/config.ts`):
- **Email**: admin@local
- **Password**: admin123

### Data Management
- All data is stored in localStorage for demo purposes
- Seed data is loaded from `/public/data/*.json` files
- Export/import functionality available in admin panel

## 🎨 Customization

### Branding
Update `src/config.ts` to change:
- App name and description
- Contact information
- Social media links
- Admin credentials

### Styling
- Modify `tailwind.config.js` for design system changes
- Update CSS variables in `src/index.css` for color scheme
- Customize component styles in respective files

### Data
- Modify JSON files in `/public/data/` to change seed data
- Add your own images to `/public/images/`
- Update destination and package information

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large: 1280px+

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Vite and configure build settings
3. Deploy with default settings

### Environment Variables
For production deployment, you may want to:
- Move admin credentials to environment variables
- Configure actual API endpoints
- Set up real authentication system

## 🔒 Security Notes

This is a demo application with simplified authentication:
- Admin credentials are stored in code (not suitable for production)
- No real API backend (uses localStorage)
- No actual payment processing

For production use:
- Implement proper authentication (JWT, OAuth, etc.)
- Use a real backend API
- Add proper security measures
- Implement real payment processing

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

---

**Happy traveling! ✈️🌍**# travelagencywebsite
