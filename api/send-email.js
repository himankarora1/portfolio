// api/send-email.js - Vercel Serverless Function with Tech Page Support
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
    const { name, email, subject, message, pageType = 'artist' } = req.body;

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

    // Determine recipient email based on page type
    const recipientEmail = pageType === 'tech' ? 'himankarora1000@gmail.com' : 'himankaroraofficial@gmail.com';
    const pageTitle = pageType === 'tech' ? 'Tech Portfolio' : 'Artist Portfolio';
    
    console.log(`📧 Sending ${pageTitle} contact form to:`, recipientEmail);

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

    // Different email templates based on page type
    const getEmailTemplate = (pageType, name, email, subject, message) => {
      const isTeachPage = pageType === 'tech';
      const brandColor = isTeachPage ? '#06b6d4' : '#ec4899'; // cyan for tech, pink for artist
      const pageTitle = isTeachPage ? 'Tech Portfolio' : 'Artist Portfolio';
      const emoji = isTeachPage ? '💻' : '🎨';

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${pageTitle} Contact</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5;">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 600px;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1e293b, #334155); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                      <div style="background-color: ${brandColor}; width: 50px; height: 50px; border-radius: 8px; display: inline-block; text-align: center; line-height: 50px; margin-bottom: 15px;">
                        <span style="color: white; font-size: 24px;">${emoji}</span>
                      </div>
                      <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 5px 0; font-weight: bold;">New ${pageTitle} Contact</h1>
                      <p style="color: #cbd5e1; font-size: 14px; margin: 0;">Someone reached out through your ${pageTitle.toLowerCase()} website</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      
                      <!-- Contact Info Section -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 20px;">
                            <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">
                              👤 Contact Information
                            </h2>
                            
                            <!-- Name -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                              <tr>
                                <td style="width: 80px; vertical-align: top;">
                                  <div style="background-color: #dbeafe; color: #1e40af; padding: 6px; border-radius: 6px; text-align: center; font-size: 12px; width: 24px; height: 24px; line-height: 12px;">👤</div>
                                </td>
                                <td style="vertical-align: top;">
                                  <div style="font-weight: bold; color: #374151; font-size: 12px; margin-bottom: 2px;">FULL NAME</div>
                                  <div style="color: #1f2937; font-size: 16px; font-weight: 500;">${name}</div>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Email -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                              <tr>
                                <td style="width: 80px; vertical-align: top;">
                                  <div style="background-color: #dcfce7; color: #166534; padding: 6px; border-radius: 6px; text-align: center; font-size: 12px; width: 24px; height: 24px; line-height: 12px;">📧</div>
                                </td>
                                <td style="vertical-align: top;">
                                  <div style="font-weight: bold; color: #374151; font-size: 12px; margin-bottom: 2px;">EMAIL ADDRESS</div>
                                  <div style="color: #1f2937; font-size: 16px; font-weight: 500;">
                                    <a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Subject -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="width: 80px; vertical-align: top;">
                                  <div style="background-color: #fef3c7; color: #92400e; padding: 6px; border-radius: 6px; text-align: center; font-size: 12px; width: 24px; height: 24px; line-height: 12px;">📝</div>
                                </td>
                                <td style="vertical-align: top;">
                                  <div style="font-weight: bold; color: #374151; font-size: 12px; margin-bottom: 2px;">SUBJECT</div>
                                  <div style="color: #1f2937; font-size: 16px; font-weight: 500;">${subject}</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message Section -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 2px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 20px;">
                            <h3 style="color: #1e293b; font-size: 16px; margin: 0 0 10px 0; font-weight: bold;">
                              💬 Message
                            </h3>
                            <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; border-left: 4px solid ${brandColor}; line-height: 1.6; color: #374151; font-size: 14px;">
                              ${message.replace(/\n/g, '<br>')}
                            </div>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Action Buttons -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 10px 0;">
                            <table cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="padding-right: 10px;">
                                  <a href="mailto:${email}" style="background: linear-gradient(135deg, #059669, #047857); color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
                                    ↩️ Reply to ${name}
                                  </a>
                                </td>
                                <td>
                                  <a href="mailto:${email}" style="background-color: #f3f4f6; color: #374151; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; border: 2px solid #e5e7eb; display: inline-block;">
                                    💼 Add to Contacts
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="text-align: left; font-size: 12px; color: #64748b;">
                            🌐 Sent from ${pageTitle} Contact Form
                          </td>
                          <td style="text-align: right; font-size: 12px; color: #64748b;">
                            🕒 ${new Date().toLocaleString('en-US', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric', 
                              hour: '2-digit', 
                              minute: '2-digit'
                            })}
                          </td>
                        </tr>
                      </table>
                      <div style="margin-top: 10px; font-size: 13px; color: #64748b; line-height: 1.4;">
                        This email was automatically generated from your ${pageTitle.toLowerCase()} website.<br>
                        <strong>Reply directly to this email</strong> to respond to ${name}.
                      </div>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;
    };

    // Gmail-compatible email content
    const mailOptions = {
      from: `"${pageTitle} Contact" <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `${pageTitle} Contact: ${subject}`,
      html: getEmailTemplate(pageType, name, email, subject, message),
      text: `
New ${pageTitle} Contact Form Submission

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
    console.log('Sent to:', recipientEmail);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId,
      timestamp: new Date().toISOString(),
      sentTo: recipientEmail
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