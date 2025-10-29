const { Resend } = require('resend');

// Initialize Resend with the API key from Render's environment
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  try {
    const { data, error } = await resend.emails.send({
      // You MUST use an email from your verified domain here
      from: 'Student Hub <no-reply@mystudenthub.com>',
      to: options.email,
      subject: options.subject,
      text: options.message, // Resend handles text-only emails
    });

    if (error) {
      // If Resend itself reports an error, throw it
      throw new Error(error.message);
    }

    // Log the success for our records
    console.log('Resend email sent successfully:', data.id);

  } catch (error) {
    // This will catch any error (like auth failure or network issues)
    console.error('Failed to send email:', error);
    throw error; // Re-throw the error so the auth route can catch it
  }
};

module.exports = sendEmail;
