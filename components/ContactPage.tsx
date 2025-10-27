import React from 'react';
import ContactForm from './ContactForm';
import LocationMarkerIcon from './icons/LocationMarkerIcon';
import PhoneIcon from './icons/PhoneIcon';
import MailIcon from './icons/MailIcon';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import InstagramIcon from './icons/InstagramIcon';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600">We'd love to hear from you. Here's how you can reach us.</p>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          {/* Top Section: Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <p className="mt-2 text-gray-600">Our team is available to help answer your questions.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex items-start">
                <LocationMarkerIcon />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Our Office</h3>
                  <p className="text-gray-600">123 Fashion Ave, New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneIcon />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">Sales: (212) 555-0123</p>
                  <p className="text-gray-600">Support: (212) 555-0124</p>
                </div>
              </div>
              <div className="flex items-start">
                <MailIcon />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">contact@polo.com</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 flex items-start">Follow Us</h3>
                 <div className="mt-2 flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors"><FacebookIcon /></a>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors"><TwitterIcon /></a>
                  <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors"><InstagramIcon /></a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section: Map and Form */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Location</h2>
              <div className="mt-4 aspect-video rounded-lg overflow-hidden shadow-md">
                 <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.622959885882!2d-73.98785368459388!3d40.74844097932787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1678886456789!5m2!1sen!2sus"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;