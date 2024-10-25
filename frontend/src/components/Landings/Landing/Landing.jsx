import Header from "../../header/HeaderAdult/Header";
import Section from "../../section/SectionAdult/Section";
import Plans from "../../plans/Plans";
import AboutUsAdult from "../../AboutUs/AboutUsAdult/AboutUsAdult";
import HeroSectionAdult from "../../HeroSection/HeroSectionAdult/HeroSectionAdult";
import FooterAdult from "../../Footers/FooterAdult/FooterAdult";
export default function Landing(){
    return(
        <div className="landing-contend">
        <Header isWhite={true} />
        <Section isWhite={true}/>
        <Plans isWhite={true}/>
        <AboutUsAdult/>
        <HeroSectionAdult/>
        <FooterAdult/>

        
        </div>
    );
}