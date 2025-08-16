# NextAuth Setup Guide

This guide will help you complete the NextAuth setup with Google OAuth and Prisma integration.

## 🚀 Quick Setup

### 1. Install Required Dependencies

```bash
npm install next-auth @auth/prisma-adapter bcryptjs zod react-icons
npm install -D @types/bcryptjs
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 3. Update Environment Variables

Replace the placeholder values in your `.env` file:

```env
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-at-least-32-characters-long"

# Google OAuth Configuration  
GOOGLE_CLIENT_ID="your-google-client-id-from-console"
GOOGLE_CLIENT_SECRET="your-google-client-secret-from-console"
```

### 4. Database Migration

Run the following commands to update your database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Run setup script for sample data
npx tsx scripts/setup-database.ts
```

## 🔧 Features Implemented

### ✅ Authentication Methods
- **Email/Password**: Traditional registration and login
- **Google OAuth**: One-click sign-in with Google
- **Role-based**: Automatic student/instructor profile creation

### ✅ Database Integration
- **Prisma Adapter**: Full NextAuth integration with your database
- **User Profiles**: Automatic profile creation based on role
- **Password Hashing**: Secure bcrypt password hashing
- **Session Management**: JWT-based sessions

### ✅ UI Components
- **Updated Signup Page**: Includes Google authentication button
- **Updated Signin Page**: Includes Google authentication button  
- **Error Handling**: Comprehensive error messages
- **Loading States**: Proper loading indicators

## 🎯 How It Works

### Registration Flow
1. **Email/Password**: Creates user → hashes password → creates role-specific profile
2. **Google OAuth**: Creates user → uses Google profile data → creates student profile by default

### Authentication Flow
1. **Credentials**: Validates email/password against database
2. **Google**: Validates with Google → creates/updates user record
3. **Session**: Creates JWT token with user data and role

### Database Schema
The schema includes all NextAuth required tables:
- `accounts` - OAuth account linking
- `sessions` - Session management  
- `verification_tokens` - Email verification
- `users` - Enhanced with password field and profiles

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **CSRF Protection**: Built-in NextAuth CSRF protection
- **Secure Sessions**: HTTP-only cookies in production
- **Role-based Access**: User roles stored in JWT
- **Input Validation**: Zod schema validation

## 🚀 Usage Examples

### In Components
```tsx
import { useAuth } from "@/contexts/auth-context"

function MyComponent() {
  const { user, login, logout, loginWithGoogle } = useAuth()
  
  if (!user) {
    return <button onClick={() => loginWithGoogle()}>Sign in with Google</button>
  }
  
  return <div>Welcome {user.name}!</div>
}
```

### In API Routes
```tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }
  
  // User is authenticated
  return Response.json({ user: session.user })
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Google OAuth not working**
   - Check redirect URIs in Google Console
   - Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
   - Ensure NEXTAUTH_URL matches your domain

2. **Database connection issues**
   - Verify DATABASE_URL is correct
   - Run `npx prisma db push` to sync schema
   - Check if Supabase project is active

3. **Session not persisting**
   - Verify NEXTAUTH_SECRET is set
   - Check if cookies are being blocked
   - Ensure NEXTAUTH_URL is correct

### Debug Mode
Add this to your `.env` for detailed logs:
```env
NEXTAUTH_DEBUG=true
```

## 🎉 You're Ready!

Your authentication system now supports:
- ✅ Email/password registration and login
- ✅ Google OAuth authentication  
- ✅ Role-based user profiles
- ✅ Secure session management
- ✅ Database integration with Prisma

Start your development server and test the authentication flow!

```bash
npm run dev
```

Visit `http://localhost:3000/auth/signin` to test the authentication.