// api/send-email.js - Vercel Serverless Function
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Handle CORS for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('✅ OPTIONS request handled');
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Only POST requests are accepted.' 
    });
  }

  console.log('📧 Email API called at:', new Date().toISOString());
  console.log('Request body:', req.body);

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('❌ Missing required fields:', { name: !!name, email: !!email, subject: !!subject, message: !!message });
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if environment variables exist
    console.log('🔍 Environment check:');
    console.log('- GMAIL_USER exists:', !!process.env.GMAIL_USER);
    console.log('- GMAIL_USER value:', process.env.GMAIL_USER ? process.env.GMAIL_USER.substring(0, 5) + '***' : 'undefined');
    console.log('- GMAIL_APP_PASSWORD exists:', !!process.env.GMAIL_APP_PASSWORD);
    console.log('- GMAIL_APP_PASSWORD length:', process.env.GMAIL_APP_PASSWORD ? process.env.GMAIL_APP_PASSWORD.length : 0);
    
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('❌ Missing environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Missing email credentials.',
        debug: {
          hasGmailUser: !!process.env.GMAIL_USER,
          hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD
        }
      });
    }

    console.log('📬 Creating email transporter...');
    
    // FIXED: Use createTransport (not createTransporter)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      }
    });

    console.log('🔐 Verifying transporter...');
    
    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('✅ Transporter verified successfully');
    } catch (verifyError) {
      console.error('❌ Transporter verification failed:');
      console.error('Error code:', verifyError.code);
      console.error('Error message:', verifyError.message);
      
      // Return specific error based on verification failure
      if (verifyError.code === 'EAUTH') {
        return res.status(500).json({
          success: false,
          message: 'Gmail authentication failed. Please check your email and app password.',
          errorCode: 'AUTH_FAILED'
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Email service verification failed. Please try again later.',
        errorCode: verifyError.code || 'VERIFICATION_FAILED'
      });
    }

    console.log('📝 Preparing email content...');

    // Email content with professional design
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: 'himankaroraofficial@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Portfolio Contact Form</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc; color: #334155;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
            
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center; position: relative;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 1000\"><defs><radialGradient id=\"a\" cx=\".5\" cy=\".5\" r=\".5\"><stop offset=\"0%\" stop-color=\"%23ffffff\" stop-opacity=\"0.1\"/><stop offset=\"100%\" stop-color=\"%23ffffff\" stop-opacity=\"0\"/></radialGradient></defs><rect width=\"1000\" height=\"1000\" fill=\"url(%23a)\"/></svg>'); opacity: 0.3;"></div>
              <div style="position: relative; z-index: 1;">
                <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #06b6d4, #8b5cf6); border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                  <span style="color: white; font-size: 24px; font-weight: bold;">✉️</span>
                </div>
                <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">New Contact Form Submission</h1>
                <p style="margin: 8px 0 0 0; color: #cbd5e1; font-size: 16px;">Someone reached out through your portfolio website</p>
              </div>
            </div>
            
            <!-- Content Area -->
            <div style="padding: 32px 24px;">
              
              <!-- Contact Information Card -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                  <span style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: white; width: 32px; height: 32px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 16px;">👤</span>
                  Contact Information
                </h2>
                
                <div style="display: grid; gap: 16px;">
                  <div style="display: flex; align-items: flex-start;">
                    <div style="background: #dbeafe; color: #1e40af; padding: 8px; border-radius: 8px; margin-right: 12px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">👤</div>
                    <div style="flex: 1;">
                      <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 4px;">Full Name</div>
                      <div style="color: #1f2937; font-size: 16px; font-weight: 500;">${name}</div>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: flex-start;">
                    <div style="background: #dcfce7; color: #166534; padding: 8px; border-radius: 8px; margin-right: 12px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">📧</div>
                    <div style="flex: 1;">
                      <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 4px;">Email Address</div>
                      <div style="color: #1f2937; font-size: 16px; font-weight: 500;">
                        <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a>
                      </div>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: flex-start;">
                    <div style="background: #fef3c7; color: #92400e; padding: 8px; border-radius: 8px; margin-right: 12px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">📝</div>
                    <div style="flex: 1;">
                      <div style="font-weight: 600; color: #374151; font-size: 14px; margin-bottom: 4px;">Subject</div>
                      <div style="color: #1f2937; font-size: 16px; font-weight: 500;">${subject}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Message Card -->
              <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                  <span style="background: linear-gradient(135deg, #f59e0b, #ef4444); color: white; width: 28px; height: 28px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; font-size: 14px;">💬</span>
                  Message
                </h3>
                <div style="background: #f8fafc; border-radius: 8px; padding: 20px; border-left: 4px solid #06b6d4; line-height: 1.6; color: #374151; font-size: 15px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
                <a href="mailto:${email}" style="background: linear-gradient(135deg, #059669, #047857); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                  <span style="margin-right: 8px;">↩️</span>
                  Reply to ${name}
                </a>
                <a href="tel:${email}" style="background: white; color: #374151; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; border: 2px solid #e5e7eb; display: inline-flex; align-items: center;">
                  <span style="margin-right: 8px;">💼</span>
                  Add to Contacts
                </a>
              </div>
              
              <!-- Metadata -->
              <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #64748b;">
                  <div style="display: flex; align-items: center;">
                    <span style="margin-right: 8px;">🌐</span>
                    <span>Sent from Portfolio Contact Form</span>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <span style="margin-right: 8px;">🕒</span>
                    <span>${new Date().toLocaleString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit',
                      timeZoneName: 'short'
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                This email was automatically generated from your portfolio website.<br>
                <strong>Reply directly to this email</strong> to respond to ${name}.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Portfolio Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent: ${new Date().toLocaleString()}
Reply directly to this email to respond to ${name}.
      `
    };

    console.log('📤 Sending email...');

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Detailed error information:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    // Return detailed error response for debugging
    let errorMessage = 'Failed to send email. Please try again later.';
    let errorCode = 'UNKNOWN_ERROR';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Gmail authentication failed. Invalid email or app password.';
      errorCode = 'AUTH_FAILED';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Unable to connect to Gmail servers.';
      errorCode = 'CONNECTION_FAILED';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network connection error.';
      errorCode = 'NETWORK_ERROR';
    } else if (error.message && error.message.includes('Invalid login')) {
      errorMessage = 'Gmail login failed. Please check credentials.';
      errorCode = 'LOGIN_FAILED';
    }
    
    return res.status(500).json({
      success: false,
      message: errorMessage,
      errorCode: errorCode,
      debug: {
        originalError: error.message,
        errorCode: error.code,
        timestamp: new Date().toISOString()
      }
    });
  }
};