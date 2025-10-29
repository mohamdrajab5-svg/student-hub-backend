const sgMail = require('@sendgrid/mail');

// Set the API key from Render's environment
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  // 1) Define the email message
  const msg = {
    to: options.email,
    // This MUST be the "Verified Single Sender" email you just set up
    from: 'u7627925022@gmail.com', 
    subject: options.subject,
    text: options.message,
    // html: (can add html version later)
  };

  // 2) Actually send the email
  try {
    await sgMail.send(msg);
    console.log('SendGrid email sent successfully!');
  } catch (error) {
    // This will catch any error (like auth failure or network issues)
    console.error('Failed to send SendGrid email:', error);

    // Log more details if available
    if (error.response) {
      console.error(error.response.body)
    }

    throw error; // Re-throw the error so the auth route can catch it
  }
};

module.exports = sendEmail;
