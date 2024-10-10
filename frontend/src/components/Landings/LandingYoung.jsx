import "./LandingYoung.css";
import HeaderYoung from "../header/headerYouth/HeaderYoung";
import SectionYoung from "../section/SectionYouth/SectionYoung";
import AboutUsYoung from "../AboutUs/AboutUsYoung";
import FeatureYoung from "../Features/FeatureYoung";
function LandingYoung() {
  return (
    <div className="PrincipalYoung">
      <div className="headeryoung">
        <HeaderYoung />
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
    </div>
  );
}

export default LandingYoung;
