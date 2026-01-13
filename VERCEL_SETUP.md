# Vercel Setup Guide

This guide explains how to connect your wolf-bites repository to Vercel for automatic deployments.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository pushed to GitHub (or GitLab/Bitbucket)
- Vercel CLI installed (already done via `npm install -g vercel`)

## Method 1: Vercel Web Dashboard (Recommended)

This is the easiest method for first-time setup:

### Steps:

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select `rebeccaplanch/wolf-bites`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Environment Variables** (if needed)
   - Click "Environment Variables"
   - Add any required variables (e.g., API keys, database URLs)
   - Click "Add" for each variable

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (2-5 minutes)
   - Your site will be live at `https://wolf-bites-[random].vercel.app`

6. **Custom Domain** (optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Method 2: Vercel CLI

For command-line enthusiasts or CI/CD integration:

### Steps:

1. **Login to Vercel**
   ```bash
   vercel login
   ```
   - Follow the prompts to authenticate
   - You'll receive an email with a verification link

2. **Link Your Project**
   ```bash
   cd /home/user/wolf-bites
   vercel link
   ```
   - Select your Vercel scope (personal or team)
   - Choose to link to an existing project or create new
   - Confirm the settings

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```
   - This will build and deploy your project
   - You'll receive a production URL

4. **Deploy to Preview** (for testing)
   ```bash
   vercel
   ```
   - This creates a preview deployment
   - Useful for testing before production

## Automatic Deployments

Once connected, Vercel will automatically:

- **Deploy on every push** to your main branch (production)
- **Create preview deployments** for pull requests
- **Deploy feature branches** matching the pattern `claude/*` (configured in vercel.json)

### Branch Deployment Configuration

Your `vercel.json` is configured to deploy:
- `main` branch → Production
- `claude/*` branches → Preview deployments

## Vercel Configuration

The `vercel.json` file controls deployment settings:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "git": {
    "deploymentEnabled": {
      "main": true,
      "claude/*": true
    }
  }
}
```

## Environment Variables

### Local Development
Create a `.env.local` file (not tracked by git):
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://...
API_SECRET_KEY=your-secret-key
```

### Vercel Environment Variables
Add via dashboard or CLI:

**Dashboard:**
- Project Settings → Environment Variables → Add

**CLI:**
```bash
vercel env add SECRET_NAME
```

### Environment Types:
- **Production**: Used for production deployments
- **Preview**: Used for preview deployments (PRs, feature branches)
- **Development**: Used for local development with `vercel dev`

## Monitoring & Logs

### View Logs
```bash
# Recent deployment logs
vercel logs [deployment-url]

# Real-time logs
vercel logs [deployment-url] --follow
```

### Analytics
- Visit your project dashboard at `vercel.com/[your-name]/wolf-bites`
- View Analytics tab for traffic, performance, and Web Vitals

## Domains

### Add Custom Domain
```bash
vercel domains add yourdomain.com
```

### Configure DNS
Add these records to your DNS provider:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Test locally**:
   ```bash
   npm run build
   ```
3. **Common issues**:
   - Missing dependencies in package.json
   - TypeScript errors
   - Environment variables not set

### Deployment Not Triggering

1. **Check Git integration** in Project Settings
2. **Verify branch patterns** in vercel.json
3. **Manual trigger**:
   ```bash
   vercel --prod
   ```

### Environment Variables Not Working

1. **Verify variable names** (must start with `NEXT_PUBLIC_` for client-side)
2. **Check environment** (Production/Preview/Development)
3. **Redeploy** after adding variables

## Advanced Configuration

### Custom Build Output
```json
{
  "buildCommand": "npm run build:custom",
  "outputDirectory": "dist"
}
```

### Redirects & Rewrites
Add to `next.config.js`:
```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
};
```

### Headers
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

## CI/CD Integration

### GitHub Actions
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- [CLI Reference](https://vercel.com/docs/cli)

## Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Status**: [vercel-status.com](https://www.vercel-status.com)

---

**Next Steps:**
1. Choose a connection method (Web Dashboard or CLI)
2. Follow the steps above to link your repository
3. Push your code and watch it deploy automatically!
