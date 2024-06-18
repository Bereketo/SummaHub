import React, { useRef } from 'react';
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Slider from "./components/slider/slider";
import Info from "./components/Info/info";
import About from "./components/AboutUs/aboutus";
import styles from './home.module.css';
import Section from './components/Section/section';

function Home({ theme, setTheme }) {


  return (
    <div className={styles.home_wrapper}>
      <Header useButtons={true} theme={theme} setTheme={setTheme} />
      <Hero />
      <Slider />
      <Section />
      <Info />
      <About />
      
    </div>
  );
}

export default Home;
