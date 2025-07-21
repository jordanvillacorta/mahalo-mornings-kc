import React from 'react';
import { Heart, Award, Users, Clock, Leaf, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Born from a love of island living and artisanal baking, Mahalo Mornings brings together the best of Hawaiian hospitality and continental pastry traditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Bakery interior with tropical plants"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Aloha Spirit in Every Bite
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in _____ by Maddie Moore, Mahalo Mornings started as a dream to bring the flavors and warmth of Hawaiian mornings to the heart of Kansas. We use premium tropical ingredients, locally-sourced Kansas wheat, and traditional techniques passed down through generations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every morning, we wake up before sunrise to prepare fresh pastries, artisanal breads, and island-inspired treats that bring a taste of paradise to Olathe while honoring classic baking traditions.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From sunrise preparation to the moment you take your first bite
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4:00 AM Start</h3>
              <p className="text-gray-600">Our bakers arrive before dawn to begin the daily ritual of creating fresh pastries and breads</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fresh Ingredients</h3>
              <p className="text-gray-600">We source the finest tropical fruits, local wheat, and premium ingredients for authentic flavors</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-coral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-coral-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Traditional Methods</h3>
              <p className="text-gray-600">Using time-honored Hawaiian and European baking techniques passed down through generations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate team behind every delicious creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-coral-100 to-coral-200 flex items-center justify-center">
                <div className="w-16 h-16 bg-coral-300 rounded-full opacity-50"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Maddie Moore</h3>
              <p className="text-coral-500 font-medium mb-3">Founder & Head Baker</p>
              <p className="text-gray-600 text-sm">Information here</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-lg">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <div className="w-16 h-16 bg-teal-300 rounded-full opacity-50"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Team Member</h3>
              <p className="text-teal-500 font-medium mb-3">Pastry Chef</p>
              <p className="text-gray-600 text-sm">Information here</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-lg">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="w-16 h-16 bg-orange-300 rounded-full opacity-50"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Team Member</h3>
              <p className="text-orange-500 font-medium mb-3">Bread Artisan</p>
              <p className="text-gray-600 text-sm">Information here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;