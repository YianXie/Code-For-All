# Code For All - React Website

A modern, responsive React website for Code For All, a coding education organization. Built with Vite, React, TailwindCSS, and React Router.

## 🚀 Features

- **Modern React Architecture**: Built with React 19 and modern hooks
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Reusable Components**: Modular component library for easy maintenance
- **Routing**: Client-side routing with React Router
- **Form Handling**: Custom form hooks with validation
- **Accessibility**: Built with accessibility in mind using Headless UI
- **Performance**: Optimized with Vite for fast development and builds

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── Button.jsx      # Reusable button component
│   ├── Card.jsx        # Card component
│   ├── Input.jsx       # Form input component
│   └── Modal.jsx       # Modal component
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── About.jsx       # About page
│   ├── Events.jsx      # Events page
│   ├── Team.jsx        # Team page
│   ├── Contact.jsx     # Contact page
│   └── Login.jsx       # Login page
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js  # Local storage hook
│   ├── useForm.js          # Form handling hook
│   └── useApi.js           # API handling hooks
├── utils/              # Utility functions
│   ├── validation.js   # Form validation rules
│   ├── formatters.js   # Data formatting utilities
│   └── constants.js    # Application constants
├── App.jsx             # Main app component
├── main.jsx           # Application entry point
└── index.css          # Global styles with TailwindCSS
```

## 🛠️ Technologies Used

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons

## 🎨 Design System

### Colors
- **Primary**: Blue color scheme for main actions and branding
- **Secondary**: Green color scheme for secondary actions
- **Gray**: Various shades for text and backgrounds

### Components
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Card**: Flexible card component with hover effects
- **Input**: Form input with validation and icon support
- **Modal**: Accessible modal with animations

### Typography
- **Font**: Inter font family for clean, modern look
- **Responsive**: Fluid typography that scales with screen size

## 📱 Pages

1. **Home** - Hero section, features, stats, testimonials, and CTA
2. **About** - Mission, values, timeline, and achievements
3. **Events** - Filterable event listings with registration
4. **Team** - Team member profiles with expertise
5. **Contact** - Contact form, FAQ, and contact information
6. **Login** - Authentication form with demo credentials

## 🔧 Custom Hooks

### useLocalStorage
Persistent state management with localStorage synchronization.

### useForm
Comprehensive form handling with validation, error management, and submission states.

### useApi
API call management with loading states, error handling, and data caching.

## 🎯 Key Features

### Responsive Navigation
- Mobile-friendly hamburger menu
- Active page highlighting
- Smooth transitions

### Interactive Components
- Hover effects and animations
- Loading states for forms
- Error handling and validation
- Modal dialogs

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd code-for-all
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Demo Credentials

For the login page, use these demo credentials:
- **Email**: demo@codeforall.org
- **Password**: demo123

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color shades
      },
      secondary: {
        // Your secondary color shades
      }
    }
  }
}
```

### Components
All components are designed to be easily customizable through props and CSS classes.

### Content
Update page content by modifying the respective page components in the `src/pages/` directory.

## 📦 Build and Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the `dist` folder to an S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Heroicons for beautiful icons
- Headless UI for accessible components

---

Built with ❤️ for Code For All