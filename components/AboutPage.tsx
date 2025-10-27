import React from 'react';
import { Page } from '../App';
import LocationMarkerIcon from './icons/LocationMarkerIcon';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const stores = [
  {
    name: 'New York Flagship',
    address: '123 Fashion Ave, New York, NY 10001',
    phone: '(212) 555-0123',
    hours: 'Mon-Sat: 10am - 8pm, Sun: 11am - 7pm',
  },
  {
    name: 'Los Angeles Boutique',
    address: '456 Style Blvd, Beverly Hills, CA 90210',
    phone: '(310) 555-0456',
    hours: 'Mon-Sat: 11am - 9pm, Sun: 12pm - 6pm',
  },
  {
    name: 'Chicago Store',
    address: '789 Heritage Rd, Chicago, IL 60611',
    phone: '(312) 555-0789',
    hours: 'Mon-Sat: 10am - 7pm, Sun: 11am - 6pm',
  },
];

const teamMembers = [
    { name: 'John Doe', role: 'Founder & CEO', imageUrl: 'https://picsum.photos/400/400?random=41' },
    { name: 'Jane Smith', role: 'Lead Designer', imageUrl: 'https://picsum.photos/400/400?random=42' },
    { name: 'Mike Johnson', role: 'Head of Operations', imageUrl: 'https://picsum.photos/400/400?random=43' },
    { name: 'Emily White', role: 'Marketing Director', imageUrl: 'https://picsum.photos/400/400?random=44' },
];

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-800 py-24 sm:py-32">
        <img
          src="https://picsum.photos/1920/1080?grayscale&blur=1"
          alt="Abstract background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About POLO</h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Crafting timeless style with a modern sensibility since 1985.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Story</h2>
                <p className="mt-4 text-gray-600">
                Founded on the principles of quality craftsmanship and enduring design, POLO began as a small workshop dedicated to creating the perfect polo shirt. Over the decades, we've grown into a globally recognized brand, but our core mission remains unchanged: to provide our customers with high-quality, versatile pieces that become staples in their wardrobe.
                </p>
                <p className="mt-4 text-gray-600">
                We believe in style that transcends seasons and trends. Our collections are thoughtfully designed in-house, using only the finest materials sourced from around the world. From the initial sketch to the final stitch, every garment is a testament to our commitment to excellence.
                </p>
            </div>
            <div className="mt-10 lg:mt-0">
                <img src="https://picsum.photos/600/500?random=50" alt="Fashion workshop" className="rounded-lg shadow-xl"/>
            </div>
        </div>
      </div>

      {/* Our Stores Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Visit Our Stores</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Experience the world of POLO in person at one of our flagship locations.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {stores.map((store) => (
              <div key={store.name} className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5">
                <div className="flex items-center gap-x-4">
                  <LocationMarkerIcon/>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{store.name}</h3>
                </div>
                <div className="mt-6 flex flex-col gap-y-2 text-sm leading-6 text-gray-600">
                  <p><span className="font-semibold">Address:</span> {store.address}</p>
                  <p><span className="font-semibold">Phone:</span> {store.phone}</p>
                  <p><span className="font-semibold">Hours:</span> {store.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Meet the Team Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet the Team</h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">The passionate individuals behind our brand.</p>
            </div>
            <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-4"
          >
            {teamMembers.map((person) => (
              <li key={person.name}>
                <img className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt="" />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to find your style?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-300">
            Explore our latest collection and discover pieces you'll love for years to come.
            </p>
            <div className="mt-10">
                <button
                    onClick={() => onNavigate('shop')}
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    Shop Now
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
