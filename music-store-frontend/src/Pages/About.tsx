import React, { useState, useEffect } from 'react';
import Header from './Header';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const coworkersData = [
    { name: 'Balázs Füredi', linkedin: 'https://www.linkedin.com/in/balázs60' },
    { name: 'Bisits Borisz', linkedin: 'https://www.linkedin.com/in/borisz-bisits' },
  ];

  const [activeTab, setActiveTab] = useState<string>('about');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab('about');
  }, []);

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="flex flex-wrap space-x-4 p-4 bg-white">
        <button
          className={`py-2 px-4 mb-2 md:mb-0 rounded ${activeTab === 'about' ? 'bg-teal-500 hover:bg-teal-700 text-white' : 'bg-gray-300'}`}
          onClick={() => handleTabChange('about')}
        >
          About Us
        </button>
        <button
          className={`py-2 px-4 mb-2 md:mb-0 rounded ${activeTab === 'mission' ? 'bg-teal-500 hover:bg-teal-700 text-white' : 'bg-gray-300'}`}
          onClick={() => handleTabChange('mission')}
        >
          Mission
        </button>
        <button
          className={`py-2 px-4 mb-2 md:mb-0 rounded ${activeTab === 'values' ? 'bg-teal-500 hover:bg-teal-700 text-white' : 'bg-gray-300'}`}
          onClick={() => handleTabChange('values')}
        >
          Values
        </button>
        <button
          className={`py-2 px-4 mb-2 md:mb-0 rounded ${activeTab === 'coworkers' ? 'bg-teal-500 hover:bg-teal-700 text-white' : 'bg-gray-300'}`}
          onClick={() => handleTabChange('coworkers')}
        >
          Coworkers
        </button>
      </div>

      <section className="p-4">
        {activeTab === 'about' && (
          <>
            <h2 className="text-xl font-bold mb-4">About Us</h2>
            <p className="mb-2">
              Welcome to HarmonyTunes, your premier online music destination! At HarmonyTunes, we are dedicated to
              providing music enthusiasts with a diverse and immersive platform to explore and enjoy the world of
              music.
            </p>
            <p className="mb-2">
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
            <h2 className="text-xl font-bold mb-4">Mission</h2>
            <p className="mb-2">
              Our mission at HarmonyTunes is to enrich lives through the power of music. We strive to create a
              collaborative and inclusive space where artists can thrive, and music lovers can discover, share, and
              celebrate their passion for diverse musical expressions.
            </p>
          </>
        )}

        {activeTab === 'values' && (
          <>
            <h2 className="text-xl font-bold mb-4">Values</h2>
            <ul className="list-disc pl-5">
              <li className="mb-2">
                <strong>Customer Satisfaction:</strong> We prioritize the needs and satisfaction of our customers,
                ensuring a delightful and personalized music experience.
              </li>
              <li className="mb-2">
                <strong>Innovation:</strong> We embrace innovation, constantly seeking new and creative ways to enhance
                our platform and deliver cutting-edge musical experiences.
              </li>
              <li className="mb-2">
                <strong>Integrity:</strong> We conduct business with the utmost integrity and ethical standards, building
                trust and transparency with our users and partners.
              </li>
            </ul>
          </>
        )}

        {activeTab === 'coworkers' && (
          <>
            <h2 className="text-xl font-bold mb-4">Coworkers</h2>
            <ul className="list-disc pl-5">
              {coworkersData.map((coworker, index) => (
                <li key={index} className="mb-2">
                  {coworker.name} -{' '}
                  <a href={coworker.linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-500">
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
