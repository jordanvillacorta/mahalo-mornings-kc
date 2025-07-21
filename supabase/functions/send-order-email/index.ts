import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Helper function to convert 24-hour time to 12-hour format with AM/PM
  const formatTime12Hour = (time24: string): string => {
    if (!time24) return time24;
    
    const [hours, minutes] = time24.split(':');
    const hour24 = parseInt(hours, 10);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    
    return `${hour12}:${minutes} ${ampm}`;
  };

  try {
    const { 
      couponCode, 
      clientName, 
      cellPhoneNumber, 
      emailAddress, 
      receiveTexts, 
      cookieQuantities, 
      preferredPickupDate,
      preferredPickupTime
    } = await req.json()

    // Get MailerSend API token from environment variables
    const MAILERSEND_API_TOKEN = Deno.env.get('MAILERSEND_API_TOKEN')
    if (!MAILERSEND_API_TOKEN) {
      throw new Error('MailerSend API token not configured')
    }

    // Calculate total cookies
    const totalCookies = Object.values(cookieQuantities).reduce((sum: number, qty: number) => sum + qty, 0)

    // Format pickup time to 12-hour format
    const formattedPickupTime = formatTime12Hour(preferredPickupTime);

    // Generate CSV content
    const generateCSV = () => {
      const headers = [
        'Coupon Code',
        'Client Name', 
        'Cell Phone Number',
        'Email Address',
        'Receive Text Updates',
        'Preferred Pickup Date',
        'Preferred Pickup Time',
        'Total Cookies',
        'Cookie Selection'
      ]

      // Format cookie quantities into a readable string
      const cookieSelection = Object.entries(cookieQuantities)
        .filter(([_, qty]) => qty > 0)
        .map(([name, qty]) => `${name}: ${qty}`)
        .join('; ')

      const row = [
        couponCode,
        clientName,
        cellPhoneNumber,
        emailAddress,
        receiveTexts ? 'Yes' : 'No',
        preferredPickupDate,
        formattedPickupTime,
        totalCookies.toString(),
        cookieSelection
      ]

      // Escape CSV fields that contain commas, quotes, or newlines
      const escapeCSVField = (field: string) => {
        if (field.includes(',') || field.includes('"') || field.includes('\n')) {
          return `"${field.replace(/"/g, '""')}"` // Escape quotes by doubling them
        }
        return field
      }

      const csvHeaders = headers.join(',')
      const csvRow = row.map(escapeCSVField).join(',')
      
      return `${csvHeaders}\n${csvRow}`
    }

    const csvContent = generateCSV()
    const csvBase64 = btoa(csvContent) // Base64 encode the CSV content

    // Format selected cookies
    const selectedCookies = Object.entries(cookieQuantities)
      .filter(([_, qty]) => qty > 0)
      .map(([name, qty]) => `${name}: ${qty}`)
      .join('\n')

    // Prepare email content
    const emailSubject = 'Moore Homes Cookie Order'
    const emailContent = `
<h2>Moore Homes Cookie Order</h2>

<p><strong>Coupon Code:</strong> ${couponCode}</p>
<p><strong>Client Name:</strong> ${clientName}</p>
<p><strong>Cell Phone:</strong> ${cellPhoneNumber}</p>
<p><strong>Email:</strong> ${emailAddress}</p>
<p><strong>Text Message Updates:</strong> ${receiveTexts ? 'Yes' : 'No'}</p>

<h3>Cookie Selection (Total: ${totalCookies})</h3>
<pre>${selectedCookies}</pre>

<p><strong>Preferred Pickup Date:</strong> ${preferredPickupDate}</p>
<p><strong>Preferred Pickup Time:</strong> ${formattedPickupTime}</p>

<p>Please confirm availability and contact the client when the order is ready for pickup.</p>
    `.trim()

    // MailerSend API payload
    const mailersendPayload = {
      from: {
        email: "noreply@mahalomorningskc.com",
        name: "Mahalo Mornings"
      },
      to: [
        {
          email: "mahalomorningskc@gmail.com",
          name: "Mahalo Mornings Orders"
        }
      ],
      subject: emailSubject,
      html: emailContent,
      text: emailContent.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      attachments: [
        {
          content: csvBase64,
          filename: `moore_homes_order_${couponCode}_${new Date().toISOString().split('T')[0]}.csv`,
          disposition: 'attachment'
        }
      ]
    }

    // Send email via MailerSend API
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERSEND_API_TOKEN}`,
      },
      body: JSON.stringify(mailersendPayload),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('MailerSend API error:', errorData)
      throw new Error(`MailerSend API error: ${response.status}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Order email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send email' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})