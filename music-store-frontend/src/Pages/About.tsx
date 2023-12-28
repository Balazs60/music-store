import React, { useState, useEffect } from 'react';
import '../musicStore.css';

interface AboutProps {
  coworkersData: { name: string; linkedin: string }[];
}

const About: React.FC<AboutProps> = () => {
    const coworkersData = [
    
        { name: 'Balázs Füredi', linkedin: 'https://www.linkedin.com/in/balázs60' },
        { name: 'Bisits Borisz', linkedin: 'https://www.linkedin.com/in/borisz-bisits'},
       
      ];
  const [activeTab, setActiveTab] = useState<string>('about');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    setActiveTab('about');
  }, []);

  return (
   
    <div>
        
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        
        <button
          className={activeTab === 'about' ? 'active' : '' } 
          onClick={() => handleTabChange('about')}
        >
          About Us
        </button>
        <button
          className={activeTab === 'mission' ? 'active' : ''}
          onClick={() => handleTabChange('mission')}
        >
          Mission
        </button>
        <button
          className={activeTab === 'values' ? 'active' : ''}
          onClick={() => handleTabChange('values')}
        >
          Values
        </button>
        <button
          className={activeTab === 'coworkers' ? 'active' : ''}
          onClick={() => handleTabChange('coworkers')}
        >
          Coworkers
        </button>
      </div>

      <section>
        {activeTab === 'about' && (
          <>
            <h2>About Us</h2>
            <p>
              Welcome to HarmonyTunes, your premier online music destination! At HarmonyTunes, we are dedicated to
              providing music enthusiasts with a diverse and immersive platform to explore and enjoy the world of
              music.
            </p>
            <p>
              Founded in [Year], HarmonyTunes has been a pioneer in the digital music industry, offering a vast catalog
              of genres, from the latest chart-toppers to timeless classics. Our mission is to make music accessible to
              everyone, connecting artists and listeners in a harmonious online space.
            </p>
            <p>
              Whether you're discovering new artists, creating personalized playlists, or enjoying instant downloads, our
              user-friendly interface ensures a seamless and enjoyable musical journey. Embrace the future of music with
              HarmonyTunes, where the melody meets the digital age.
            </p>
          </>
        )}

        {activeTab === 'mission' && (
          <>
            <h2>Mission</h2>
            <p>
              Our mission at HarmonyTunes is to enrich lives through the power of music. We strive to create a
              collaborative and inclusive space where artists can thrive, and music lovers can discover, share, and
              celebrate their passion for diverse musical expressions.
            </p>
          </>
        )}

        {activeTab === 'values' && (
          <>
            <h2>Values</h2>
            <ul>
              <li>
                <strong>Customer Satisfaction:</strong> We prioritize the needs and satisfaction of our customers,
                ensuring a delightful and personalized music experience.
              </li>
              <li>
                <strong>Innovation:</strong> We embrace innovation, constantly seeking new and creative ways to enhance
                our platform and deliver cutting-edge musical experiences.
              </li>
              <li>
                <strong>Integrity:</strong> We conduct business with the utmost integrity and ethical standards, building
                trust and transparency with our users and partners.
              </li>
              {/* Add more values as needed */}
            </ul>
          </>
        )}

        {activeTab === 'coworkers' && (
          <>
            <h2>Coworkers</h2>
            <ul>
              {coworkersData.map((coworker, index) => (
                <li key={index}>
                  {coworker.name} -{' '}
                  <a href={coworker.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn Profile
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
};

export default About;
