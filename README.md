# Ideal Bet - Update Package

Hey! This package contains the Google Authentication update for our project. Here's what you need to know:

## What's Included

- Google Authentication setup (using NextAuth.js)
- New components with auth state
- Updated pages with protected routes

## Quick Setup

1. **Copy These Files First:**
   ```
   app/
   ├── auth/[...nextauth]/        # Auth configuration
   ├── api/auth/[...nextauth]/    # Auth API routes
   ├── components/                # Updated components
   └── providers.tsx             # Auth provider wrapper
   ```

2. **Set Up Environment Variables:**
   Create `.env.local` with:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ```

## How the Auth Works

1. **Google OAuth Setup:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a project
   - Enable Google+ API
   - Get OAuth credentials
   - Add these redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     http://localhost:3000/api/auth/signin/google
     ```

2. **Auth Flow:**
   - User clicks "Sign In"
   - Gets redirected to Google
   - Google sends them back with a code
   - NextAuth handles the rest automatically!

3. **Protected Routes:**
   - Add this to any page you want to protect:
   ```typescript
   import { getAuthSession } from "@/app/auth/[...nextauth]/auth";

   export default async function ProtectedPage() {
     const session = await getAuthSession();
     if (!session) redirect("/auth/signin");
     // ... rest of your page
   }
   ```

## Need Help?

1. If Google sign-in isn't working:
   - Double-check your `.env.local` values
   - Make sure redirect URIs match exactly
   - Verify you copied all auth files

2. If pages aren't protecting properly:
   - Check that `providers.tsx` is in your app root
   - Verify you're using `getAuthSession()`
   - Make sure NextAuth is configured in `next.config.js`

That's it! The auth system is pretty simple once it's set up. Just copy the files, set up your Google credentials, and you're good to go! 🎉

## Contents

1. **Authentication Implementation**
   - NextAuth.js configuration
   - Google OAuth setup
   - Protected routes
   - User session management

2. **New Pages**
   - Sports Betting Information
   - Gambling Helpline
   - Contact Page with Video Sections

3. **Updated Components**
   - Header with authentication state
   - Footer
   - Gambling Helpline component

## Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Google Cloud Platform account for OAuth credentials

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Environment Setup**
   Create a `.env.local` file in the root directory with:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ```

3. **Google OAuth Setup**
   - Go to Google Cloud Console
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - http://localhost:3000/api/auth/callback/google
     - http://localhost:3000/api/auth/signin/google

4. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## File Structure

```
app/
├── auth/                    # Authentication routes
├── api/                     # API routes
├── components/              # React components
├── information/             # Sports betting info page
├── helpline/                # Gambling helpline page
├── contact/                 # Contact page
├── providers.tsx           # Auth providers
└── layout.tsx              # Root layout
```

## Key Changes

### Authentication
- Implemented NextAuth.js for authentication
- Added Google OAuth provider
- Created protected routes
- Added session management

### New Pages
1. **Sports Betting Information**
   - Money-Line Bet
   - Over/Under Bet
   - Spread Bet
   - Team vs Team betting information

2. **Gambling Helpline**
   - Support information
   - Contact details
   - Resources for help

3. **Contact Page**
   - Video sections
   - Use cases
   - Feature highlights

### Components
- Updated header with auth state
- Added footer component
- Created gambling helpline component
- Added video components

## Dependencies Added
- next-auth: ^4.24.5
- framer-motion: ^11.0.3

## Notes
- All authentication routes are protected
- Session management is handled automatically
- Video sections require proper video files in public/videos
- Environment variables must be properly configured
- Google OAuth credentials must be valid

## Troubleshooting

1. **Authentication Issues**
   - Verify Google OAuth credentials
   - Check environment variables
   - Ensure correct redirect URIs

2. **Video Playback Issues**
   - Check video file paths
   - Verify video formats
   - Ensure proper file permissions

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configurations
   - Verify all dependencies are installed

## Support
For any issues or questions, please contact the development team. 