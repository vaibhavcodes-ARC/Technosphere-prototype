# ⚡ TECHNOSPHERE 2026 CMS - QUICK START GUIDE

## 🎯 5-Minute Quick Start

### Step 1: Start the Application (2 min)

```bash
# Navigate to project root
cd d:/Projects/Technosphere

# Install dependencies (one time only)
npm install && cd server && npm install && cd ../client && npm install && cd ..

# Run everything
npm run dev
```

**You'll see:**
- Server running on `http://localhost:5000`
- Client running on `http://localhost:5173`

---

### Step 2: Create Your First Admin Account (2 min)

1. Open browser: `http://localhost:5173/admin/register`

2. Fill in the registration form:
   ```
   Name: Your Name
   Email: yourname@nsuniv.ac.in  ⚠️ MUST end with @nsuniv.ac.in
   Phone: 9999999999
   Password: password123
   Confirm Password: password123
   ```

3. Click "Register"

4. **Check your email for OTP** (in development, check terminal or Mailtrap)
   ```
   📧 If using Mailtrap: https://mailtrap.io (inbox)
   📧 If terminal: Look for OTP code in console
   ```

5. Enter 6-digit OTP on the verification page

6. ✅ **SAVE YOUR ADMIN CODE** (10 characters shown on screen)
   - This is your login credential
   - Keep it safe!
   - Example: `ABCD1234EF`

---

### Step 3: Login to Admin Panel (1 min)

1. Go to: `http://localhost:5173/admin/login`

2. Enter your 10-character Admin Code:
   ```
   Admin Code: ABCD1234EF  (or your saved code)
   ```

3. Click "Login"

4. 🎉 You're now in the Admin Dashboard!

---

## 🏠 Admin Dashboard Overview

**Left Sidebar Menu:**
- Dashboard (Current page)
- Hero Section
- About Us  
- Venue
- Sponsors
- FAQs
- Contacts
- Organizers
- Prizes
- Footer
- Settings

**Top Right:**
- Your name and email
- Logout button

---

## 📝 Edit Content Examples

### Example 1: Edit Hero Section

1. From Dashboard, click **"Hero Section"** (or "Edit Hero Section" quick action)

2. Edit fields:
   - **Title**: "Technosphere 2026"
   - **Subtitle**: "The Ultimate Tech Fest"
   - **Background Image URL**: Paste image URL
   - **Buttons**: Add "Register Now" button → link to `/events`

3. Click **"Save Changes"** button

✅ Changes instantly appear on website homepage!

---

### Example 2: Add a Sponsor

1. From Dashboard, click **"Sponsors"**

2. Click **"Add Sponsor"** button

3. Fill in:
   ```
   Sponsor Name: Example Company
   Category: Gold
   Logo URL: https://via.placeholder.com/200
   Website: https://example.com
   Contact Email: contact@example.com
   Contact Phone: +91 9999999999
   ```

4. Check "Visible on website"

5. Click **"Save"**

✅ Sponsor appears on website immediately!

---

## 🔑 Important Notes

### ✅ Email Domain Requirement
- Registration emails MUST end with `@nsuniv.ac.in`
- Examples:
  - ✅ `student@nsuniv.ac.in` - Works!
  - ✅ `teacher@nsuniv.ac.in` - Works!
  - ❌ `student@gmail.com` - DOESN'T WORK
  - ❌ `student@outlook.com` - DOESN'T WORK

### ✅ Admin Code
- **10 characters** (letters + numbers, uppercase)
- **NOT your password** - only for login
- **Cannot be changed** - generated once during registration
- **Save it somewhere safe**

### ✅ OTP
- Valid for **10 minutes**
- Can only be used **once**
- Click "Resend OTP" if it expires

---

## 🛠️ Troubleshooting

### ❌ Problem: "OTP Code not received"
**Solution:**
- Check spam folder
- For Mailtrap: Check https://mailtrap.io
- Check server console for OTP code
- Click "Resend OTP" and wait

### ❌ Problem: "Only @nsuniv.ac.in emails are allowed"
**Solution:**
- Your email must END with `@nsuniv.ac.in`
- Use your university email
- Contact admin if you don't have one

### ❌ Problem: "Admin code doesn't work"
**Solution:**
- Make sure code is UPPERCASE
- Code must be exactly 10 characters
- Email must have been verified first
- Try logging out completely and logging back in

### ❌ Problem: "Cannot reach http://localhost:5173"
**Solution:**
- Check if `npm run dev` is running
- Check terminal for errors
- Try: `cd client && npm run dev` in separate terminal

### ❌ Problem: "API connection refused"
**Solution:**
- Check if server is running on port 5000
- Open Terminal 1: `cd server && npm run dev`
- Open Terminal 2: `cd client && npm run dev`

---

## 📚 Need More Help?

**Full Documentation:**
- `SETUP.md` - Complete setup guide
- `CMS_ADMIN_DOCUMENTATION.md` - Full API reference
- `IMPLEMENTATION_CHECKLIST.md` - What's completed + templates

**Quick Links:**
- Admin Register: `http://localhost:5173/admin/register`
- Admin Login: `http://localhost:5173/admin/login`
- Admin Dashboard: `http://localhost:5173/admin/dashboard`
- Student Portal: `http://localhost:5173`

---

## 🎯 What to Try Next

**After successfully logging in:**

1. ✅ Edit Title on Hero Section
2. ✅ Add a Sponsor
3. ✅ Edit About Us content
4. ✅ Navigate around dashboard
5. ✅ Check that changes appear on homepage
6. ✅ Try logging out and back in

---

## 📱 Accessing from Different Devices

### Local Network Access
1. Find your computer IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access from phone/laptop: `http://<YOUR_IP>:5173`

### Production URLs (when deployed)
- Will be provided after deployment

---

## 🔒 Security Tips

🛡️ **Never share your Admin Code**
🛡️ **Never give out @nsuniv.ac.in emails**
🛡️ **Log out after use**
🛡️ **Clear browser history if using shared computer**

---

## 💾 Saving Your Settings

**When you click "Save" on any page:**
- Data is saved to MongoDB
- You'll see a toast notification (top right)
- Changes apply immediately
- Website automatically uses new data

---

## ⏱️ Expected Timings

| Task | Time |
|------|------|
| Install dependencies | 2-3 min |
| Start application | 1-2 min |
| Create admin account | 2-3 min |
| Edit hero section | 1-2 min |
| Add sponsor | 2-3 min |
| **Total First Setup** | **~10 minutes** |

---

## 🚀 You're Ready!

You now have a **fully functional CMS** where you can:
- ✅ Create admin accounts (with email verification)
- ✅ Edit website content without coding
- ✅ Manage sponsors, FAQs, contacts, etc.
- ✅ Upload images and manage media
- ✅ See changes instantly on website

**Questions?** Check the docs or look at the code examples.

**Ready to expand?** Follow the IMPLEMENTATION_CHECKLIST.md to add remaining pages.

---

**Happy admin-ing!** 🎉

Technosphere 2026 - Netaji Subhas University
Last Updated: March 29, 2026
