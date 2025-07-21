import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, Youtube, Mail, Bell } from 'lucide-react';

const Social = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
  };

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', url: '#', color: 'bg-pink-500', followers: '12.5K' },
    { icon: Facebook, name: 'Facebook', url: '#', color: 'bg-blue-600', followers: '8.2K' }
  ];

  return (
    <section id="social" className="py-20 bg-gradient-to-b from-white to-coral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow us for daily specials, behind-the-scenes content, and island inspiration
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Social Media Links */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 ${social.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <social.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{social.name}</h3>
                <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200">
                  Follow
                </button>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Newsletter</h3>
              <p className="text-gray-600">
                Get the latest updates on new menu items, special events, and exclusive offers delivered to your inbox
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {isSubscribed && (
              <div className="mt-4 text-center">
                <p className="text-green-600 font-medium">Thank you for subscribing! 🌺</p>
              </div>
            )}
          </div>

          {/* User Generated Content */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
              Share Your Mahalo Moments
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'https://images.pexels.com/photos/1510672/pexels-photo-1510672.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                'https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                'https://images.pexels.com/photos/1793525/pexels-photo-1793525.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
              ].map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <img
                    src={image}
                    alt={`Customer photo ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Tag us <span className="font-semibold text-coral-500">#MahaloMornings</span> for a chance to be featured!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Social;