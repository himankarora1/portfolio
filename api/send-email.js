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
    
    // Create transporter using Gmail
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      debug: false, // Disable verbose debug
      logger: false // Disable logging
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

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: 'himankaroraofficial@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 20px; text-align: center;">
            <h2>🎵 New Contact Form Submission</h2>
          </div>
          <div style="background: #f9f9f9; padding: 30px;">
            <div style="margin-bottom: 20px;">
              <strong>👤 Name:</strong>
              <div style="background: white; padding: 15px; margin-top: 5px; border-radius: 5px; border-left: 4px solid #ec4899;">
                ${name}
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong>📧 Email:</strong>
              <div style="background: white; padding: 15px; margin-top: 5px; border-radius: 5px; border-left: 4px solid #ec4899;">
                ${email}
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong>📝 Subject:</strong>
              <div style="background: white; padding: 15px; margin-top: 5px; border-radius: 5px; border-left: 4px solid #ec4899;">
                ${subject}
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong>💬 Message:</strong>
              <div style="background: white; padding: 20px; margin-top: 5px; border-radius: 5px; border: 1px solid #ddd; min-height: 100px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 15px; background: #e8e8e8; border-radius: 5px;">
              <p><strong>📱 Sent from Portfolio Contact Form</strong></p>
              <p>Reply directly to this email to respond to ${name}</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
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