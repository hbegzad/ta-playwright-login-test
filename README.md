# Playwright Login Test Demo

Automated UI testing for the Login features of a web application using [Playwright](https://playwright.dev/).

## Precondition

**GitHub**

- Sign up for an account (if does not have one)
- Create the repository

**SSH access**

```bash
# Generate a new SSH key locally
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519_github

# Add this SSH key to the ssh-agent:
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_github

# Add the public key to GitHub account:
Settings => SSH and GPG keys: https://github.com/settings/keys

# Create or edit SSH config file, specify which SSH key will be used for GitHub
Host github.com:username
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes

# Clone repository using custom host:
git clone git@github.com:username/repo-name.git

#Configure Git user settings:
cd repo-name
git config user.name "Your Name"
git config user.email "your_email@example.com"

# Commit first change
echo "# first-test-commit" >> README.md
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com-gh:username/repo-name.git
git push -u origin main
```

## Initialize the project

```bash
# Initialize the project for Playwright, choose default options
npm init playwright@latest
npm install --save-dev @playwright/test
npx playwright install

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Commit the changes to GitHub.
git add .
git commit -m "TICKET-NUMBER: initialized for Playwright"
git push origin main
```

## Environment Setup

```bash
# Copy environment template, edit .env.local with credentials
cp .env.example .env.local
```

### Environment Files

| File | Purpose |
|------|---------|
| `.env.staging` | Staging environment config |
| `.env.development` | Development environment config |
| `.env.local` | Local credentials (not committed) |

### Required Variables

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Target application URL |
| `TEST_USER_USERNAME` | Test username |
| `TEST_USER_PASSWORD` | Test password |

## Running Tests

```bash
npm run test                 # All tests
npm run test:login           # Login tests only
npm run test:chromium        # Chromium only
npm run test:headed          # Visible browser
npm run test:ui              # Playwright UI mode
```

## CI/CD Configuration

### GitHub Actions

**Create environments** (Project Settings => Environments )
- `development`
- `staging`

**Setup secrets** (Project Settings => Environment => Add Environment Secrets):
- `TEST_USER_USERNAME`
- `TEST_USER_PASSWORD`

**Setup variables** (Project Settings => Environment => Add Environment Variables):
- `BASE_URL`

**Jobs:**
- `lint` - Runs automatically on push/PR
- `test-staging` - Runs automatically on push/PR, after lint, parallel with test-development
- `test-development` - Runs automatically on push/PR, after lint, parallel with test-staging

## Project Structure

```
├── .github/workflows/
│   └── playwright.yml      # GitHub Actions
├── pages/
│   └── login.page.ts       # Login Page Object
├── reports/
│   └── html                # Test reports
├── tests/
│   └── login.spec.ts       # Login test cases
├── .env.*                  # Environment files
├── eslint.config.mjs       # Playwright linter config
├── package.json
├── playwright.config.ts    # Playwright config
├── README.md               # This file
└── tsconfig.json
```

## Test Cases

| Test | Description |
|------|-------------|
| Successful Login | Valid credentials login |
| Invalid Credentials | Error for wrong username/password |
| Empty Fields | Error for empty form submission |
| Forgot Password | Navigate to forgot password page |

## Troubleshooting

**Credentials not working:** Verify `TEST_USER_USERNAME` and `TEST_USER_PASSWORD` in `.env.local`

**Browser issues:** Run `npx playwright install --force`

## License

ISC
