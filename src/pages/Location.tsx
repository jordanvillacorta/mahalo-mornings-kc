import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Mail, Car, Bus, Bike, Star, Calendar, Navigation } from 'lucide-react';

interface PopupEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  caption: string;
  imageUrl: string | null;
}

const Location = () => {
  const [popups, setPopups] = useState<PopupEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPopups() {
      try {
        // Helper function to decode HTML entities
        const decodeHtmlEntities = (text: string) => {
          const textarea = document.createElement('textarea');
          textarea.innerHTML = text;
          return textarea.value;
        };

        const res = await fetch("https://public-api.wordpress.com/wp/v2/sites/mahalomornings.wordpress.com/pages?per_page=100&_embed");
        const pages = await res.json();

        // 1. Filter by title prefix
        const popupPages = pages.filter((p: any) =>
          p.title.rendered.startsWith('Pop-up:')
        );

        // 2. Map into a cleaner shape
        const parsed = popupPages.map((p: any) => {
          // Grab the raw HTML content
          const html = p.content.rendered;

          // Use simple regex to pull Date, Location, Caption
          const dateMatch = html.match(/<strong>Date:<\/strong>(?:<[^>]*>)*\s*([^<]+)/i);
          const locationMatch = html.match(/<strong>Location:<\/strong>(?:<[^>]*>)*\s*([^<]+)/i);
          const captionMatch = html.match(/<strong>Caption:<\/strong>\s*([^<]+)/i);

          // Featured image (if they used "Set featured image")
          const imgUrl = p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

          return {
            id: p.id,
            title: decodeHtmlEntities(p.title.rendered.replace('Pop-up:', '').trim()),
            date: dateMatch?.[1] ? decodeHtmlEntities(dateMatch[1].trim()) : 'TBD',
            location: locationMatch?.[1] ? decodeHtmlEntities(locationMatch[1].trim()) : 'TBD',
            caption: captionMatch?.[1] ? decodeHtmlEntities(captionMatch[1].trim()) : '',
            imageUrl: imgUrl,
          };
        });

        // Filter out events with past dates
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set to start of today
        
        const futureEvents = parsed.filter(event => {
          if (event.date === 'TBD') return true; // Keep TBD events
          
          const eventDate = new Date(event.date);
          // If date parsing fails, keep the event
          if (isNaN(eventDate.getTime())) return true;
          
          eventDate.setHours(0, 0, 0, 0); // Set to start of event day
          return eventDate >= currentDate; // Keep if today or future
        });

        // Sort events by date (earliest first)
        futureEvents.sort((a, b) => {
          // Handle TBD dates by putting them at the end
          if (a.date === 'TBD' && b.date === 'TBD') return 0;
          if (a.date === 'TBD') return 1;
          if (b.date === 'TBD') return -1;

          // Try to parse dates for comparison
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          // If dates are invalid, fall back to string comparison
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return a.date.localeCompare(b.date);
          }

          return dateA.getTime() - dateB.getTime();
        });

        setPopups(futureEvents);
      } catch (error) {
        console.error('Error loading pop-up events:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPopups();
  }, []);

  const hours = [
    { day: 'Monday', time: 'Closed' },
    { day: 'Tuesday - Saturday', time: '8:00 AM - 2:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Visit Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find us in Lenexa, where island vibes meet Kansas hospitality
            </p>
          </div>

          {/* Events Summary Section */}
          {!loading && (
            popups.length > 0 ? (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16 w-full">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Upcoming Dates</h2>
                <p className="text-lg text-gray-600">
                  Find us around the Kansas City area at these special events
                </p>
              </div>
              
              <div className="space-y-3">
                {popups.slice(0, 8).map((event, index) => (
                  <div key={event.id} className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-coral-50 border border-gray-100`}>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-coral-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-teal-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {popups.length > 8 && (
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    And {popups.length - 8} more event{popups.length - 8 !== 1 ? 's' : ''} below!
                  </p>
                </div>
              )}
            </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16 w-full text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Check back for upcoming events!</h2>
                <p className="text-gray-600">
                  We don't have any pop-up events scheduled at the moment, but we're always planning something special. Follow us on social media to be the first to know!
                </p>
              </div>
            )
          )}

          <div className="w-full">
            {/* Location Info */}
            <div className="w-full">
              <div className="w-full">
                <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-none">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-coral-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Kitchen Location</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <a 
                        href="https://maps.google.com/?q=17450+West+87th+Street+Parkway,+Lenexa,+KS+66219"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-lg text-gray-700 hover:text-coral-500 transition-colors duration-200 cursor-pointer"
                      >
                        <strong>17450 West 87th Street Parkway</strong><br />
                        Lenexa, Kansas 66219
                      </a>
                    </div>
                    <div>
                      <img 
                        src="https://images.pexels.com/photos/1129510/pexels-photo-1129510.jpeg"
                        alt="Mahalo Mornings bakery storefront"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pop-up Events Section */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Upcoming Pop-up Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find us around the Kansas City area at special events and farmers markets
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500"></div>
              <p className="mt-4 text-gray-600">Loading upcoming events...</p>
            </div>
          ) : popups.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {popups.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  {event.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{event.title}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-coral-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-coral-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Date</p>
                          <p className="text-gray-600">{event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                          <Navigation className="w-4 h-4 text-teal-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Location</p>
                          <p className="text-gray-600">{event.location}</p>
                        </div>
                      </div>
                    </div>
                    {event.caption && (
                      <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                        <p className="text-gray-700 text-sm">{event.caption}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Upcoming Events</h3>
              <p className="text-gray-600 mb-6">
                We don't have any pop-up events scheduled at the moment, but check back soon or follow us on social media for updates!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/connect"
                  className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                  Follow Us for Updates
                </Link>
                <a 
                  href="https://maps.google.com/?q=17450+West+87th+Street+Parkway,+Lenexa,+Kansas+66219"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                  Visit Our Main Location
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-coral-500 to-teal-500 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Questions? We're Here to Help!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Email us or stop by for a chat and a fresh pastry
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:mahalomorningskc@gmail.com"
                className="px-8 py-3 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm border border-white/30 text-center"
              >
                Send Email
              </a>
              <Link 
                to="/connect"
                className="px-8 py-3 bg-white text-coral-500 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 text-center"
              >
                Connect With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;