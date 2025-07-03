// api/send-email.js - Vercel Serverless Function
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Handle CORS for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Only POST requests are accepted.' 
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if environment variables exist
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing environment variables: GMAIL_USER or GMAIL_APP_PASSWORD');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact the administrator.'
      });
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // himankaroraofficial@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: `"${name}" <${email}>`, // Sender's name and email
      to: 'himankaroraofficial@gmail.com', // Your email
      replyTo: email, // When you reply, it goes to sender's email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #ec4899, #8b5cf6); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #555; margin-bottom: 5px; }
            .value { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #ec4899; }
            .message-box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; min-height: 100px; }
            .footer { text-align: center; margin-top: 20px; padding: 15px; color: #666; font-size: 14px; background: #f0f0f0; border-radius: 8px; }
            h2 { margin: 0; font-size: 24px; }
            .emoji { font-size: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2><span class="emoji">🎵</span> New Contact Form Submission</h2>
            <p>Someone reached out through your portfolio website!</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label"><span class="emoji">👤</span> Name:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label"><span class="emoji">📧</span> Email:</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label"><span class="emoji">📝</span> Subject:</div>
              <div class="value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="label"><span class="emoji">💬</span> Message:</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="footer">
              <p><strong>📱 Sent from Portfolio Contact Form</strong></p>
              <p>Reply directly to this email to respond to ${name}</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      // Plain text version as fallback
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

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    
    // Return appropriate error response
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please check email configuration.',
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: 'Unable to connect to email service. Please try again later.',
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};