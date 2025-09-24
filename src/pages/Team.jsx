import { 
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & Lead Instructor',
      specialization: 'Full Stack Development',
      experience: '8+ years',
      image: '/api/placeholder/300/300',
      bio: 'Former Google software engineer passionate about making coding education accessible to everyone. Specializes in JavaScript, React, and Node.js.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Instructor',
      specialization: 'Backend Development',
      experience: '6+ years',
      image: '/api/placeholder/300/300',
      bio: 'Expert in backend technologies and database design. Previously worked at Microsoft and several startups. Loves teaching system design and architecture.',
      skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      role: 'Data Science Instructor',
      specialization: 'Machine Learning & AI',
      experience: '10+ years',
      image: '/api/placeholder/300/300',
      bio: 'PhD in Computer Science with extensive research in machine learning. Former data scientist at Tesla. Passionate about making AI accessible.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'R', 'SQL'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 4,
      name: 'Alex Thompson',
      role: 'Mobile Development Instructor',
      specialization: 'iOS & Android Development',
      experience: '7+ years',
      image: '/api/placeholder/300/300',
      bio: 'Mobile app developer with apps downloaded over 1M times. Expert in both native and cross-platform development.',
      skills: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 5,
      name: 'James Wilson',
      role: 'Cybersecurity Instructor',
      specialization: 'Information Security',
      experience: '12+ years',
      image: '/api/placeholder/300/300',
      bio: 'Certified Ethical Hacker and security consultant. Former security analyst at major financial institutions. Expert in penetration testing.',
      skills: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Linux', 'Python'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      id: 6,
      name: 'Lisa Park',
      role: 'UX/UI Design Instructor',
      specialization: 'User Experience Design',
      experience: '9+ years',
      image: '/api/placeholder/300/300',
      bio: 'Award-winning designer with experience at top design agencies. Passionate about creating intuitive and beautiful user experiences.',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    }
  ];

  const stats = [
    {
      icon: AcademicCapIcon,
      number: '15+',
      label: 'Expert Instructors',
      description: 'Industry professionals with real-world experience'
    },
    {
      icon: BriefcaseIcon,
      number: '100+',
      label: 'Years Combined Experience',
      description: 'Collective expertise from top tech companies'
    },
    {
      icon: HeartIcon,
      number: '1000+',
      label: 'Students Mentored',
      description: 'Lives changed through personalized guidance'
    },
    {
      icon: StarIcon,
      number: '4.9/5',
      label: 'Average Rating',
      description: 'Consistently high student satisfaction scores'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Learn from industry experts who are passionate about teaching and 
              committed to your success. Our instructors bring real-world experience 
              from top tech companies.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Expert Instructors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each member of our team brings unique expertise and a passion for teaching. 
              They're here to guide you through your coding journey with personalized support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="card group hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-1">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.specialization}</p>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span>{member.experience}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-4 pt-4 border-t border-gray-100">
                  <a 
                    href={member.social.linkedin} 
                    className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href={member.social.github} 
                    className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href={member.social.twitter} 
                    className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate educators and industry experts 
            to join our mission of making coding education accessible to all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-secondary">
              View Open Positions
            </a>
            <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;