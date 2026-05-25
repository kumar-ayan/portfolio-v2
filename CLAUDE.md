# CLAUDE.md

This file contains guidelines and instructions for Claude when interacting with the project.

## 📂 Project Structure

The project follows a standard Next.js structure. Key directories include:
- `app/`: Next.js App Router pages and layouts
- `components/`: Reusable React components
- `lib/`: Utility functions and helpers
- `styles/`: Global styles and Tailwind CSS configuration
- `public/`: Static assets
- `actions/`: Server actions for data operations
- `store/`: State management

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Run
```bash
npm start
```

## 🛠️ Development Guidelines

### Coding Standards
- Use TypeScript for all new files
- Follow React best practices
- Keep components modular and reusable
- Prefer functional components with hooks
- Use Tailwind CSS for styling

### Component Guidelines
- **Pages**: Located in `app/` directory
- **Layouts**: Defined in `app/**/layout.tsx`
- **Components**: Reusable UI elements in `components/`
- **Server Actions**: Business logic in `actions/`
- **State Management**: Use Zustand for global state

### Testing
- Run tests with: `npm test`
- Unit tests in `__tests__/` directory
- Integration tests in `integration-tests/`

## 🔧 API & Data

### API Endpoints
All API endpoints are handled through server actions in the `actions/` directory. There are no external API integrations in this project.

### Data Models
- User data in `store/authStore.ts`
- Project data in `store/projectsStore.ts`
- Settings in `store/settingsStore.ts`

## 🎯 Deployment

### Vercel Deployment
This project is optimized for Vercel deployment.
```bash
npm run build
npm start
```

### Environment Variables
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Clerk sign-in URL
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: Clerk sign-up URL

## 🛡️ Security

### Authentication
- Clerk is used for authentication
- Sensitive operations require user authentication
- All mutations must be protected

### Data Protection
- Use RLS (Row Level Security) in Supabase
- Validate all inputs in server actions
- Never expose secrets in client-side code

## 🧪 Testing Guidelines

### Unit Testing
- Use Jest and React Testing Library
- Create tests in `__tests__/` directory
- Mock external dependencies

### Integration Testing
- Use Playwright for end-to-end tests
- Create tests in `integration-tests/` directory
- Test critical user flows

## 📝 Documentation

### Code Comments
- Document complex logic
- Explain non-obvious code
- Use JSDoc for public APIs

### Commit Messages
- Follow Conventional Commits format
- Keep messages concise and descriptive
- Use imperative mood

## 💡 Performance

### Optimization Tips
- Use React.memo for expensive components
- Implement lazy loading for large components
- Optimize images with Next.js Image component
- Use server actions for data fetching

### Performance Metrics
- Target Lighthouse score of 90+
- Load time under 2 seconds
- 60fps animations

## 🎨 Design System

### Color Palette
Primary colors:
- Blue: #2563eb (Primary button)
- Gray: #4b5563 (Secondary text)
- White: #ffffff (Background)

Accent colors:
- Indigo: #4f46e5 (Links)
- Emerald: #10b981 (Success)
- Red: #ef4444 (Error)

### Typography
- Font family: Inter
- Base size: 16px
- Line height: 1.6

### Spacing
- Use Tailwind spacing system
- Consistent padding and margins
- 4px increment system

## 🚀 Git Guidelines

### Branch Naming
- `feature/` for new features
- `fix/` for bug fixes
- `chore/` for maintenance
- `docs/` for documentation

### Commit Guidelines
```bash
feat: Add new feature
fix: Fix bug in authentication
docs: Update README
```

### Pull Requests
- Clear title and description
- Link to related issues
- Include screenshots/GIFs for UI changes
- Request review from at least one other developer

## 📝 Code Review Checklist

### Before Submitting PR
- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] Code follows TypeScript best practices
- [ ] Security requirements are met
- [ ] Performance is optimized
- [ ] Accessibility requirements are met
- [ ] Code is well-documented
- [ ] Commit messages are clear
- [ ] No console.logs left in production code

### When Reviewing PR
- [ ] Check for logic errors
- [ ] Verify security best practices
- [ ] Ensure performance is adequate
- [ ] Check accessibility
- [ ] Verify code follows project standards
- [ ] Check for proper error handling
- [ ] Verify tests are sufficient
- [ ] Check for documentation completeness
