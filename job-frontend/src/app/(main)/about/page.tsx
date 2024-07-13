import Link from "next/link";
import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-teal-700 flex flex-col items-center justify-center p-6">

      <section className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold  mb-4">About Us</h1>
        <p className="text-lg ">
          Welcome to our job interview scheduling platform. We aim to streamline
          the interview scheduling process for students and employers through
          our intuitive web application.
        </p>
      </header>
        <h2 className="text-3xl font-semibold mb-6">
          Our Mission
        </h2>
        <p className="text-lg  mb-4">
          As the placement coordinator at a university, our goal is to enhance
          user experience and improve placement management efficiency. Our
          platform enables users to view available interview slots, book a slot,
          and receive timely confirmations.
        </p>

        <h2 className="text-3xl font-semibold  mb-6">Features</h2>
        <ul className="list-disc list-inside text-lg  mb-4">
          <li>View available interview slots in real-time.</li>
          <li>Book interview slots with just a few clicks.</li>
          <li>Receive instant confirmations and reminders.</li>
          <li>Improve placement management efficiency for coordinators.</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-6">
          Contact Us
        </h2>
        <p className="text-lg ">
          If you have any questions or need further assistance, please feel free
          to{" "}
          <Link
            href="mailto:support@ourplatform.com"
            className="text-teal-500 hover:underline"
          >
            contact us
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
