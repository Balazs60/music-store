import React from 'react';
import '../musicStore.css';
const ContactPage: React.FC = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      
      <div>
        <h2>Contact Information</h2>
        <p>Email: {"boriszbis@gmail.com"}</p>
        <p>Phone: {"1231412411321"}</p>
      </div>

      <div>
        <h2>Location</h2>
        {/* Use an iframe for embedding a map */}
        <iframe
          title="Company Location"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8010538391534!2d-75.16522158535767!3d39.95378357942689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6b7c88c5e8f09%3A0x6fcef5d1ad25b8d!2sLiberty%20Bell!5e0!3m2!1sen!2sus!4v1584248068122!5m2!1sen!2sus"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
