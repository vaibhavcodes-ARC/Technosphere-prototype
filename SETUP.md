# Technosphere 2026 - Complete Setup Guide

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud)
- Git
- Code editor (VS Code recommended)

---

## Installation Steps

### 1. Clone/Navigate to Project
```bash
cd d:/Projects/Technosphere
```

### 2. Install Root Dependencies
```bash
npm install
```

### 3. Install Server Dependencies
```bash
cd server
npm install
```

### 4. Install Client Dependencies
```bash
cd ../client
npm install
```

---

## Environment Configuration

### Server Configuration (.env)
Create `server/.env`:

```env
# Server Port
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/technosphere
# For MongoCloud: mongodb+srv://user:password@cluster.mongodb.net/technosphere

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email Service (Mailtrap for development)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_password

# Email From Address
EMAIL_FROM=noreply@technosphere.edu

# Optional: Cloudinary for Image Uploads
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Client Configuration (Vite)
The client is already configured in `client/vite.config.js` to proxy API calls to `http://localhost:5000`.

---

## Running the Application

### Option 1: Run Everything (from root)
```bash
npm run dev
# This runs both server and client in watch mode
```

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Starts on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Starts on http://localhost:5173
```

---

## First Time Setup

### Step 1: Start Application
```bash
npm run dev
```

### Step 2: Create First Admin Account
1. Open browser to `http://localhost:5173/admin/register`
2. Fill in registration form:
   - **Name:** Your name
   - **Email:** yourname@nsuniv.ac.in (IMPORTANT: must end with @nsuniv.ac.in)
   - **Phone:** Your phone number
   - **Password:** At least 6 characters
   - **Confirm Password:** Repeat password
3. Click "Register"
4. Check email for OTP (in development, check Mailtrap)
5. Enter OTP on the verification page
6. **Save your Admin Code** (10 characters) - this is critical!

### Step 3: Admin Login
1. Navigate to `http://localhost:5173/admin/login`
2. Enter your 10-character Admin Code
3. Click "Login"

### Step 4: Start Managing Content
- Access `/admin/dashboard`
- Navigate to different sections to edit content
- Make changes in real-time
- Changes immediately reflect on the website

---

## Available Endpoints

### Frontend URLs
| URL | Purpose |
|-----|---------|
| `http://localhost:5173` | Student homepage |
| `http://localhost:5173/admin/register` | Admin registration |
| `http://localhost:5173/admin/login` | Admin login |
| `http://localhost:5173/admin/dashboard` | Admin dashboard |
| `http://localhost:5173/admin/hero` | Edit hero section |
| `http://localhost:5173/admin/about` | Edit about us |
| `http://localhost:5173/admin/sponsors` | Manage sponsors |

### Backend API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/cms-auth/register` | Register admin |
| POST | `/api/cms-auth/verify-otp` | Verify OTP |
| POST | `/api/cms-auth/login` | Admin login |
| GET | `/api/cms/hero` | Get hero section |
| PUT | `/api/cms/hero` | Update hero section |
| GET | `/api/cms/sponsors` | Get all sponsors |
| POST | `/api/cms/sponsors` | Create sponsor |
| GET | `/api/cms/faqs` | Get FAQs |
| GET | `/api/cms/contacts` | Get contacts |
| GET | `/api/cms/organizers` | Get organizers |

---

## Database Seeding (Optional)

### Create Default Content
```bash
# From server directory
node seedEvents.js
```

This creates default events in the database.

---

## Email Configuration

### For Development (Mailtrap)
1. Go to https://mailtrap.io
2. Sign up for free account
3. Create new inbox
4. Copy credentials to `.env`
5. Check inbox in Mailtrap for test emails

### For Production
```env
EMAIL_HOST=your_smtp_server
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

---

## How to Create/Edit Content

### Example: Edit Hero Section
1. Login to admin panel (`/admin/login`)
2. Click "Hero Section" from dashboard
3. Edit:
   - Title (e.g., "Technosphere 2026")
   - Subtitle (e.g., "The Ultimate Tech Fest")
   - Background image URL
   - Hero buttons (add/remove/edit)
4. Click "Save Changes"
5. Changes instantly appear on homepage

### Example: Add a Sponsor
1. From dashboard, click "Sponsors"
2. Click "Add Sponsor" button
3. Fill sponsor details:
   - Name
   - Category (Diamond/Platinum/Gold/Silver/Bronze)
   - Logo URL
   - Website link
   - Contact email/phone
4. Click "Save"
5. Sponsor appears on website immediately

### Example: Add FAQ
1. Click "FAQs" from dashboard
2. Click "Add FAQ"
3. Enter question and answer
4. Set category
5. Toggle visibility
6. Save

---

## Common Issues & Solutions

### Issue: "Only @nsuniv.ac.in emails are allowed"
**Solution:** Use an email ending with @nsuniv.ac.in
- ✅ correct: `student@nsuniv.ac.in`
- ❌ wrong: `student@gmail.com`

### Issue: OTP not received
**Solution:** 
- Check Mailtrap inbox (development)
- Check spam folder
- Try "Resend OTP" button
- Verify EMAIL settings in `.env`

### Issue: Admin code not working
**Solution:**
- Ensure code is UPPERCASE
- Code must be exactly 10 characters
- Email must have been verified first
- Try logging out and in again

### Issue: MongoDB Connection Error
**Solution:**
- Ensure MongoDB is running locally: `mongod`
- Or update `MONGODB_URI` to MongoDB cloud URL
- Check connection string syntax

### Issue: CORS Error
**Solution:**
- Ensure server is running on port 5000
- Check CORS configuration in `server/index.js`
- Clear browser cache and try again

### Issue: Changes not showing on website
**Solution:**
- Hard refresh browser (Ctrl+Shift+R)
- Clear cache in browser DevTools
- Verify API request succeeded (check Network tab)
- Check browser console for errors

---

## Project Structure

```
Technosphere/
├── server/
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, error handling
│   ├── utils/           # Utilities (email, tokens)
│   ├── config/          # Database config
│   ├── uploads/         # File uploads
│   └── index.js         # Main server file
│
├── client/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Auth context
│   │   ├── utils/       # Helper functions
│   │   └── App.jsx      # Main app component
│   └── vite.config.js   # Vite configuration
│
└── package.json
```

---

## Building for Production

### Backend Build
```bash
cd server
NODE_ENV=production npm start
```

### Frontend Build
```bash
cd client
npm run build
# Creates optimized build in client/dist
```

---

## Testing the Admin Panel

### Quick Test Checklist

- [ ] Register admin account with @nsuniv.ac.in email
- [ ] Receive and verify OTP
- [ ] Login with admin code
- [ ] Access admin dashboard
- [ ] Edit hero section
- [ ] Add a new FAQ
- [ ] Add a sponsor
- [ ] Changes appear on website
- [ ] Logout successfully
- [ ] Cannot access admin routes without login

---

## API Testing (Using cURL or Postman)

### Register Admin
```bash
curl -X POST http://localhost:5000/api/cms-auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@nsuniv.ac.in",
    "phone": "9999999999",
    "password": "password123"
  }'
```

### Verify OTP
```bash
curl -X POST http://localhost:5000/api/cms-auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "adminId": "64a1b2c3d4e5f6g7h8i9j0k1",
    "otp": "123456"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/cms-auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "adminCode": "ABCD1234EF"
  }'
```

### Get Hero Section
```bash
curl -X GET http://localhost:5000/api/cms/hero
```

### Update Hero Section
```bash
curl -X PUT http://localhost:5000/api/cms/hero \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "New Title",
    "subtitle": "New Subtitle"
  }'
```

---

## Support & Resources

### Documentation Files
- `CMS_ADMIN_DOCUMENTATION.md` - Full CMS documentation
- `SETUP.md` - Setup guide (this file)

### Backend Files
- `server/models/` - Database schema definitions
- `server/controllers/cmsContentController.js` - Content management logic
- `server/controllers/cmsAuthController.js` - Authentication logic

### Frontend Files
- `client/src/pages/AdminRegister.jsx` - Admin registration page
- `client/src/pages/AdminLogin.jsx` - Admin login page
- `client/src/pages/admin/AdminMainDashboard.jsx` - Main dashboard

---

## Next Steps

1. ✅ Complete setup following this guide
2. ✅ Create admin account
3. ✅ Test editing content
4. ✅ Create student accounts and test student features
5. ✅ Add more content management pages (following existing patterns)
6. ✅ Configure Cloudinary for image uploads
7. ✅ Deploy to production

---

## Deployment Checklist

- [ ] Change JWT_SECRET to secure random string
- [ ] Set MongoDB_URI to production database
- [ ] Configure email service for production
- [ ] Add Cloudinary credentials
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Setup error monitoring (Sentry)
- [ ] Configure backup strategy
- [ ] Setup CI/CD pipeline

---

For issues or questions, refer to CMS_ADMIN_DOCUMENTATION.md or check browser console for detailed error messages.

**Last Updated:** March 29, 2026
**Technosphere 2026 - Netaji Subhas University**
