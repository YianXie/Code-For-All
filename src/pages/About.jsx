import { 
  HeartIcon, 
  LightBulbIcon, 
  UserGroupIcon,
  AcademicCapIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const values = [
    {
      icon: HeartIcon,
      title: 'Inclusive Learning',
      description: 'We believe coding education should be accessible to everyone, regardless of background or experience level.'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We constantly update our curriculum to reflect the latest industry trends and technologies.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community First',
      description: 'Our supportive community helps students learn from each other and grow together.'
    },
    {
      icon: AcademicCapIcon,
      title: 'Quality Education',
      description: 'We maintain high standards in our teaching methods and course content.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Code For All founded with a mission to democratize coding education' },
    { year: '2021', event: 'Launched our first online bootcamp with 50 students' },
    { year: '2022', event: 'Expanded to 5 different programming languages and frameworks' },
    { year: '2023', event: 'Reached 1000+ graduates with 95% job placement rate' },
    { year: '2024', event: 'Opened community centers in 3 major cities' }
  ];

  const achievements = [
    'Over 1000 students successfully placed in tech jobs',
    'Partnerships with 50+ leading tech companies',
    'Average salary increase of 150% for our graduates',
    '95% student satisfaction rate',
    'Recognized as "Best Coding Bootcamp" by TechEducation Awards'
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Code For All
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              We're on a mission to make quality coding education accessible to everyone, 
              breaking down barriers and building bridges to successful tech careers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At Code For All, we believe that everyone deserves the opportunity to learn coding 
                and build a successful career in technology. We're committed to providing 
                high-quality, accessible education that transforms lives and communities.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our comprehensive programs combine theoretical knowledge with hands-on practice, 
                ensuring our students are job-ready from day one. We don't just teach code – 
                we build confident, capable developers.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">1K+</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lives Changed</p>
                  <p className="text-gray-600">Through coding education</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-primary-100 mb-6">
                  To create a world where anyone, anywhere can access quality coding education 
                  and build a fulfilling career in technology.
                </p>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-sm font-medium">
                    "Education is the most powerful weapon which you can use to change the world." 
                    - Nelson Mandela
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape the learning experience we provide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From a small idea to a thriving community of learners
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary-200"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} ml-12 md:ml-0`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We're proud of what we've accomplished together with our amazing community.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-secondary-400 flex-shrink-0 mt-1" />
                  <p className="text-primary-100">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of a community that's changing lives through coding education. 
            Your journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/events" className="btn-primary">
              Explore Programs
            </a>
            <a href="/contact" className="btn-outline">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;