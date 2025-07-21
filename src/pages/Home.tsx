import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Award, Users, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Fresh baked goods and pastries"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-orange-800/50 to-teal-900/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Mahalo
            <span className="block text-teal-200">Mornings</span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8 leading-relaxed">
            An artisan bakery serving delicious pastries, and comfort foods! Mahalo means thankful, and we believe we should be grateful for every morning! 🌺
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-white">
              <MapPin size={20} className="text-teal-300" />
              <span>Lenexa, Kansas</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Clock size={20} className="text-teal-300" />
              <span>Tue-Sat 8:00 AM - 2:00 PM</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/menu"
              className="px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Menu
            </Link>
            <Link 
              to="/location"
              className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30"
            >
              Find Us
            </Link>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose Mahalo Mornings?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of Hawaiian hospitality and artisanal baking
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Premium Quality</h4>
              <p className="text-gray-600">Every pastry is crafted with care, using traditional methods and the finest ingredients</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-coral-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Made with Love</h4>
              <p className="text-gray-600">From our family to yours, each creation is handcrafted with passion and attention to detail. We believe that love is the secret ingredient that makes everything taste better.</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Community First</h4>
              <p className="text-gray-600">Proudly supporting local farmers and giving back to our community</p>
            </div>
          </div>

          {/* Featured Items */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Fresh pastries display"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Fresh Daily Selections
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Start your morning with our signature Haupia Croissants, tropical fruit tarts, and freshly brewed Kona coffee. Each item is prepared before dawn using authentic Hawaiian recipes and locally-sourced ingredients.
              </p>
              <Link 
                to="/menu"
                className="inline-flex items-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Our Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;