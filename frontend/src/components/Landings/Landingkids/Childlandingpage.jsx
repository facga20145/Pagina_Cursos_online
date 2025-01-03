import { useEffect } from "react";
import Header from '../../header/HeaderAdult/Header'
import SectionKids from '../../section/sectionKids/SectionKids'
import Section2Kids from '../../section2/Section2Kids/Section2Kids'
import Section3Kids from '../../section3/Section3Kids/Section3Kids'
import Section4Kids from '../../section4/Section4Kids/Section4Kids'
import Section5Kids from '../../section5/Section5Kids/Section5Kids'
import FooterKids from '../../Footers/footerKids/FooterKids'

export default function Childlandingpage() {
  useEffect(() => {
    // Almacenar el tipo de landing cuando el componente se monta
    localStorage.setItem("landingPage", "child");
  }, []);
  return (
    <div className="landingchild-container">
        <Header isKids={true}/>
        <SectionKids/>
        <Section2Kids/>
        <Section3Kids/>
        <Section4Kids/>
        <Section5Kids/>
        <FooterKids/>
    </div>
  )
}
