import { useState } from 'react';
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  MapPinIcon,
  UserGroupIcon,
  TagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const eventCategories = [
    { id: 'all', name: 'All Events' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'bootcamp', name: 'Bootcamps' },
    { id: 'webinar', name: 'Webinars' },
    { id: 'hackathon', name: 'Hackathons' }
  ];

  const events = [
    {
      id: 1,
      title: 'JavaScript Fundamentals Workshop',
      category: 'workshop',
      date: '2024-10-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Online',
      capacity: 30,
      registered: 18,
      price: 'Free',
      level: 'Beginner',
      description: 'Learn the basics of JavaScript programming including variables, functions, and DOM manipulation.',
      instructor: 'Sarah Johnson',
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'Full Stack Web Development Bootcamp',
      category: 'bootcamp',
      date: '2024-10-20',
      time: '9:00 AM - 5:00 PM',
      location: 'Tech Center, Downtown',
      capacity: 25,
      registered: 22,
      price: '$299',
      level: 'Intermediate',
      description: 'Intensive 12-week bootcamp covering React, Node.js, databases, and deployment strategies.',
      instructor: 'Michael Chen',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      category: 'webinar',
      date: '2024-10-18',
      time: '7:00 PM - 8:30 PM',
      location: 'Online',
      capacity: 100,
      registered: 67,
      price: 'Free',
      level: 'Intermediate',
      description: 'Explore data analysis and visualization using Python libraries like Pandas and Matplotlib.',
      instructor: 'Dr. Emily Rodriguez',
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: 'AI Innovation Hackathon',
      category: 'hackathon',
      date: '2024-10-25',
      time: '48 Hours',
      location: 'Innovation Hub',
      capacity: 80,
      registered: 45,
      price: '$50',
      level: 'Advanced',
      description: '48-hour hackathon focused on building AI-powered solutions for real-world problems.',
      instructor: 'Team Event',
      image: '/api/placeholder/400/250'
    },
    {
      id: 5,
      title: 'React Native Mobile Development',
      category: 'workshop',
      date: '2024-10-22',
      time: '2:00 PM - 6:00 PM',
      location: 'Online',
      capacity: 40,
      registered: 28,
      price: '$99',
      level: 'Intermediate',
      description: 'Build cross-platform mobile apps using React Native and learn deployment strategies.',
      instructor: 'Alex Thompson',
      image: '/api/placeholder/400/250'
    },
    {
      id: 6,
      title: 'Cybersecurity Fundamentals',
      category: 'webinar',
      date: '2024-10-30',
      time: '6:00 PM - 7:30 PM',
      location: 'Online',
      capacity: 150,
      registered: 89,
      price: 'Free',
      level: 'Beginner',
      description: 'Introduction to cybersecurity concepts, common threats, and protection strategies.',
      instructor: 'James Wilson',
      image: '/api/placeholder/400/250'
    }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.category === activeFilter);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Join our workshops, bootcamps, and community events to accelerate your coding journey. 
              Learn from industry experts and connect with fellow developers.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {eventCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  activeFilter === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="card group hover:scale-105 transition-transform duration-300">
                <div className="relative mb-4">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(event.level)}`}>
                      {event.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                      {event.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TagIcon className="h-4 w-4" />
                    <span className="capitalize">{event.category}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserGroupIcon className="h-4 w-4" />
                      <span>{event.registered}/{event.capacity} registered</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Instructor: {event.instructor}
                      </span>
                      <button className="btn-primary text-sm py-2 px-4 inline-flex items-center">
                        Register
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDaysIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try selecting a different category or check back later for new events.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Miss an Event
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified about upcoming workshops, 
            bootcamps, and special events.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button className="btn-secondary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;