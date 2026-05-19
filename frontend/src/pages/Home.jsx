import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import Programs from '../components/Programs';
import ProPacks from '../components/ProPacks';
import AdvancedPrograms from '../components/AdvancedPrograms';
import WhyChoose from '../components/WhyChoose';
import Headlines from '../components/Headlines';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <Partners />
      <Programs />
      <ProPacks />
      <AdvancedPrograms />
      <WhyChoose />
      <Headlines />
      <Testimonials />
    </>
  );
};

export default Home;
