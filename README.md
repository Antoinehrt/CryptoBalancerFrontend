# CryptoBalancerFrontend 🚀

A modern web application to manage and optimise your cryptocurrency portfolio with automated rebalancing strategies and performance backtests.

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Authentication](#-authentication)
- [Testing](#-testing)
- [Build and Deployment](#-build-and-deployment)
- [Technologies](#-technologies)
- [Associated Repositories](#-associated-repositories)
- [Additional Resources](#-additional-resources)

## 📖 About

**CryptoBalancer** is a platform designed for cryptocurrency investors who want help managing their portfolio management. 

The application allows you to:
- Apply personalised rebalancing strategies
- Analyse past performance through backtests
- Track KPIs in real-time
- Consult a comprehensive glossary of cryptocurrency-related terms

## ✨ Features

### 🏠 Home

Landing page presenting the application and its main benefits.

### 🔐 Authentication

- Secure login system
- User session management

[//]: # (- Role-Based Access Control &#40;RBAC&#41;)

### 👤 User Profile

- Personal profile management
- Account settings
- User preferences

### 💼 Portfolio Management

- **Portfolio Creation**: Easy creation of a new portfolio with asset allocation
- **Portfolio Tracking**: Real-time overview of assets and their distribution
- **Asset Management**: Add, modify, or remove assets from your portfolio

### 📊 Backtesting

- Test strategies on historical data
- Analyze potential performance
- Compare different strategies

### 📈 Strategies

- **Available Strategies**:
  - Constant Mix
  - Hold
- Strategy selection and application
- History of strategies used

### 📚 Glossary

Comprehensive resource defining all key terms related to cryptocurrencies and investment strategies.

## 📦 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v11.6.2 or higher (included with Node.js)
- **Angular CLI**: v21.0.1
- **CryptoBalancer Backend**: Must be installed and running ([CryptoBalancerBackend](https://github.com/WDFAllan/cryptoBalancer) for installation instructions)

## 🚀 Installation

### 1. Clone the repository

```git
git clone https://github.com/Antoinehrt/CryptoBalancerFrontend.git
cd CryptoBalancerFrontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the root of the project or configure the environment variables in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
};
```

## ⚡ Quick Start

### Development mode

```bash
ng serve
```

The application will be accessible at `http://localhost:4200/`. It automatically reloads when you modify source files.

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                          # Core business logic
│   │   ├── guards/                    # Route guards (authentication, portfolio)
│   │   ├── interceptors/              # HTTP interceptors (authentication)
│   │   ├── services/                  # Business services
│   │   ├── dto/                       # Data Transfer Objects
│   │   ├── enums/                     # Enumerations
│   │   └── models/                    # Business models
│   ├── pages/                         # Page components
│   ├── shared/                        # Shared components and styles
│   │   ├── components/
│   │   └── styles/
│   ├── app.routes.ts                 # Route configuration
│   ├── app.config.ts                 # Application configuration
│   ├── app.ts                        # Root component
│   └── app.css                       # Global styles
├── assets/
│   └── img/                           # Images and icons
├── environments/                      # Environment configurations
├── index.html                         # Main HTML
├── main.ts                            # Application entry point
├── styles.css                         # Global stylesheet
└── custom-theme.scss                  # Custom Angular Material theme
```

## 🏗️ Architecture

### Modular approach

- **Core Module**: Business logic, services, guards, interceptors
- **Shared Module**: Reusable components, common styles
- **Pages**: Page components (routing)


### Main services

| Service           | Responsibility                           |
|-------------------|------------------------------------------|
| `AuthService`     | Authentication and session management    |
| `WalletService`   | User portfolio management                |
| `AssetService`    | Asset and data management                |
| `BacktestService` | Backtesting calculations and simulations |
| `CandleService`   | OHLC data retrieval                      |
| `UserService`     | User data management                     |

## 🧪 Testing

At this stage, automated tests are not yet implemented.

The focus of the project was primarily on:
- application architecture
- frontend/backend integration
- portfolio management logic

Testing is planned as a future improvement.


## 🏗️ Build and Deployment

### Prerequisites for deployment

⚠️ **Important**: Before building or deploying, make sure that:

- The CryptoBalancer backend is installed and configured
- The backend is accessible at the URL configured in `src/environments/environment.ts`
- All backend dependencies are resolved

### Production build

```bash
npm run build
```

Compiled artefacts will be stored in the `dist/` directory. By default, the production build optimises the application for performance and speed.

### Build options

```bash
# Development build
ng build --configuration development

# Production build (optimized)
ng build --configuration production
```

## 🛠️ Technologies

### Frontend Framework

- **Angular** 21.0.0 - TypeScript framework for SPA applications
- **TypeScript** 5.9.2 - Typed programming language

### UI & Charting Libraries

- **Angular Material** 21.0.1 - Material Design components
- **Chart.js** 4.5.1 - Data visualization

### State Management & HTTP

- **RxJS** 7.8.0 - Reactive programming
- **Angular Forms** - Form management
- **Angular Router** - Client-side routing

## 🔗 Associated Repositories

This project is the frontend of CryptoBalancer. Also check out:

- **Backend**: [CryptoBalancerBackend](https://github.com/antoinehrt/CryptoBalancerBackend) - REST API and business logic

> **Note**: Make sure the backend is running before starting the frontend application.

## 📚 Additional Resources

### Official Documentation

- [Angular Documentation](https://angular.dev/)
- [Angular CLI](https://angular.dev/tools/cli)
- [Chart.js Documentation](https://www.chartjs.org/)
- [Angular Material](https://material.angular.io/)

## 🆘 Support

For any questions or issues:

- Open an issue on the repository
- Contact the development team

---

**Version**: v0.1.0-alpha  
**📅 Last updated**: January 2026 | **👤 Maintainer**: [Antoinehrt](https://github.com/Antoinehrt)
