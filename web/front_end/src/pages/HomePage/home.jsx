import React from "react";
import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Slider from "./components/slider/slider";
import './home.css'
function Home() {
  return (
    <div>
      <Header useButtons={true} />
      <Hero />
      <Slider />
    </div>
  );
}
export default Home;
