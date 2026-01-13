# CLAUDE.md - AI Assistant Guide for wolf-bites

**Last Updated:** 2026-01-13
**Repository:** wolf-bites

## Project Overview

This document serves as a comprehensive guide for AI assistants working on the wolf-bites codebase. It documents the project structure, development workflows, coding conventions, and best practices.

## Repository Status

**Note:** This repository is currently in initial setup phase. This document will be updated as the codebase evolves.

---

## Table of Contents

1. [Codebase Structure](#codebase-structure)
2. [Technology Stack](#technology-stack)
3. [Development Workflow](#development-workflow)
4. [Coding Conventions](#coding-conventions)
5. [Git Practices](#git-practices)
6. [Testing Guidelines](#testing-guidelines)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## Codebase Structure

### Expected Directory Layout

```
wolf-bites/
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components/routes
│   ├── services/          # Business logic and API services
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── hooks/             # Custom React hooks (if React)
│   ├── config/            # Configuration files
│   └── assets/            # Static assets (images, fonts, etc.)
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── docs/                  # Documentation
├── scripts/               # Build and deployment scripts
├── public/                # Public static files
├── .github/               # GitHub Actions and templates
│   └── workflows/        # CI/CD workflows
├── package.json           # Node.js dependencies
├── tsconfig.json          # TypeScript configuration
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore patterns
├── README.md             # Project README
└── CLAUDE.md             # This file

```

### Key Directories Explained

- **`src/`**: All application source code
- **`tests/`**: Test suites organized by type
- **`docs/`**: Additional documentation and guides
- **`scripts/`**: Automation and utility scripts
- **`public/`**: Publicly accessible static assets

---

## Technology Stack

### Expected Core Technologies

Update this section once the stack is determined:

- **Frontend Framework**: [TBD - React, Vue, Next.js, etc.]
- **Backend Framework**: [TBD - Express, Fastify, NestJS, etc.]
- **Language**: [TBD - TypeScript, JavaScript, Python, etc.]
- **Database**: [TBD - PostgreSQL, MongoDB, MySQL, etc.]
- **Testing**: [TBD - Jest, Vitest, Pytest, etc.]
- **Build Tools**: [TBD - Vite, Webpack, esbuild, etc.]
- **Package Manager**: [TBD - npm, yarn, pnpm, etc.]

### Development Tools

- **Version Control**: Git
- **Code Quality**: ESLint, Prettier (expected)
- **Type Checking**: TypeScript (expected)
- **CI/CD**: GitHub Actions (expected)

---

## Development Workflow

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd wolf-bites

# Install dependencies
npm install  # or yarn install / pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Branch Strategy

- **Main Branch**: `main` (or `master`) - production-ready code
- **Feature Branches**: `claude/[feature-name]-[session-id]` - AI assistant work
- **Development Branches**: `dev/[feature-name]` - developer work
- **Hotfix Branches**: `hotfix/[issue-description]` - urgent fixes

### Development Cycle

1. **Create a feature branch** from the designated base branch
2. **Make changes** following coding conventions
3. **Write tests** for new functionality
4. **Run tests** and ensure they pass
5. **Commit changes** with clear messages
6. **Push to remote** branch
7. **Create pull request** for review

---

## Coding Conventions

### General Principles

1. **Keep it simple**: Avoid over-engineering
2. **DRY (Don't Repeat Yourself)**: Extract repeated logic
3. **Single Responsibility**: Each function/module does one thing well
4. **Consistent naming**: Use clear, descriptive names
5. **Type safety**: Use TypeScript types effectively

### Naming Conventions

- **Files**: kebab-case (e.g., `user-service.ts`)
- **Directories**: kebab-case (e.g., `api-routes/`)
- **Classes**: PascalCase (e.g., `UserController`)
- **Functions/Methods**: camelCase (e.g., `getUserById()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Interfaces/Types**: PascalCase with descriptive names (e.g., `UserProfile`)

### Code Style

```typescript
// Use async/await instead of promises when possible
async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

// Destructure for cleaner code
const { name, email, role } = user;

// Use early returns to reduce nesting
function processUser(user: User | null): string {
  if (!user) return 'No user found';
  if (!user.isActive) return 'User inactive';
  return `Processing ${user.name}`;
}

// Prefer const over let, avoid var
const maxAttempts = 3;
let currentAttempt = 0;
```

### Comments and Documentation

- **Add comments for complex logic**: Explain the "why", not the "what"
- **Document public APIs**: Use JSDoc for functions that will be used elsewhere
- **Keep comments updated**: Remove outdated comments
- **Avoid obvious comments**: Code should be self-documenting when possible

```typescript
/**
 * Calculates the discounted price based on user tier
 * @param basePrice - Original price in cents
 * @param userTier - User's membership tier
 * @returns Discounted price in cents
 */
function calculateDiscount(basePrice: number, userTier: string): number {
  // Business rule: Premium users get 20% off, standard users get 10%
  const discountRate = userTier === 'premium' ? 0.2 : 0.1;
  return Math.floor(basePrice * (1 - discountRate));
}
```

---

## Git Practices

### Commit Messages

Follow the conventional commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add JWT token refresh mechanism
fix(api): handle null response in user fetch
docs: update API documentation for v2 endpoints
refactor(utils): simplify date formatting logic
test(auth): add tests for login flow
```

### Commit Best Practices

1. **Atomic commits**: Each commit should represent one logical change
2. **Clear messages**: Write descriptive commit messages
3. **Test before commit**: Ensure tests pass before committing
4. **No secrets**: Never commit sensitive data (.env files, keys, passwords)

### Push Protocol

```bash
# Always push to the designated feature branch
git push -u origin claude/[branch-name]

# Verify the branch name matches the session requirements
# Format: claude/[description]-[session-id]
```

---

## Testing Guidelines

### Test Structure

```typescript
describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when valid ID is provided', async () => {
      // Arrange
      const userId = '123';
      const expectedUser = { id: userId, name: 'John' };

      // Act
      const result = await userService.getUserById(userId);

      // Assert
      expect(result).toEqual(expectedUser);
    });

    it('should throw error when user not found', async () => {
      // Arrange
      const invalidId = 'invalid';

      // Act & Assert
      await expect(userService.getUserById(invalidId))
        .rejects.toThrow('User not found');
    });
  });
});
```

### Testing Best Practices

1. **Test behavior, not implementation**: Focus on what the code does, not how
2. **Use descriptive test names**: Test name should explain what is being tested
3. **AAA Pattern**: Arrange, Act, Assert
4. **Test edge cases**: Null values, empty arrays, boundary conditions
5. **Mock external dependencies**: Keep tests isolated and fast
6. **One assertion per test**: Makes failures easier to diagnose

### Test Coverage Goals

- **Critical paths**: 100% coverage for authentication, payments, data validation
- **Business logic**: 90%+ coverage
- **UI components**: 70%+ coverage
- **Utilities**: 90%+ coverage

---

## Common Tasks

### Adding a New Feature

1. Create a feature branch: `git checkout -b claude/feature-name-[session-id]`
2. Analyze existing patterns in the codebase
3. Implement the feature following conventions
4. Write tests for the new functionality
5. Update documentation if needed
6. Commit with clear message: `feat(scope): description`
7. Push and create pull request

### Fixing a Bug

1. Reproduce the bug
2. Write a failing test that demonstrates the bug
3. Fix the issue
4. Verify the test now passes
5. Check for similar issues elsewhere
6. Commit with clear message: `fix(scope): description`

### Refactoring Code

1. Ensure existing tests pass
2. Make small, incremental changes
3. Run tests after each change
4. Update tests if behavior changes
5. Commit frequently with descriptive messages

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update [package-name]

# Update all packages (carefully!)
npm update

# Verify tests still pass
npm test

# Check for breaking changes in changelogs
```

---

## Security Best Practices

### Input Validation

- **Never trust user input**: Always validate and sanitize
- **Use schema validation**: Tools like Zod, Joi, or Yup
- **Type checking**: TypeScript types are not runtime validation

### Authentication & Authorization

- **Never store passwords in plain text**: Use bcrypt or argon2
- **Use secure session management**: HTTP-only cookies, CSRF tokens
- **Implement proper access control**: Check permissions on every request
- **Rate limiting**: Protect against brute force attacks

### Sensitive Data

- **Environment variables**: Use .env files (never commit them)
- **API keys**: Rotate regularly, use service accounts
- **Encryption**: Encrypt sensitive data at rest and in transit
- **Logging**: Never log passwords, tokens, or PII

### Common Vulnerabilities to Avoid

- **SQL Injection**: Use parameterized queries or ORM
- **XSS (Cross-Site Scripting)**: Sanitize user input, use CSP headers
- **CSRF**: Use CSRF tokens for state-changing operations
- **Command Injection**: Never pass user input directly to shell commands
- **Path Traversal**: Validate file paths, use allowlists

---

## Performance Considerations

### General Guidelines

1. **Lazy loading**: Load resources only when needed
2. **Caching**: Cache expensive operations and API responses
3. **Database queries**: Use indexes, avoid N+1 queries
4. **Bundle size**: Code split and tree shake
5. **Image optimization**: Compress and serve appropriate formats

### Monitoring

- Track response times for API endpoints
- Monitor database query performance
- Set up alerts for error rates
- Use performance profiling tools

---

## Troubleshooting

### Common Issues

#### Tests Failing
```bash
# Clear test cache
npm test -- --clearCache

# Run tests in watch mode for debugging
npm test -- --watch

# Run specific test file
npm test -- path/to/test.spec.ts
```

#### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear build cache
npm run clean  # if available
```

#### Type Errors
```bash
# Regenerate TypeScript declarations
npm run build:types  # if available

# Check TypeScript configuration
npx tsc --showConfig
```

### Debug Strategies

1. **Use logging**: Add strategic console.logs or use a logger
2. **Debugger**: Use VS Code debugger or browser dev tools
3. **Isolate the problem**: Reproduce in minimal example
4. **Check recent changes**: Use git diff to see what changed
5. **Search for similar issues**: Check GitHub issues, Stack Overflow

---

## AI Assistant Specific Guidelines

### When Working on This Codebase

1. **Always read before modifying**: Never propose changes to unread code
2. **Follow existing patterns**: Maintain consistency with the codebase
3. **Use TodoWrite tool**: Track multi-step tasks for transparency
4. **Run tests**: Verify changes don't break existing functionality
5. **Security first**: Watch for vulnerabilities (XSS, SQL injection, etc.)
6. **Keep changes focused**: Don't refactor unrelated code
7. **No over-engineering**: Add only what's requested or clearly necessary

### Tool Usage Priorities

1. **Read** before Edit or Write
2. **Glob/Grep** for finding files and code
3. **Task tool** for complex exploration or multi-step operations
4. **Parallel execution** when operations are independent
5. **Sequential execution** when operations depend on each other

### Communication Style

- Be concise and technical
- Focus on facts over validation
- Use file paths with line numbers when referencing code
- Explain trade-offs when making architectural decisions
- Ask clarifying questions when requirements are ambiguous

---

## Resources

### Documentation Links

- [Project README](README.md) - *(to be created)*
- [API Documentation](docs/api.md) - *(to be created)*
- [Architecture Guide](docs/architecture.md) - *(to be created)*

### External References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

## Maintenance

This document should be updated whenever:

- Project structure changes significantly
- New technologies are adopted
- Development workflows are modified
- New conventions are established
- Common issues and solutions are discovered

**Responsibility**: AI assistants and developers should update this document as part of their work when relevant changes are made.

---

## Version History

| Date       | Changes                                      | Updated By |
|------------|---------------------------------------------|------------|
| 2026-01-13 | Initial creation of comprehensive template  | Claude AI  |

---

**Note**: This document is a living guide and should evolve with the project. If you notice outdated information or have suggestions for improvements, please update this file or notify the team.
