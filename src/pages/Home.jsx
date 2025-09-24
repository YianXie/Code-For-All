import { Link } from 'react-router-dom';
import { 
  CodeBracketIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      icon: CodeBracketIcon,
      title: 'Learn to Code',
      description: 'Master programming languages with our comprehensive curriculum designed for all skill levels.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Support',
      description: 'Join a vibrant community of learners and mentors who support each other\'s coding journey.'
    },
    {
      icon: AcademicCapIcon,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience in software development.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Real Projects',
      description: 'Build portfolio-worthy projects that demonstrate your skills to potential employers.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Students Taught' },
    { number: '50+', label: 'Courses Available' },
    { number: '95%', label: 'Job Placement Rate' },
    { number: '24/7', label: 'Community Support' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer at Google',
      content: 'Code For All transformed my career. The hands-on approach and supportive community made learning to code enjoyable and effective.',
      image: '/api/placeholder/64/64'
    },
    {
      name: 'Michael Chen',
      role: 'Full Stack Developer',
      content: 'The instructors are amazing and the curriculum is up-to-date with industry standards. I landed my dream job within 3 months!',
      image: '/api/placeholder/64/64'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Frontend Developer',
      content: 'From zero coding experience to building complex applications. Code For All made the impossible possible for me.',
      image: '/api/placeholder/64/64'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Learn to Code,
                <span className="text-primary-200"> Change Your Life</span>
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Join thousands of students who have transformed their careers through our 
                comprehensive coding bootcamps and community-driven learning approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/events" className="btn-secondary inline-flex items-center justify-center">
                  View Upcoming Events
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                  Get Started Today
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="flex items-center mb-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-green-400">
                    <span className="text-blue-400">function</span> <span className="text-yellow-400">changeLife</span>() {'{'}
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-blue-300">skills</span> = <span className="text-orange-400">learnCoding</span>();
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-blue-300">career</span> = <span className="text-orange-400">buildProjects</span>(skills);
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-300">'Dream Job Achieved!'</span>;
                    <br />
                    {'}'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Code For All?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in your coding journey, 
              from beginner-friendly courses to advanced project-based learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our graduates who have transformed their careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join our community today and take the first step towards a rewarding career in technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events" className="btn-secondary">
              Browse Courses
            </Link>
            <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;