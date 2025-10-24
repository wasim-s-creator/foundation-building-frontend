# Foundation Building Frontend 🚀

> A modern React.js frontend application for the Foundation Building system, featuring standardized templates, GitHub integration, and AI-powered capabilities.

![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)
![Material-UI](https://img.shields.io/badge/Material--UI-5.15.0-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components](#components)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

The Foundation Building Frontend is a comprehensive React.js application that provides a user-friendly interface for managing:

- **Standardized Templates** - Issue and PR templates with YAML configuration
- **GitHub Integration** - Seamless connection with GitHub repositories
- **Wiki Knowledge Base** - Integrated knowledge management system
- **Vector Database Actions** - AI-powered search and indexing capabilities
- **VCS Integration** - Version control system management

## ✨ Features

### Core Features
- 🎯 **Modern React Architecture** - Built with React 18 and TypeScript
- 🎨 **Material-UI Design System** - Consistent and accessible UI components
- 🔄 **State Management** - Zustand for efficient state handling
- 📱 **Responsive Design** - Mobile-first approach with responsive layouts
- 🚀 **Performance Optimized** - Lazy loading, code splitting, and optimizations
- 🔒 **Security First** - Built-in security headers and best practices

### GitHub Integration Features
- 📝 **Issue Templates** - Bug reports, feature requests, security vulnerabilities
- 🔀 **PR Templates** - Comprehensive pull request templates
- 🏷️ **Label Management** - Automated labeling system
- 📊 **Repository Analytics** - Insights and metrics dashboard
- 🤖 **GitHub Actions Integration** - Workflow automation

### AI-Powered Features
- 🧠 **Vector Search** - Semantic search across repositories
- 🤖 **AI Code Analysis** - Automated code review and suggestions
- 📚 **Knowledge Indexing** - Intelligent documentation organization
- 🔍 **Smart Search** - Context-aware search functionality

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Architecture                 │
├─────────────────────────────────────────────────────────┤
│  React.js + TypeScript + Material-UI                   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐   │
│  │   Pages     │ │ Components  │ │   Services      │   │
│  │             │ │             │ │                 │   │
│  │ • Dashboard │ │ • Layout    │ │ • GitHub API    │   │
│  │ • Templates │ │ • Forms     │ │ • Vector DB     │   │
│  │ • GitHub    │ │ • Tables    │ │ • AI Services   │   │
│  │ • Wiki      │ │ • Charts    │ │ • Auth Service  │   │
│  │ • Settings  │ │ • Modals    │ │                 │   │
│  └─────────────┘ └─────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐   │
│  │ State Mgmt  │ │   Routing   │ │    Utilities    │   │
│  │             │ │             │ │                 │   │
│  │ • Zustand   │ │ • React     │ │ • Validation    │   │
│  │ • React     │ │   Router    │ │ • Formatters    │   │
│  │   Query     │ │ • Protected │ │ • Constants     │   │
│  │             │ │   Routes    │ │ • Helpers       │   │
│  └─────────────┘ └─────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wasim-s-creator/foundation-building-frontend.git
   cd foundation-building-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3001/api
   REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
   REACT_APP_VECTOR_DB_URL=http://localhost:8000
   # ... other variables
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm build` | Build for production |
| `npm test` | Run test suite |
| `npm run lint` | Lint TypeScript files |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript compiler check |

## 📁 Project Structure

```
foundation-building-frontend/
├── public/
│   ├── index.html              # HTML template
│   ├── manifest.json           # PWA manifest
│   └── favicon.ico             # Favicon
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Layout/             # Main layout components
│   │   ├── Forms/              # Form components
│   │   ├── Tables/             # Data table components
│   │   ├── Charts/             # Visualization components
│   │   └── Common/             # Shared components
│   ├── pages/                  # Page components
│   │   ├── Dashboard/          # Dashboard page
│   │   ├── Templates/          # Templates management
│   │   ├── GitHub/             # GitHub integration
│   │   ├── Wiki/               # Wiki knowledge base
│   │   ├── VectorSearch/       # Vector search interface
│   │   └── Settings/           # Application settings
│   ├── services/               # API services
│   │   ├── api/                # API client configuration
│   │   ├── github/             # GitHub API services
│   │   ├── vector/             # Vector database services
│   │   └── auth/               # Authentication services
│   ├── store/                  # State management
│   │   ├── authStore.ts        # Authentication state
│   │   ├── githubStore.ts      # GitHub integration state
│   │   └── uiStore.ts          # UI state management
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   ├── constants/              # Application constants
│   ├── theme/                  # Material-UI theme configuration
│   └── assets/                 # Static assets
├── .github/
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   │   ├── bug_report.yml      # Bug report template
│   │   ├── feature_request.yml # Feature request template
│   │   └── security.yml        # Security report template
│   └── pull_request_template.md # PR template
├── docs/                       # Documentation
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── .env.example               # Environment variables template
└── README.md                  # Project documentation
```

## 🧩 Components

### Core Components

- **Layout** - Main application layout with navigation
- **ErrorBoundary** - Error handling and fallback UI
- **LoadingSpinner** - Consistent loading indicators
- **ProtectedRoute** - Authentication-based route protection

### Feature Components

- **TemplateManager** - GitHub template management
- **RepositoryBrowser** - Repository exploration interface
- **VectorSearchPanel** - AI-powered search interface
- **WikiEditor** - Knowledge base content editor
- **AnalyticsDashboard** - Metrics and insights visualization

## 🔌 API Integration

### GitHub API
```typescript
// Example: Fetch repository data
import { githubApi } from '@/services/github';

const repositories = await githubApi.getRepositories({
  page: 1,
  perPage: 20,
  sort: 'updated'
});
```

### Vector Database
```typescript
// Example: Perform semantic search
import { vectorDb } from '@/services/vector';

const results = await vectorDb.search({
  query: 'React components',
  limit: 10,
  threshold: 0.8
});
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment-Specific Builds
```bash
# Staging
NODE_ENV=staging npm run build

# Production
NODE_ENV=production npm run build
```

### Deployment Platforms

- **Vercel** - Recommended for easy deployment
- **Netlify** - Alternative static hosting
- **AWS S3 + CloudFront** - Enterprise solution
- **Docker** - Containerized deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add appropriate tests
- Update documentation as needed
- Ensure all checks pass

### Issue Templates

We provide standardized issue templates:
- 🐛 **Bug Report** - Report bugs and issues
- ✨ **Feature Request** - Suggest new features
- 🔒 **Security Report** - Report security vulnerabilities

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Material-UI Team** - For the beautiful component library
- **GitHub** - For the excellent API and platform
- **Contributors** - For making this project better

## 📞 Support

If you have any questions or need help:

- 🐛 **Issues** - [Create an issue](https://github.com/wasim-s-creator/foundation-building-frontend/issues)
- 💡 **Discussions** - [GitHub Discussions](https://github.com/wasim-s-creator/foundation-building-frontend/discussions)

---

**Built with ❤️ using React.js and TypeScript**