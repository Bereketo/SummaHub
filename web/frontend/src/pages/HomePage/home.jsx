import React from "react";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Slider from "./components/slider/slider";
import Info from "./components/Info/info";
import './home.module.css'
function Home() {
  return (
    <div>
      <Header useButtons={true} />
      <Hero /> 
      <Slider />
      <Info />
      
    </div>
  );
}
export default Home;
