import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/1793525/pexels-photo-1793525.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Tropical breakfast setting"
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
          Island-inspired bakery bringing you fresh pastries, tropical flavors, and the spirit of aloha every morning
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2 text-white">
            <MapPin size={20} className="text-teal-300" />
            <span>Olathe, Kansas</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Clock size={20} className="text-teal-300" />
            <span>Open Daily 6:00 AM - 2:00 PM</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Menu
          </button>
          <button 
            onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30"
          >
            Find Us
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-50 to-transparent z-10"></div>
    </section>
  );
};

export default Hero;