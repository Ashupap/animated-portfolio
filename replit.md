# Professional Portfolio Website

## Overview

This is a full-stack web application built as a professional portfolio website for a finance consultant named Sarah Chen. The application showcases a modern, responsive design with smooth animations and interactive elements. It features multiple sections including hero, about, services, portfolio, skills, and contact areas. The tech stack includes React with TypeScript for the frontend, Express.js for the backend, and PostgreSQL with Drizzle ORM for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React 18 with TypeScript, utilizing Vite as the build tool and development server. The UI framework is based on shadcn/ui components with Radix UI primitives, providing a comprehensive set of accessible components. Styling is handled through Tailwind CSS with custom CSS variables for theming. The application uses Wouter for client-side routing and Framer Motion for smooth animations and transitions. State management is handled through TanStack Query (React Query) for server state and React's built-in state management for local state.

### Backend Architecture
The server-side uses Express.js as the web framework running on Node.js. The application follows a modular structure with separate files for routes, storage interfaces, and server configuration. Currently implements an in-memory storage system with interfaces designed for easy migration to database persistence. The server includes middleware for JSON parsing, URL encoding, request logging, and error handling.

### Data Storage Solutions
The application is configured to use PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. Database configuration includes Neon Database serverless driver for cloud-based PostgreSQL hosting. The current implementation includes a temporary in-memory storage system that follows the same interface pattern as the planned database implementation, making migration seamless. Database schema is defined in TypeScript with Zod validation for runtime type checking.

### Authentication and Authorization
The system includes session management infrastructure using connect-pg-simple for PostgreSQL-backed sessions. User schema includes username and password fields with unique constraints. The current implementation provides basic user CRUD operations through the storage interface, with placeholder routes ready for authentication endpoints.

### Styling and Design System
The application uses a comprehensive design system built on Tailwind CSS with custom color schemes and typography. The design includes CSS custom properties for theming, with support for both light and dark modes. Font integration includes Google Fonts (Inter, Playfair Display) for professional typography. The component library provides consistent spacing, shadows, and border radius throughout the application.

## External Dependencies

### Database and ORM
- **Neon Database Serverless**: Cloud PostgreSQL provider for scalable database hosting
- **Drizzle ORM**: Type-safe SQL query builder and ORM for PostgreSQL operations
- **Drizzle Kit**: Database migration and schema management tool

### UI and Design
- **Radix UI**: Comprehensive collection of accessible, unstyled UI primitives
- **shadcn/ui**: Pre-built component library built on top of Radix UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library providing consistent iconography
- **Framer Motion**: Animation library for smooth transitions and interactions

### State Management and HTTP
- **TanStack Query**: Data fetching and server state management library
- **Wouter**: Lightweight client-side routing library for React

### Development and Build Tools
- **Vite**: Fast build tool and development server with HMR support
- **TypeScript**: Static type checking for improved development experience
- **ESBuild**: Fast JavaScript bundler for production builds

### Session and Authentication
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Express Session**: Session middleware for user authentication state

### Validation and Forms
- **Zod**: Schema validation library for runtime type checking
- **React Hook Form**: Form library with validation support
- **@hookform/resolvers**: Validation resolvers for React Hook Form integration

### Development Utilities
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for better debugging
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment
- **@replit/vite-plugin-dev-banner**: Development banner for Replit projects