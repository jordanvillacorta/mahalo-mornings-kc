import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, Bell, MessageCircle, Heart, Camera, MapPin } from 'lucide-react';

const Connect = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name,
          email: (e.target as HTMLFormElement).email.value,
          message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!');
        // Reset form
        setName('');
        setMessage('');
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear messages after 5 seconds
  React.useEffect(() => {
    if (submitMessage || submitError) {
      const timer = setTimeout(() => {
        setSubmitMessage('');
        setSubmitError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitMessage, submitError]);

  const handleContactSubmitOld = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    // Create mailto link
    const subject = encodeURIComponent(`Message from ${name} via Mahalo Mornings Website`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:mahalomorningskc@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form after a delay
    setTimeout(() => {
    }, 1000);
  };

  const socialLinks = [
    { 
      icon: Instagram, 
      name: 'Instagram', 
      handle: '@mahalomornings',
      url: 'https://www.instagram.com/mahalomorningskc', 
      color: 'bg-pink-500', 
      followers: '12.5K',
      description: 'Daily behind-the-scenes content and fresh pastry photos'
    },
    { 
      icon: Facebook, 
      name: 'Facebook', 
      handle: 'Mahalo Mornings Bakery',
      url: 'https://www.facebook.com/profile.php?id=61570248065109', 
      color: 'bg-blue-600', 
      followers: '8.2K',
      description: 'Community updates, events, and customer stories'
    }
  ];

  return (
    <div className="pt-20">
      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600">
                Have a question, suggestion, or just want to say aloha? We'd love to hear from you!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-coral-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  {submitMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800">{submitMessage}</p>
                    </div>
                  )}
                  
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800">{submitError}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-200"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-coral-500 hover:bg-coral-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-teal-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <a 
                          href="mailto:mahalomorningskc@gmail.com"
                          className="text-gray-600 hover:text-coral-500 transition-colors duration-200"
                        >
                          mahalomorningskc@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Visit Us</p>
                        <a 
                          href="https://maps.google.com/?q=17450+West+87th+Street+Parkway,+Lenexa,+Kansas+66219"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-coral-500 transition-colors duration-200 cursor-pointer"
                        >
                          17450 West 87th Street Parkway, Lenexa, KS
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-pink-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Instagram</p>
                        <a 
                          href="https://www.instagram.com/mahalomorningskc"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-coral-500 transition-colors duration-200"
                        >
                          @mahalomorningskc
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Facebook className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Facebook</p>
                        <a 
                          href="https://www.facebook.com/profile.php?id=61570248065109"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-coral-500 transition-colors duration-200"
                        >
                          Mahalo Mornings Bakery
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-coral-500 to-teal-500 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Visit Our Bakery</h3>
                  <p className="mb-4 opacity-90">
                    Nothing beats the experience of visiting us in person. Come smell the fresh pastries, meet our team, and feel the aloha spirit!
                  </p>
                  <Link 
                    to="/location"
                    className="inline-block px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30"
                  >
                    See Our Location
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Connect;