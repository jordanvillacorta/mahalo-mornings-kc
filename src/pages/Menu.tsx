import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { menuItems, categories } from '../data/menuItems';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('breads');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [wordpressImages, setWordpressImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const SITE = 'mahalomornings.wordpress.com';
  const POSTS_URL = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE}/posts/?number=50`;

  async function loadPosts() {
    try {
      const res = await fetch(POSTS_URL);
      const json = await res.json();
      return json.posts.map((p: any) => ({
        id: p.ID,
        title: p.title,
        date: p.date,
        image: p.featured_image,     // full-size featured image
        excerpt: p.excerpt,          // HTML excerpt
        content: p.content,          // full HTML content
      }));
    } catch (error) {
      console.error('Error loading WordPress posts:', error);
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const posts = await loadPosts();
        // Filter posts that have featured images
        const postsWithImages = posts.filter(post => post.image);
        setWordpressImages(postsWithImages);
      } catch (error) {
        console.error('Error fetching WordPress data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Fallback images if WordPress media fails to load
  const fallbackImages = [
    {
      url: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      title: 'Artisan Croissants',
      alt: 'Golden flaky croissants',
      caption: 'Buttery, flaky croissants baked to golden perfection'
    },
    {
      url: 'https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      title: 'Artisan Breads',
      alt: 'Artisan breads',
      caption: 'Handcrafted loaves baked fresh daily'
    },
    {
      url: 'https://images.pexels.com/photos/1793525/pexels-photo-1793525.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      title: 'Sweet Treats',
      alt: 'Sweet treats',
      caption: 'Cookies, bars, and tropical-inspired desserts'
    },
    {
      url: 'https://images.pexels.com/photos/1510672/pexels-photo-1510672.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      title: 'Breakfast Delights',
      alt: 'Breakfast delights',
      caption: 'Perfect morning pastries and coffee companions'
    },
    {
      url: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      title: 'Tropical Flavors',
      alt: 'Tropical flavored pastries',
      caption: 'Island-inspired treats with exotic fruits'
    },
    {
      url: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      title: 'Coffee & Pastries',
      alt: 'Coffee and pastries',
      caption: 'Perfect pairings for your morning ritual'
    },
    {
      url: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      title: 'Specialty Cakes',
      alt: 'Specialty cakes',
      caption: 'Custom cakes for special occasions'
    },
    {
      url: 'https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      title: 'Fresh Ingredients',
      alt: 'Fresh baking ingredients',
      caption: 'Quality ingredients make all the difference'
    }
  ];

  // Define productImages based on available data
  const productImages = (() => {
    // Always ensure we have at least 5 images
    const minImages = 5;
    let images = [];
    
    // Start with WordPress images if available
    if (wordpressImages.length > 0) {
      images = [...wordpressImages];
    }
    
    // If we don't have enough images, add fallback images
    if (images.length < minImages) {
      const needed = minImages - images.length;
      images = [...images, ...fallbackImages.slice(0, needed)];
    }
    
    // If we still don't have enough (shouldn't happen), use all fallback images
    if (images.length < minImages) {
      images = fallbackImages.slice(0, minImages);
    }
    
    return images;
  })();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Clean HTML from caption if it exists
  const cleanCaption = (caption: string) => {
    if (!caption) return 'Freshly baked with love and island inspiration';
    // Decode HTML entities and clean HTML tags
    const textarea = document.createElement('textarea');
    textarea.innerHTML = caption.replace(/<[^>]*>/g, '');
    return textarea.value.trim() || 'Freshly baked with love and island inspiration';
  };

  // Clean HTML and decode entities from titles
  const cleanTitle = (title: string) => {
    if (!title) return 'Our Creation';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = title;
    return textarea.value.trim();
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Our Menu
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our collection of island-inspired baked goods, made fresh daily with love and authentic recipes
            </p>
          </div>

          {/* Category Tabs */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-6 rounded-2xl font-semibold transition-all duration-300 text-center ${
                  activeCategory === category.id
                    ? 'bg-coral-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-coral-50 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <div className="text-lg font-bold">{category.name}</div>
                <div className={`text-sm ${activeCategory === category.id ? 'text-coral-100' : 'text-gray-500'}`}>
                  {category.description}
                </div>
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative"
              >
                {item.popular && (
                  <div className="absolute -top-2 -right-2 bg-coral-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 pr-4">{item.name}</h3>
                  <span className="text-xl font-bold text-coral-500 whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Product Photo Carousel */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Creations
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Take a look at some of our beautiful baked goods, crafted with love and island inspiration
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500"></div>
                <p className="mt-4 text-gray-600">Loading our latest creations...</p>
              </div>
            ) : productImages.length > 0 ? (
              <div className="relative max-w-4xl mx-auto">
                {/* Main Carousel */}
                <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={productImages[currentImageIndex].image || productImages[currentImageIndex].url}
                    alt={productImages[currentImageIndex].title}
                    className="w-full h-full object-cover transition-all duration-500"
                    onError={(e) => {
                      // Fallback to a default image if the WordPress image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
                    }}
                  />
                  
                  {/* Overlay with product info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {cleanTitle(productImages[currentImageIndex].title)}
                    </h3>
                    <p className="text-lg text-gray-200">
                      {cleanCaption(productImages[currentImageIndex].excerpt || productImages[currentImageIndex].caption)}
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                  </button>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-2">
                  {productImages.map((image, index) => (
                    <button
                      key={image.id || index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'ring-4 ring-coral-500 scale-110'
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                      title={cleanTitle(image.title)}
                    >
                      <img
                        src={image.image || image.url}
                        alt={cleanTitle(image.title)}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = image.url || 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop';
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'bg-coral-500 scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No images available at the moment. Please check back soon!</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <div className="bg-teal-50 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Fresh Daily</h3>
              <p className="text-gray-600 mb-4">
                All our items are baked fresh daily using traditional recipes and the finest ingredients. Visit us early for the best selection!
              </p>
              <p className="text-sm text-gray-500">
                Prices subject to change. Special orders available with advance notice.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://mahalomorningskc.square.site"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Order Now
              </a>
              <Link 
                to="/location"
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Visit Our Store
              </Link>
            </div>
            
            {/* Custom Order Section */}
            <div className="mt-12 bg-gradient-to-br from-orange-100 to-coral-100 rounded-2xl p-8 max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Want a Custom Order?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Planning a special event or have a unique request? We'd love to create something special just for you! 
                From custom sizes to large orders for events, we're here to make your vision come to life.
              </p>
              <Link 
                to="/connect"
                className="inline-flex items-center gap-2 px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Let Us Know!
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;