import nodemailer from "nodemailer";

let transporter = null;

// Initialize transporter lazily (when first needed)
const getTransporter = () => {
  if (!transporter) {
    // Debug environment variables
    console.log("📧 Email Configuration:");
    console.log(`   USER: ${process.env.EMAIL_USER ? "✓ Set" : "✗ Missing"}`);
    console.log(
      `   PASS: ${process.env.EMAIL_PASS ? `✓ Set (${process.env.EMAIL_PASS.length} chars)` : "✗ Missing"}`,
    );

    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER?.trim(),
        pass: process.env.EMAIL_PASS?.trim(),
      },
    });
  }
  return transporter;
};

// Send verification email
export const sendVerificationEmail = async (email, verificationLink) => {
  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email Address - Developer Noon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Developer Noon</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">Verify Your Email Address</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Thank you for signing up! Please click the button below to verify your email address and activate your account.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" 
                 style="background-color: #667eea; color: white; padding: 12px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              Or copy and paste this link in your browser:
            </p>
            <p style="color: #667eea; font-size: 12px; word-break: break-all; background-color: #f0f0f0; padding: 10px; border-radius: 4px;">
              ${verificationLink}
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              This link will expire in 24 hours for security reasons.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px;">
              If you did not sign up for this account, please ignore this email.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error(
      `❌ Failed to send verification email to ${email}:`,
      error.message,
    );
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const transporter = getTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password - Developer Noon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Developer Noon</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              We received a request to reset your password. Click the button below to create a new password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background-color: #667eea; color: white; padding: 12px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              Or copy and paste this link in your browser:
            </p>
            <p style="color: #667eea; font-size: 12px; word-break: break-all; background-color: #f0f0f0; padding: 10px; border-radius: 4px;">
              ${resetLink}
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              This link will expire in 10 minutes for security reasons.
            </p>
            
            <p style="color: #d32f2f; font-weight: bold; margin-top: 20px;">
              ⚠️ If you did not request this, please ignore this email. Your password has not been changed.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px;">
              For security, never share this link with anyone.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error(
      `❌ Failed to send password reset email to ${email}:`,
      error.message,
    );
    throw error;
  }
};

export default {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
