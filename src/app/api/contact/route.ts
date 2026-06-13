import { NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      contactMethod, 
      destination, 
      interests, 
      details, 
      selectedTier 
    } = data;

    // Basic validation
    if (!firstName || !lastName || !email || !selectedTier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Normalize casing for consistent display
    const formattedTier = selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1).toLowerCase();

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format interests for the email
    const interestsString = Array.isArray(interests) && interests.length > 0 
      ? interests.join(', ') 
      : 'None specified';

    // Use SENDER_EMAIL if provided (for aliases), otherwise fallback to EMAIL_USER
    const senderEmail = process.env.SENDER_EMAIL || process.env.EMAIL_USER;

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${senderEmail}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Travel Inquiry: ${formattedTier} Experience from ${firstName} ${lastName}`,
      text: `
New Inquiry: Travel by Bryson

Service Tier: ${formattedTier}
Client: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Preferred Contact: ${contactMethod}

Destination: ${destination}
Interests: ${interestsString}

Journey Details:
${details}
      `,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #F2EDE3; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.04);">
          <!-- Header -->
          <div style="background-color: #262E23; padding: 50px 20px; text-align: center;">
            <h1 style="color: #F2EDE3; font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 400; margin: 0; letter-spacing: 3px; text-transform: uppercase;">
              Travel by <span style="font-weight: 800;">Bryson</span>
            </h1>
            <p style="color: #8D7C5E; font-size: 12px; margin-top: 12px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.9;">A New Journey Begins</p>
          </div>

          <!-- Body -->
          <div style="padding: 50px 40px; background-color: #ffffff;">
            <div style="border-left: 3px solid #8D7C5E; padding-left: 25px; margin-bottom: 40px;">
              <h2 style="color: #262E23; font-size: 20px; margin: 0 0 8px 0; font-family: 'Playfair Display', serif;">${formattedTier} Experience</h2>
              <p style="color: #666666; font-size: 14px; margin: 0; letter-spacing: 0.5px;">Inquiry from ${firstName} ${lastName}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #8D7C5E; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 150px;">Client</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #1A1A1A; font-size: 15px; font-weight: 500;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #8D7C5E; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #1A1A1A; font-size: 15px;"><a href="mailto:${email}" style="color: #1A1A1A; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #8D7C5E; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #1A1A1A; font-size: 15px;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #8D7C5E; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Preference</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #1A1A1A; font-size: 15px; text-transform: capitalize;">${contactMethod}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #8D7C5E; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Destination</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #1A1A1A; font-size: 15px;">${destination}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #8D7C5E; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;">Interests</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #F2EDE3; color: #1A1A1A; font-size: 15px;">${interestsString}</td>
              </tr>
            </table>

            <div style="background-color: #F9F7F2; padding: 35px; border-radius: 12px; border: 1px solid #F2EDE3;">
              <h3 style="color: #262E23; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-top: 0; margin-bottom: 20px; font-weight: 700;">Journey Details</h3>
              <p style="color: #1A1A1A; font-size: 15px; line-height: 1.8; margin-bottom: 0; white-space: pre-wrap; font-style: italic; color: #333333;">"${details}"</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #F2EDE3; padding: 40px; text-align: center; border-top: 1px solid rgba(62, 76, 57, 0.05);">
            <p style="color: #8D7C5E; font-size: 10px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">&copy; 2026 BRYSON ADAMS | LUXURY TRAVEL DESIGNER</p>
            <div style="margin-top: 20px;">
              <a href="https://www.instagram.com/travel.by.bryson/" style="color: #262E23; font-size: 11px; text-decoration: none; margin: 0 15px; font-weight: 600; letter-spacing: 1px;">INSTAGRAM</a>
              <a href="mailto:bryson.adams@fora.travel" style="color: #262E23; font-size: 11px; text-decoration: none; margin: 0 15px; font-weight: 600; letter-spacing: 1px;">EMAIL</a>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
