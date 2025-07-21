import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Name, email, and message are required',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Get MailerSend API token from environment variables
    const MAILERSEND_API_TOKEN = Deno.env.get('MAILERSEND_API_TOKEN');
    if (!MAILERSEND_API_TOKEN) {
      throw new Error('MailerSend API token not configured');
    }

    // Prepare email content
    const emailSubject = `Contact Form Message from ${name}`;
    const emailContent = `
<h2>New Contact Form Message</h2>

<p><strong>From:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>

<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br>')}</p>

<hr>
<p><em>This message was sent from the Mahalo Mornings website contact form.</em></p>
    `.trim();

    // MailerSend API payload
    const mailersendPayload = {
      from: {
        email: 'noreply@mahalomorningskc.com',
        name: 'Mahalo Mornings Contact Form',
      },
      to: [
        {
          email: 'mahalomorningskc@gmail.com',
          name: 'Mahalo Mornings KC',
        },
      ],
      reply_to: {
        email: email,
        name: name,
      },
      subject: emailSubject,
      html: emailContent,
      text: emailContent.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    };

    // Send email via MailerSend API
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAILERSEND_API_TOKEN}`,
      },
      body: JSON.stringify(mailersendPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('MailerSend API error:', errorData);
      throw new Error(`MailerSend API error: ${response.status}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error sending contact email:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to send message',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
