import React from 'react';
import Header from './Header';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="container mx-auto p-4 flex flex-col lg:flex-row lg:justify-between">
        <div className="lg:w-1/2 lg:pr-8">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Contact Information</h2>
            <p>Email: {"boriszbis@gmail.com"}</p>
            <p>Phone: {"1231412411321"}</p>
          </div>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-xl font-bold mb-2">Location</h2>
          {/* Use an iframe for embedding a map */}
          <iframe
            title="Company Location"
            width="100%"
            height="450"
            frameBorder="0"
            className="w-full"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2693.1842398397163!2d19.069534315845325!3d47.49790297917509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dcfd9e083e29%3A0x4228f4899a7a00c7!2zUsOhxa_Fw7R6!5e0!3m2!1shu!2shu!4v1649979276446!5m2!1shu!2shu"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
