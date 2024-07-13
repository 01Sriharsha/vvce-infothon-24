// src/components/HomePage.js

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="bg-teal-700 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4">
          A one <span className='text-teal-400'>stop</span> portal for Placements & Internships
          </h1>
          <div className='mb-6'>
          <h2 className='text-xl'>Welcome to the recruitment website for 
          JobSeek.</h2>
          </div>
          <div>
          <p className="text-lg mb-8">
          JobSeek is Indias foremost industrial leadership development website. Our graduates are a combination of rigorous thinking, hardwork and fundamental stronghold. They are nurtured to strive for excellence and deliver impact in their field of work. Let us begin...
          </p>
          </div>
          <Link href="/about">
            <button className="bg-white text-teal-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition">
              Learn More
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 ml-16">
          <Image
            src="/images/hero.png"
            alt="Hero Image"
            width={500}
            height={500}
            layout="responsive"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">Real-Time Slot Viewing</h3>
              <p className="text-gray-700">
                Check available interview slots in real-time and avoid scheduling conflicts.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">Easy Slot Booking</h3>
              <p className="text-gray-700">
                Book your preferred time slots with just a few clicks.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">Instant Confirmations</h3>
              <p className="text-gray-700">
                Receive instant confirmations and reminders about your interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-teal-700 text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join us now and streamline your interview scheduling process today!
          </p>
          <a href="/signup" className="bg-white text-teal-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition">
            Sign Up
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-4 text-center">
        <p className="text-sm">
          &copy; 2024 Interview Scheduler. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
