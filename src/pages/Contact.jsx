import { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      details: 'info@codeforall.org',
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: '(123) 456-7890',
      description: 'Monday to Friday, 9 AM to 6 PM EST'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      details: '123 Code Street, Tech City, TC 12345',
      description: 'Our main campus and community center'
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      details: 'Mon-Fri: 9 AM - 6 PM',
      description: 'Weekend support available online'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'enrollment', label: 'Course Enrollment' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'career', label: 'Career Services' },
    { value: 'other', label: 'Other' }
  ];

  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'You can enroll in any of our courses by visiting the Events page and clicking the "Register" button for your desired course. You can also contact us directly for personalized guidance.'
    },
    {
      question: 'Do you offer financial assistance?',
      answer: 'Yes, we offer various financial assistance programs including scholarships, payment plans, and income-share agreements. Contact us to learn more about available options.'
    },
    {
      question: 'What are the prerequisites for your courses?',
      answer: 'Prerequisites vary by course. Most beginner courses require no prior experience, while advanced courses may require specific knowledge. Check individual course descriptions for details.'
    },
    {
      question: 'Do you provide job placement assistance?',
      answer: 'Absolutely! We offer comprehensive career services including resume review, interview preparation, and connections with our hiring partners. Our job placement rate is 95%.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Have questions about our courses or need help getting started? 
              We're here to help you on your coding journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-primary-600 font-medium mb-1">{info.details}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Message sent successfully! We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <QuestionMarkCircleIcon className="h-6 w-6 text-primary-600 mr-2" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary-50 rounded-lg">
                <div className="flex items-start">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Still have questions?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Can't find the answer you're looking for? Our support team is here to help.
                    </p>
                    <a href="mailto:support@codeforall.org" className="btn-primary text-sm">
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">Visit our main campus and community center</p>
          </div>
          
          <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPinIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map would be embedded here</p>
              <p className="text-sm text-gray-500 mt-2">123 Code Street, Tech City, TC 12345</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;