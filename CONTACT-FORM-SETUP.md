# ATOCODE Contact Form Setup Guide

## Files to Upload

Upload these files to your hosting:
- `index.html`
- `style.css`
- `script.js`
- `contact-form.php` ← **NEW**

## Configuration Steps

### 1. Edit contact-form.php

Open `contact-form.php` and update these lines (around line 45-48):

```php
// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
$to_email = 'your-actual-email@domain.com'; // YOUR EMAIL ADDRESS
$from_email = 'noreply@yourdomain.com'; // FROM EMAIL (use your domain)
$subject = 'New Contact Form Submission - ATOCODE';
// ============================================
```

**Important:**
- Replace `your-actual-email@domain.com` with your real email address
- Replace `noreply@yourdomain.com` with an email from your domain (e.g., `noreply@atocode.com`)

### 2. Update Contact Info in index.html

Open `index.html` and update the placeholder contact information (around line 192-210):

```html
<div class="info-card">
    <div class="info-icon">...</div>
    <h4>Email</h4>
    <p>your-email@domain.com</p> <!-- UPDATE THIS -->
</div>

<div class="info-card">
    <div class="info-icon">...</div>
    <h4>Phone</h4>
    <p>+1 (555) 123-4567</p> <!-- UPDATE THIS -->
</div>
```

### 3. Test the Form

After uploading:

1. Go to your website
2. Scroll to the contact form
3. Fill it out and submit
4. Check your email inbox (and spam folder!)

### 4. Troubleshooting

**If emails aren't arriving:**

1. **Check PHP mail() function is enabled**
   - Most shared hosting has it enabled by default
   - Contact your hosting support if needed

2. **Check spam folder**
   - Emails from PHP mail() often go to spam initially

3. **Use SMTP instead (more reliable)**
   - If basic mail() doesn't work, I can help you set up SMTP using PHPMailer

4. **Check error logs**
   - Look for PHP error logs in your hosting control panel
   - Or add this to the top of contact-form.php temporarily:
     ```php
     error_reporting(E_ALL);
     ini_set('display_errors', 1);
     ```

## Alternative: Using Email Services

If PHP mail() doesn't work well, here are better alternatives:

### Option A: FormSubmit (Easiest - No Backend Needed)
- Free service that handles form submissions
- Just change form action to their URL
- I can help you set this up if needed

### Option B: SMTP with PHPMailer (Most Reliable)
- Use Gmail, SendGrid, or your hosting's SMTP
- More reliable email delivery
- I can create this version if you prefer

### Option C: Third-party Services
- Formspree
- Basin
- Netlify Forms (if using Netlify)

## Current Setup Summary

✅ **What's working:**
- Form validates user input
- Shows loading state while sending
- Displays success/error messages
- Sends formatted email with all form data

✅ **Security features:**
- Input validation and sanitization
- HTML entity encoding to prevent XSS
- POST-only requests
- Email format validation

## Need Help?

Let me know if:
- Emails aren't being received
- You want to use SMTP instead
- You need a different email service setup
- You want to add features (auto-reply, file uploads, etc.)
