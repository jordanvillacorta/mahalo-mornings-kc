import React, { useState } from 'react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('pastries');

  const menuItems = {
    pastries: [
      { name: 'Haupia Croissant', description: 'Buttery croissant filled with coconut haupia cream', price: '$4.50' },
      { name: 'Guava Danish', description: 'Flaky pastry with sweet guava filling and cream cheese', price: '$3.75' },
      { name: 'Malasada Bites', description: 'Portuguese donuts dusted with cinnamon sugar', price: '$6.00' },
      { name: 'Passion Fruit Tart', description: 'Crisp shell filled with tangy passion fruit curd', price: '$5.25' },
      { name: 'Coconut Macaroon', description: 'Chewy coconut cookies dipped in dark chocolate', price: '$2.50' },
      { name: 'Banana Bread Muffin', description: 'Moist muffin with local bananas and macadamia nuts', price: '$3.25' }
    ],
    breads: [
      { name: 'Taro Sourdough', description: 'Purple-hued sourdough made with local taro root', price: '$8.00' },
      { name: 'Sweet Potato Rolls', description: 'Soft dinner rolls with Okinawan sweet potato', price: '$1.75' },
      { name: 'Coconut Challah', description: 'Braided bread with coconut milk and shredded coconut', price: '$12.00' },
      { name: 'Macadamia Focaccia', description: 'Herb-topped flatbread with roasted macadamia nuts', price: '$6.50' },
      { name: 'Pineapple Upside-Down Loaf', description: 'Sweet bread with caramelized pineapple', price: '$14.00' }
    ],
    beverages: [
      { name: 'Kona Coffee', description: '100% Hawaiian coffee, medium roast', price: '$3.50' },
      { name: 'Hibiscus Iced Tea', description: 'Refreshing herbal tea with tropical fruits', price: '$2.75' },
      { name: 'Coconut Cold Brew', description: 'Cold brew coffee with coconut milk', price: '$4.25' },
      { name: 'Lilikoi Lemonade', description: 'Fresh lemonade with passion fruit', price: '$3.00' },
      { name: 'Matcha Latte', description: 'Ceremonial grade matcha with oat milk', price: '$4.75' },
      { name: 'Pineapple Ginger Juice', description: 'Fresh pressed with local ingredients', price: '$3.25' }
    ],
    specialties: [
      { name: 'Açaí Bowl', description: 'Açaí topped with granola, fresh fruit, and coconut', price: '$9.50' },
      { name: 'Spam Musubi Sandwich', description: 'Island-style breakfast sandwich on brioche', price: '$7.25' },
      { name: 'Tropical Parfait', description: 'Yogurt layered with granola and tropical fruits', price: '$6.75' },
      { name: 'Loco Moco Pastry', description: 'Savory pastry inspired by the classic dish', price: '$8.50' },
      { name: 'Haupia Pie Slice', description: 'Traditional coconut pie with graham crust', price: '$4.25' }
    ]
  };

  const categories = [
    { id: 'pastries', name: 'Pastries', emoji: '🥐' },
    { id: 'breads', name: 'Breads', emoji: '🍞' },
    { id: 'beverages', name: 'Beverages', emoji: '☕' },
    { id: 'specialties', name: 'Specialties', emoji: '🌺' }
  ];

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our collection of island-inspired baked goods and beverages, made fresh daily with local ingredients
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-coral-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-coral-50 shadow-md'
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <span className="text-xl font-bold text-coral-500">{item.price}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All prices subject to change. Ask about our daily specials and seasonal items!
          </p>
          <button className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Order Online
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;