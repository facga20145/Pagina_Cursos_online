import { useEffect } from "react";
import "./LandingYoung.css";
import Header from '../../header/HeaderAdult/Header'
import SectionYoung from "../../section/SectionYouth/SectionYoung";
import AboutUsYoung from "../../AboutUs/AboutUsYoung";
import FeatureYoung from "../../Features/FeatureYoung";
import ServisYoung from '../../Servis/ServisYoung/ServisYoung'
import HeroSection from "../../HeroSection/HeroSection";
import FooterYoung from '../../Footers/FooterYoung/FooterYoung'
function LandingYoung() {
  useEffect(() => {
    // Almacenar el tipo de landing cuando el componente se monta
    localStorage.setItem("landingPage", "young");
  }, []);

  return (
    <div className="PrincipalYoung">
      <div className="headeryoung">
        <Header/>
      </div>
      <div className="Sectionyoung">
        <SectionYoung />
      </div>
      <div className="AboutUsYoung">
        <AboutUsYoung />
      </div>
      <div className="FeatureYoung">
        <FeatureYoung />
      </div>
      <div className="ServisYoung">
         <ServisYoung/>
      </div>
      <div className="HeroSection">
         <HeroSection/>
      </div>
      <div className="FooterYoung">
         <FooterYoung/>
      </div>
    </div>
  );
}

export default LandingYoung;
