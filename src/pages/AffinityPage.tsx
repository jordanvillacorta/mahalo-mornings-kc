import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, Users, Award, Star, MapPin, Calendar, Phone, Mail, CheckCircle } from 'lucide-react';
import { mooreHomesCookieSelection } from '../data/menuItems';

const AffinityPage = () => {
  const [couponCode, setCouponCode] = useState('');
  const [clientName, setClientName] = useState('');
  const [cellPhoneNumber, setCellPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [receiveTexts, setReceiveTexts] = useState(false);
  const [cookieQuantities, setCookieQuantities] = useState<Record<string, number>>({});
  const [preferredPickupDate, setPreferredPickupDate] = useState('');
  const [preferredPickupTime, setPreferredPickupTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate minimum pickup date/time (1 day from now, 2 days if today is Saturday)
  const calculateMinPickupDate = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
    let daysToAdd = currentDay === 6 ? 2 : 1; // If Saturday, add 2 days, otherwise 1
    
    let minDate = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
    
    // If the calculated date falls on Sunday (0) or Monday (1), move to Tuesday
    while (minDate.getDay() === 0 || minDate.getDay() === 1) {
      minDate = new Date(minDate.getTime() + (24 * 60 * 60 * 1000));
    }
    
    // Format as YYYY-MM-DD for date input
    const year = minDate.getFullYear();
    const month = String(minDate.getMonth() + 1).padStart(2, '0');
    const day = String(minDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  // Check if a date is valid (not Sunday or Monday)
  const isValidPickupDate = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString + 'T00:00:00'); // Add time to avoid timezone issues
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 1; // Not Sunday (0) or Monday (1)
  };

  const handleCookieQuantityChange = (cookieName: string, quantity: number) => {
    setCookieQuantities(prev => ({
      ...prev,
      [cookieName]: Math.max(0, Math.min(12, quantity))
    }));
  };

  const getTotalCookies = () => {
    return Object.values(cookieQuantities).reduce((sum, qty) => sum + qty, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    
    // Validate required fields
    if (!couponCode.trim()) errors.couponCode = 'Coupon code is required';
    if (!clientName.trim()) errors.clientName = 'Client name is required';
    if (!cellPhoneNumber.trim()) errors.cellPhoneNumber = 'Cell phone number is required';
    if (!emailAddress.trim()) errors.emailAddress = 'Email address is required';
    if (!preferredPickupDate) errors.preferredPickupDate = 'Preferred pickup date is required';
    if (!preferredPickupTime) errors.preferredPickupTime = 'Preferred pickup time is required';
    
    // Validate cookie quantities
    const totalCookies = getTotalCookies();
    if (totalCookies < 4) {
      errors.cookies = 'Please select at least 4 cookies';
    } else if (totalCookies > 12) {
      errors.cookies = 'Total cookies cannot exceed 12';
    }
    
    // Validate pickup date is not in the past
    if (preferredPickupDate) {
      const selectedDate = new Date(preferredPickupDate);
      const minDate = new Date(calculateMinPickupDate());
      if (selectedDate < minDate) {
        errors.preferredPickupDate = 'Pickup date must be at least 1 day from now (2 days if ordering on Saturday)';
      } else if (!isValidPickupDate(preferredPickupDate)) {
        errors.preferredPickupDate = 'Sorry, we are closed on Sundays and Mondays. Please select Tuesday through Saturday.';
      }
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Clear errors
    setFormErrors({});
    
    // Send email via Supabase Edge Function
    sendOrderEmail();
  };

  const sendOrderEmail = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          couponCode,
          clientName,
          cellPhoneNumber,
          emailAddress,
          receiveTexts,
          cookieQuantities,
          preferredPickupDate,
          preferredPickupTime,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Show success confirmation
        setShowConfirmation(true);
        
        // Reset form after a delay
        setTimeout(() => {
          setShowConfirmation(false);
          setCouponCode('');
          setClientName('');
          setCellPhoneNumber('');
          setEmailAddress('');
          setReceiveTexts(false);
          setCookieQuantities({});
          setPreferredPickupDate('');
          setPreferredPickupTime('');
        }, 5000);
      } else {
        throw new Error(result.error || 'Failed to send order');
      }
    } catch (error) {
      console.error('Error sending order:', error);
      setFormErrors({ submit: 'Failed to submit order. Please try again or contact us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="https://00a7c639c65ed95d3e4c.cdn6.editmysite.com/uploads/b/00a7c639c65ed95d3e4ce3d12d319434fc63767556c5c50cf2af23fdcac41739/Untitled%20design.png_1742504035.png?width=2400&optimize=medium"
                alt="Mahalo Mornings Logo"
                className="h-16 w-auto mr-4"
              />
              <Heart className="w-8 h-8 text-coral-500 mx-4" />
              <Home className="w-16 h-16 text-teal-500" />
            </div>
            <div className="bg-gradient-to-b from-teal-500 to-teal-800 rounded-2xl p-8 text-white mb-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                  🌺 Aloha & Welcome! 🌺
                </h1>
                <div className="text-lg md:text-xl leading-relaxed space-y-4">
                  <p>
                    You've landed in the sweetest spot on the island — and we've got a dozen reasons to make you smile!
                  </p>
                  <p>
                    Someone must really like and appreciate you! They are paying for you to enjoy 12 of our signature Mahalo Mornings cookies, baked fresh with aloha and a whole lotta flavor.
                  </p>
                  <p>
                    Kick off your shoes, soak in the good vibes, and let's get your free cookie order started. Just complete the form below to start your order — it's quick, easy, and deliciously worth it. 🌴🍪
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Place Your Cookie Order</h2>
              <p className="text-lg text-gray-600">
                Fill out the form below to claim your complimentary dozen cookies
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Coupon Code */}
              <div>
                <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-200"
                  required
                />
                {formErrors.couponCode && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.couponCode}</p>
                )}
              </div>

              {/* Client Name */}
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-200"
                  required
                />
                {formErrors.clientName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.clientName}</p>
                )}
              </div>

              {/* Cell Phone Number */}
              <div>
                <label htmlFor="cellPhoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Cell Phone Number *
                </label>
                <input
                  type="tel"
                  id="cellPhoneNumber"
                  value={cellPhoneNumber}
                  onChange={(e) => setCellPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-200"
                  required
                />
                {formErrors.cellPhoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.cellPhoneNumber}</p>
                )}
              </div>

              {/* Text Message Approval */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="receiveTexts"
                  checked={receiveTexts}
                  onChange={(e) => setReceiveTexts(e.target.checked)}
                  className="w-4 h-4 text-coral-500 border-gray-300 rounded focus:ring-coral-500"
                />
                <label htmlFor="receiveTexts" className="ml-2 text-sm text-gray-700">
                  I approve receiving text message updates about my order
                </label>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-200"
                  required
                />
                {formErrors.emailAddress && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.emailAddress}</p>
                )}
              </div>

              {/* Cookie Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Your Cookies (Total: {getTotalCookies()}/12) *
                </label>
                <p className="text-gray-600 mb-4">
                Choose up to 12 cookies total, making sure to select at least 3 of any kind.
              </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {mooreHomesCookieSelection.map((cookie, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{cookie.name}</h4>
                        <div className="flex items-center space-x-2">
                          <label htmlFor={`cookie-${index}`} className="text-sm text-gray-600">Qty:</label>
                          <input
                            type="number"
                            id={`cookie-${index}`}
                            min="0"
                            max="12"
                            value={cookieQuantities[cookie.name] || 0}
                            onChange={(e) => handleCookieQuantityChange(cookie.name, parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{cookie.description}</p>
                    </div>
                  ))}
                </div>
                {formErrors.cookies && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.cookies}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Please select between 3 and 12 cookies total.
                </p>
              </div>

              {/* Preferred Pickup Date and Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredPickupDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Pickup Date *
                  </label>
                  <input
                    type="date"
                    id="preferredPickupDate"
                    value={preferredPickupDate}
                    onChange={(e) => setPreferredPickupDate(e.target.value)}
                    min={calculateMinPickupDate()}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-200 ${
                      preferredPickupDate && preferredPickupDate.length === 10 && !isValidPickupDate(preferredPickupDate)
                        ? 'border-red-300 bg-red-50 text-red-700' 
                        : 'border-gray-300'
                    }`}
                    required
                  />
                  {formErrors.preferredPickupDate && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.preferredPickupDate}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    We're open Tuesday - Saturday, 8:00 AM - 2:00 PM
                  </p>
                </div>
                <div>
                  <label htmlFor="preferredPickupTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Pickup Time *
                  </label>
                  <input
                    type="time"
                    id="preferredPickupTime"
                    value={preferredPickupTime}
                    onChange={(e) => setPreferredPickupTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  {formErrors.preferredPickupTime && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.preferredPickupTime}</p>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Select your preferred pickup date (Tue-Sat) and time (8:00 AM - 2:00 PM) above.</p>
                <p>If your preferred date/time is not available, we will contact you to choose a different date/time.</p>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                {showConfirmation && (
                  <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                      <p className="text-green-800 font-medium text-lg">
                        Aloha! Mahalo for your order. We will confirm when your order is ready for pickup.
                      </p>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-coral-500 hover:bg-coral-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    'Submit Order'
                  )}
                </button>
                {formErrors.submit && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.submit}</p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Contact Section */}
        <div className="container mx-auto px-4">
          <div className="mt-20">
            <div className="bg-gradient-to-br from-teal-500 to-coral-500 rounded-2xl p-12 text-center text-white max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Questions About Your Order?
              </h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                If you have any questions about your complimentary dozen cookies or would like to place an additional order, we're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:mahalomorningskc@gmail.com?subject=Moore Homes Cookie Order Inquiry"
                  className="px-8 py-3 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30 text-center inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
                <Link 
                  to="/connect"
                  className="px-8 py-3 bg-white text-coral-500 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          </div>

          {/* Cookie Information */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About Our Cookies
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-coral-500" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Premium Quality</h4>
                <p className="text-gray-600">Every cookie is made with premium ingredients and traditional baking methods for exceptional taste and quality.</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-teal-500" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Professional Service</h4>
                <p className="text-gray-600">All cookies are baked fresh daily in small batches to ensure maximum freshness and flavor.</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-orange-500" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Personal Touch</h4>
                <p className="text-gray-600">Our unique recipes blend traditional baking with tropical flavors, bringing a taste of aloha to every bite.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AffinityPage;