import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart, Clock, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="max-w-4xl mx-auto">
          {/* Brand Section */}
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center space-x-3 mb-4">
              <img 
                src="https://00a7c639c65ed95d3e4c.cdn6.editmysite.com/uploads/b/00a7c639c65ed95d3e4ce3d12d319434fc63767556c5c50cf2af23fdcac41739/Untitled%20design.png_1742504035.png?width=2400&optimize=medium"
                alt="Mahalo Mornings Logo"
                className="h-12 w-auto"
              />
              <h3 className="text-3xl font-bold">Mahalo Mornings</h3>
            </Link>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              A bakery serving the best pastries and comfort foods! Mahalo means thankful, and we believe every new morning is something to be grateful for! 🌺
            </p>
          </div>

          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Location & Contact */}
            <div className="bg-gray-700/50 rounded-2xl p-6">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-coral-400" />
                Kitchen Location
              </h4>
              <a 
                href="https://maps.google.com/?q=17450+West+87th+Street+Parkway,+Lenexa,+Kansas+66219"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 mb-4 block hover:text-coral-400 transition-colors duration-200 cursor-pointer"
              >
                17450 West 87th Street Parkway<br />
                Lenexa, Kansas 66219
              </a>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4 text-teal-400" />
                <a 
                  href="mailto:mahalomorningskc@gmail.com"
                  className="hover:text-coral-400 transition-colors duration-200"
                >
                  mahalomorningskc@gmail.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-gray-700/50 rounded-2xl p-6">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-teal-400" />
                Hours
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tue - Sat</span>
                  <span className="text-coral-400 font-medium">8AM - 2PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href="https://www.google.com/search?sca_esv=b428ec610e3a7588&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E8IiW4TqalvD0E8KNHKQI28uRILc4Vk0LoSbVAYHUvJsp4mGyTwSQJiPfrq4HWNa27O2eh69ayNKEbkw4iqX-Ki81W7p&q=Mahalo+Mornings+Reviews&sa=X&ved=2ahUKEwisj9zvsIuOAxX74MkDHdskI-oQ0bkNegQIKBAE&biw=1920&bih=968&dpr=1#lrd=0x87c095470ddcb80b:0x6ea2e42755bca09,3,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Star className="w-5 h-5" />
              Leave a Google Review
            </a>
          </div>
          <p className="text-gray-400 flex items-center justify-center gap-2">
            © 2024 Mahalo Mornings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;