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

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Inquiry: ${selectedTier} Experience - ${firstName} ${lastName}`,
      text: `
New Inquiry Received from Bryson Travel

Service Tier: ${selectedTier}
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Preferred Contact: ${contactMethod}

Destination: ${destination}
Interests: ${interestsString}

Details:
${details}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New Inquiry Received</h2>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p><strong>Service Tier:</strong> <span style="text-transform: uppercase;">${selectedTier}</span></p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Preferred Contact:</strong> ${contactMethod}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Interests:</strong> ${interestsString}</p>
          </div>

          <div style="background-color: #fff; border: 1px solid #eee; padding: 15px; border-radius: 5px;">
            <p><strong>Dream Details:</strong></p>
            <p style="white-space: pre-wrap;">${details}</p>
          </div>

          <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">
            This email was sent from the contact form on bryson-travel.
          </p>
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
