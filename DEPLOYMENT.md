# AfriWallet Deployment to Netlify

## Quick Deploy Options

### Option 1: Netlify Drop (Drag & Drop)
1. Visit [netlify.com](https://www.netlify.com)
2. Sign up/Login with your GitHub account
3. Go to "Sites" section
4. Drag and drop the `dist` folder to the deploy area
5. Your site will be live instantly!

### Option 2: GitHub Integration (Recommended)
1. Visit [netlify.com](https://www.netlify.com)
2. Click "New site from Git"
3. Choose GitHub and authorize Netlify
4. Select this repository: `AfriWallet`
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
6. Click "Deploy site"

### Option 3: Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

## Pre-deployment Checklist ✅

- [x] Build successful (`npm run build`)
- [x] All routing issues fixed
- [x] NotificationProvider added
- [x] Icon imports corrected
- [x] `_redirects` file created for SPA routing
- [x] `netlify.toml` configuration file created
- [x] Git repository committed and pushed

## Environment Variables (if needed)
If your app requires environment variables, add them in Netlify:
1. Go to Site settings
2. Build & deploy
3. Environment variables
4. Add variables as needed

## Custom Domain (Optional)
After deployment, you can:
1. Go to Site settings
2. Domain management
3. Add custom domain

Your AfriWallet app is ready for deployment! 🚀
