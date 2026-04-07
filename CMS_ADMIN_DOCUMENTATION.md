# Technosphere 2026 - CMS Admin Panel Documentation

## Overview

Technosphere 2026 is a **full-stack CMS platform** that allows admins to manage all website content dynamically without touching code. The system features complete separation between Student Portal and Admin Panel with distinct authentication mechanisms.

---

## Architecture

### Backend (Node.js/Express)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + OTP System
- **File Upload:** Multer (ready for Cloudinary integration)

### Frontend (React)
- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS
- **State Management:** Context API (AuthContext)
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Animations:** Framer Motion (optional)

---

## Authentication System

### Dual Authentication

#### 1. **Student Authentication**
- Traditional registration/login
- Email-based
- Access to Events, Dashboard, Team features
- Routes: `/login`, `/register`, `/dashboard`

#### 2. **CMS Admin Authentication**
- **Restricted Email Domain:** Only `@nsuniv.ac.in` emails allowed
- **Two-Step Verification:**
  1. Email + Password Registration
  2. OTP Verification (10 min expiry)
  3. Auto-generated 10-character Admin Code
- **Login:** Admin Code only (NOT email/password)
- Routes: `/admin/register`, `/admin/login`

---

## Admin Registration Flow

1. Admin registers with:
   - Name
   - Email (must end with @nsuniv.ac.in)
   - Phone
   - Password (min 6 characters)

2. OTP sent to email

3. OTP verified

4. **10-character Admin Code generated:**
   - Format: `XXXXXXXXXX` (uppercase alphanumeric)
   - Unique and non-reusable for login
   - Must be saved securely by admin

5. Admin uses Admin Code to login

---

## CMS Content Management

### 1. **Hero Section**
- ✅ Edit title and subtitle
- ✅ Upload/change background image
- ✅ Manage hero buttons with custom links
- ✅ Logo upload and link configuration
- ✅ Overlay opacity control

**Endpoint:** `/api/cms/hero` (GET/PUT)

### 2. **About Us**
- ✅ Edit main content (rich text ready)
- ✅ Mission and Vision statements
- ✅ Tagline
- ✅ Main image upload
- ✅ Multiple sections support

**Endpoint:** `/api/cms/about` (GET/PUT)

### 3. **Venue**
- ✅ Edit venue name and address
- ✅ Add Google Maps embed code
- ✅ Edit "Get Directions" link
- ✅ Store coordinates
- ✅ Contact information

**Endpoint:** `/api/cms/venue` (GET/PUT)

### 4. **Sponsors**
- ✅ Manage sponsor categories (Diamond, Platinum, Gold, Silver, Bronze)
- ✅ Add/edit/delete sponsors
- ✅ Upload sponsor logos
- ✅ Reorder sponsors
- ✅ Toggle visibility per sponsor

**Endpoints:**
- `/api/cms/sponsor-categories` (GET/POST/PUT/DELETE)
- `/api/cms/sponsors` (GET/POST/PUT/DELETE)

### 5. **FAQs**
- ✅ Add/edit/delete FAQs
- ✅ Categorize questions
- ✅ Reorder by priority
- ✅ Toggle visibility

**Endpoint:** `/api/cms/faqs` (GET/POST/PUT/DELETE)

### 6. **Contacts**
- ✅ Manage multiple contact categories:
  - Tech Enquiry
  - Event Enquiry
  - Faculty Incharge
  - Student Coordinator
- ✅ Add contact details (name, role, phone, email)
- ✅ Upload contact photos
- ✅ Reorder contacts

**Endpoint:** `/api/cms/contacts` (GET/POST/PUT/DELETE)

### 7. **Organizers**
- ✅ Manage team members by category:
  - Core Members
  - Faculty
- ✅ Upload photos
- ✅ Add social media links (LinkedIn, GitHub, Twitter, Instagram)
- ✅ Add bio information
- ✅ Reorder members

**Endpoint:** `/api/cms/organizers` (GET/POST/PUT/DELETE)

### 8. **Prizes**
- ✅ Manage prize entries by category:
  - Cash Prizes
  - Felicitations
- ✅ Add descriptions and values
- ✅ Upload prize icons/images
- ✅ Reorder prizes

**Endpoint:** `/api/cms/prizes` (GET/POST/PUT/DELETE)

### 9. **Footer**
- ✅ Edit copyright text
- ✅ Manage quick links
- ✅ Add social media links with icons
- ✅ Create footer sections
- ✅ Reorder all elements

**Endpoint:** `/api/cms/footer` (GET/PUT)

### 10. **Settings**
- ✅ Edit toll-free number
- ✅ Website metadata (name, description, keywords)
- ✅ Contact email/phone
- ✅ OTP expiry time configuration
- ✅ Admin code length configuration

**Endpoint:** `/api/cms/settings` (GET/PUT)

---

## API Endpoints Summary

### CMS Auth Routes (`/api/cms-auth`)
```
POST   /register        - Register new admin
POST   /verify-otp      - Verify OTP and get admin code
POST   /resend-otp      - Resend OTP
POST   /login           - Login with admin code
GET    /me              - Get current admin profile (Protected)
POST   /logout          - Logout admin (Protected)
```

### CMS Content Routes (`/api/cms`)
```
// Venue
GET    /venue           - Get venue details
PUT    /venue           - Update venue (Protected)

// About Us
GET    /about           - Get about section
PUT    /about           - Update about section (Protected)

// Sponsor Categories
GET    /sponsor-categories
POST   /sponsor-categories              (Protected)
PUT    /sponsor-categories/:id          (Protected)
DELETE /sponsor-categories/:id          (Protected)

// Sponsors
GET    /sponsors
GET    /sponsors/category/:categoryId
POST   /sponsors                        (Protected)
PUT    /sponsors/:id                    (Protected)
DELETE /sponsors/:id                    (Protected)

// FAQs
GET    /faqs                    - Public (visible only)
GET    /admin/faqs              - Admin only
POST   /faqs                    (Protected)
PUT    /faqs/:id                (Protected)
DELETE /faqs/:id                (Protected)

// Contacts
GET    /contacts                - Public (visible only)
GET    /admin/contacts          - Admin only
POST   /contacts                (Protected)
PUT    /contacts/:id            (Protected)
DELETE /contacts/:id            (Protected)

// Organizers
GET    /organizers              - Public (visible only)
GET    /admin/organizers        - Admin only
POST   /organizers              (Protected)
PUT    /organizers/:id          (Protected)
DELETE /organizers/:id          (Protected)

// Prizes
GET    /prizes                  - Public (visible only)
GET    /admin/prizes            - Admin only
POST   /prizes                  (Protected)
PUT    /prizes/:id              (Protected)
DELETE /prizes/:id              (Protected)

// Hero Section
GET    /hero                    - Get hero section
PUT    /hero                    (Protected)

// Footer
GET    /footer                  - Get footer
PUT    /footer                  (Protected)

// Settings
GET    /settings                - Get settings
PUT    /settings                (Protected)
```

---

## Frontend Routes

### Admin Routes (CMS)
- `/admin/register` - Admin registration page
- `/admin/login` - Admin login page
- `/admin/dashboard` - Main admin dashboard (Protected)
- `/admin/hero` - Hero section editor (Protected)
- `/admin/about` - About Us editor (Protected)
- `/admin/venue` - Venue editor (Protected)
- `/admin/sponsors` - Sponsors manager (Protected)
- `/admin/faqs` - FAQs manager (Protected)
- `/admin/contacts` - Contacts manager (Protected)
- `/admin/organizers` - Organizers manager (Protected)
- `/admin/prizes` - Prizes manager (Protected)
- `/admin/footer` - Footer editor (Protected)
- `/admin/settings` - Settings (Protected)

### Student Routes
- `/` - Home page
- `/login` - Student login
- `/register` - Student registration
- `/events` - Events listing
- `/events/:id` - Event details
- `/dashboard` - Student dashboard (Protected)
- `/team` - Team management (Protected)

---

## Database Models

### Admin Model
```javascript
{
  email: String (@nsuniv.ac.in only),
  password: String (hashed),
  adminCode: String (unique, 10-char),
  name: String,
  phone: String,
  otp: { code, expiresAt, verified },
  isActive: Boolean,
  lastLogin: Date,
  createdBy: ObjectId (ref: Admin),
  timestamps
}
```

### Content Models
- **Venue** - Location and contact info
- **AboutUs** - About section content
- **SponsorCategory** - Sponsor tier categories
- **Sponsor** - Sponsor details
- **FAQ** - FAQ entries
- **Contact** - Contact information
- **Organizer** - Team member info
- **Prize** - Prize details
- **HeroSection** - Hero section configuration
- **Footer** - Footer configuration
- **Settings** - Global settings
- **Media** - Media file tracking

---

## Security Features

✅ **Role-Based Access Control**
- Separate authentication for admin and students
- Admin routes protected with `protectAdmin` middleware
- Student routes protected with `protect` middleware

✅ **Email Domain Validation**
- Only @nsuniv.ac.in emails allowed for admin registration
- Backend validation enforced

✅ **OTP Verification**
- 10-minute expiry on OTP
- Unique code generation
- Resend functionality

✅ **Admin Code System**
- One-time generated alphanumeric code
- Cannot be changed manually
- Required for every login

✅ **JWT Authentication**
- Secure token-based authentication
- Token stored in localStorage with auth header
- Token verification on admin routes

✅ **Input Validation**
- Backend validation for all inputs
- Password requirements (min 6 characters)
- Email domain checking

---

## Environment Variables

Create `.env` file in server root:

```
PORT=5000
MONGODB_URI=mongodb://localhost/technosphere
JWT_SECRET=your_jwt_secret_key

# Email Configuration
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password

# Optional: Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Setup Instructions

### Backend Setup
```bash
cd server
npm install
npm run dev  # Start with nodemon
```

### Frontend Setup
```bash
cd client
npm install
npm run dev  # Start Vite dev server
```

### Access Points
- **Student Portal:** http://localhost:5173
- **Admin Register:** http://localhost:5173/admin/register
- **Admin Login:** http://localhost:5173/admin/login
- **Admin Dashboard:** http://localhost:5173/admin/dashboard
- **API Server:** http://localhost:5000

---

## Admin Panel Workflow

1. **First Time Admin Setup:**
   - Navigate to `/admin/register`
   - Fill registration form with @nsuniv.ac.in email
   - Verify OTP from email
   - Save the generated Admin Code (10 characters)
   - Go to `/admin/login`

2. **Daily Admin Login:**
   - Go to `/admin/login`
   - Enter 10-character Admin Code
   - Access admin dashboard

3. **Content Management:**
   - From dashboard, navigate to content sections
   - Edit content, upload images, reorder items
   - All changes saved to database instantly
   - Changes reflect on website immediately

---

## Real-Time Updates

✅ All content changes are saved to MongoDB instantly
✅ No caching - fresh data on page reload
✅ Frontend fetches content from `/api/cms/*` endpoints
✅ Updates visible immediately to all users

---

## Future Enhancements

🔄 Image upload to Cloudinary
🔄 Activity logging
🔄 Backup/restore functionality
🔄 Multiple admin roles and permissions
🔄 Content versioning
🔄 Scheduling content updates
🔄 Analytics dashboard
🔄 Email campaign management

---

## Troubleshooting

**Admin Code not working?**
- Ensure code is uppercase
- Check that email was verified
- Try resending OTP if needed

**Images not uploading?**
- Ensure URL is valid and publicly accessible
- Check CORS settings on backend
- Consider using Cloudinary for production

**Content not updating on website?**
- Clear browser cache
- Check browser console for errors
- Verify API endpoint is called
- Ensure token is valid

---

## Support

For issues or questions:
- Check error messages in browser console
- Review API response in Network tab
- Verify MongoDB connection
- Ensure all environment variables are set

---

Generated for Technosphere 2026 - Netaji Subhas University
