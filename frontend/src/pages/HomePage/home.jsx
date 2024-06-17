import React, { useRef } from 'react';
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Slider from "./components/slider/slider";
import Info from "./components/Info/info";
import About from "./components/AboutUs/aboutus";
import styles from './home.module.css';

function Home({ theme, setTheme }) {
  const bottomRef = useRef(null);

  // const scrollToBottom = () => {
  //   if (bottomRef.current) {
  //     bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <div className={styles.home_wrapper}>
      <Header useButtons={true} theme={theme} setTheme={setTheme} />
      <Hero />
      <Slider />
      <Info />
      <About />
      <div ref={bottomRef}></div>
    </div>
  );
}

export default Home;
