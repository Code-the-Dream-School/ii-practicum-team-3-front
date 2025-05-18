# Fitness App: Front-End Repository

Welcome to the **front-end** repository for **Fitness App** — a full-stack application that connects to a Node.js backend API to manage **user authentication**, **workouts**, **exercises**, and **user profiles**.
It provides a React-based interface for users to interact with their fitness data seamlessly.


## Technologies Used
**Frontend Stack:**
- [React](https://reactjs.org/) - core UI library
- [React Router DOM v7](https://reactrouter.com/) - client-side routing
- [Vite](https://vitejs.dev/) - fast build tool and dev server
- [Axios](https://axios-http.com/) - HTTP client for API requests
- [MUI (Material UI)](https://mui.com/) - UI component library
- [Emotion](https://emotion.sh/docs/introduction) - CSS-in-JS styling (used by MUI)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) - notification system

**Tooling & Code Quality:**
- [ESLint](https://eslint.org/) - JavaScript linter
- [Prettier](https://prettier.io/) - code formatter


## Installation
Create a folder to contain both the front-end and backend repos.
Clone the frontend and back-end repos:
```bash
git clone https://github.com/Code-the-Dream-School/ii-practicum-team-3-front.git
git clone https://github.com/Code-the-Dream-School/ii-practicum-team-3-back.git
```
Navigate to the frontend folder and install dependencies:
```bash
cd ii-practicum-team-3-front
npm install
```


## Running the App
Start the development server:
```bash
npm run dev
```


## Environment Variables
Create a .env file in the root directory based on the provided .env.example:
```bash
VITE_API_BASE_URL=http://localhost:3000
```


## Project Structure
``` bash
src/                   # Main source code
├── api/               # API calls
├── assets/            # Images and static assets
├── components/        # Reusable UI components
├── constants/         # Application constants
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── layout/            # Layout components
├── pages/             # Route-level pages
├── routes/            # Route definitions
├── styles/            # Global and component styles
├── util/              # Utility functions/helpers
├── App.jsx            # Root React component
├── main.jsx           # Application entry point
├── app.css            # Global styles for app
└── index.css          # Additional global CSS

.env.example           # Environment variable example
.eslintrc.json         # ESLint configuration
.gitignore             # Git ignore rules
.prettierrc            # Prettier configuration
index.html             # Main HTML file
package-lock.json      # Package lock file
package.json           # Package manifest
vite.config.js         # Vite configuration
README.md              # Project README
```

## Features
- User authentication with protected routes (login, sign-up, password reset/change)
- Save exercises and workouts to favorites (available in Profile)
- Update personal user information
- Create custom workout


## Script
```bash
npm run dev               # Run development server
npm run build             # Build for production
npm run preview           # Preview production build
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint issues
npm run prettier:check    # Check Prettier formatting
npm run prettier:write    # Format code with Prettier
```


## Useful Links 
- [Backend Repository](https://github.com/Code-the-Dream-School/ii-practicum-team-3-back)
- [Live app](https://fitnessappsadcat.netlify.app/)

## Authors
- [Alena Danilchenko](https://github.com/anelka777)
- [Petr Kekalo](https://github.com/pkekalo)
