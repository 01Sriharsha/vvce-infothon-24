import React from 'react';
import { MapPin, CirclePlay, BadgeIndianRupee, Briefcase, Hourglass, ClipboardCheck, Shapes } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JobDescription = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md my-10"> {/* Increased card size */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Graphic Designer Job</h1>
        <div className="text-teal-500 font-semibold">Actively hiring</div>
      </div>
      <div className="mb-4">
        <p className="text-lg font-medium">Reflex Realty LLP</p>
        <div className='flex items-center'>
          <MapPin />
          <p className="text-gray-600 ml-2">Mumbai</p> {/* Added margin for spacing */}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <div className='flex items-center'>
            <CirclePlay />
            <p className="text-gray-600 ml-2">Start Date</p>
          </div>
          <p>Immediately</p>
        </div>
        <div>
          <div className='flex items-center'>
            <BadgeIndianRupee />
            <p className="text-gray-600 ml-2">CTC (ANNUAL)</p>
          </div>
          <p>₹ 2,00,000 - 2,50,000</p>
        </div>
        <div>
          <div className='flex items-center'>
            <Briefcase />
            <p className="text-gray-600 ml-2">Experience</p>
          </div>
          <p>1-5 years</p>
        </div>
        <div>
          <div className='flex items-center'>
            <Hourglass />
            <p className="text-gray-600 ml-2">Apply By</p>
          </div>
          <p>5 Aug 24</p>
        </div>
        <div>
          <div className='flex items-center'>
            <ClipboardCheck />
            <p className="text-gray-600 ml-2">Posted</p>
          </div>
          <p>7 days ago</p>
        </div>
        <div>
          <div className='flex items-center'>
            <Shapes />
            <p className="text-gray-600 ml-2">Job Type</p>
          </div>
          <p>Full-time</p>
        </div>
      </div>
      <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
        <p className="font-semibold">Be an early applicant</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">About the job</h2>
        <p className="text-gray-700 mb-2">
          We are seeking a talented and creative graphic designer to join our team at Reflex Realty LLP! If you have a passion for design and are skilled in video editing, Adobe Illustrator, Adobe Photoshop, and Adobe Premiere Pro, we want to hear from you. As our graphic designer, you will have the opportunity to work on a variety of exciting projects and gain hands-on experience in a fast-paced real estate environment.
        </p>
        <h3 className="text-lg font-semibold mb-2">Key Responsibilities:</h3>
        <ol className="list-decimal list-inside text-gray-700 mb-4">
          <li>Engage with customers to understand their current processes and gather detailed requirements.</li>
          <li>Identify and collect necessary data from various customer departments.</li>
          <li>Develop and communicate timelines for product deployment and implement the product and configure sales compensation plans based on customer structures.</li>
          <li>Collaborate with the marketing team to create visually stunning graphics for social media and website.</li>
          <li>Design and produce flyers, brochures, and advertisements and also edit and produce engaging videos to showcase our offerings.</li>
          <li>Ensure uniformity in all design projects, maintaining our brands visual identity.</li>
          <li>Stay current with design trends and software updates to deliver high-quality work.</li>
          <li>Participate in brainstorming sessions, contributing innovative ideas to our creative team and take on additional tasks and projects, driving towards the companys overall goals.</li>
        </ol>
        <p className="text-gray-700 mb-4">
          If you are eager to expand your skills, work on exciting projects, and be a valuable member of our team, apply now to join Reflex Realty LLP as our Graphic Designer!
        </p>
        <h3 className="text-lg font-semibold mb-2">Skill(s) required:</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-teal-200 text-teal-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">Adobe After Effects</span>
          <span className="bg-teal-200 text-teal-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">Adobe Creative Suite</span>
          <span className="bg-teal-200 text-teal-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">Adobe Illustrator</span>
          <span className="bg-teal-200 text-teal-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">Adobe InDesign</span>
          <span className="bg-teal-200 text-teal-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">Adobe Photoshop</span>
          <span className="bg-teal-200 text-teal-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">Adobe Premiere Pro</span>
          <span className="bg-teal-200 text-teal-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">CorelDRAW</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">Earn certifications in these skills:</h3>
        <ol className="list-decimal list-inside text-gray-700 mb-4 grid grid-cols-2 gap-4">
          <li><a href="https://www.example.com/adobe-photoshop" className="text-blue-600 hover:underline">Learn Adobe Photoshop</a></li>
          <li><a href="https://www.example.com/adobe-premiere-pro" className="text-blue-600 hover:underline">Learn Adobe Premiere Pro</a></li>
          <li><a href="https://www.example.com/colour-theory" className="text-blue-600 hover:underline">Learn Colour Theory for Designers</a></li>
          <li><a href="https://www.example.com/adobe-after-effects" className="text-blue-600 hover:underline">Learn Adobe After Effects</a></li>
        </ol>
        <h3 className="text-lg font-semibold mb-2">Who can apply:</h3>
        <ol className="list-decimal list-inside text-gray-700 mb-4">
          <li>Candidates with a minimum of 1 year of experience.</li>
          <li>Those who are from or open to relocate to Mumbai and neighboring cities.</li>
        </ol>
        <h3 className="text-lg font-semibold mb-2">Salary:</h3>
        <p className="text-gray-700 mb-4">Annual CTC: ₹ 2,00,000 - 2,50,000 /year</p>
        <h3 className="text-lg font-semibold mb-2">Number of openings:</h3>
        <p className="text-gray-700 mb-4">2</p>
        <h3 className="text-lg font-semibold mb-2">About Reflex Realty LLP:</h3>
        <p className="text-gray-700 mb-4">
          Reflex Realty LLP is one of the most reputed and leading real estate consulting companies based in South Mumbai and has promoted this business for 45+ years. We are a professional company offering specialized real estate solutions and services to clients seeking increased value by owning, occupying, divesting, and investing in real estate. Our highly accredited team is committed to providing expert marketing, leasing, and investment solutions on a wide range of commercial, residential, and retail spaces across Mumbai.
        </p>
      </div>
      <div className="flex justify-center mb-4"> {/* Center the button */}
        <Button>Apply Now</Button>
      </div>
    </div>
  );
};

export default JobDescription;
