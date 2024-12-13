import React from 'react'
import PurchaseSteps from './PurchaseSteps'
import Header from '../../header/HeaderAdult/Header'
import FooterKids from '../../Footers/FooterAdult/FooterAdult'

export default function Pago() {
  return (
    <div>
        <Header isWhite={true}/>
        <PurchaseSteps />
        <FooterKids />
    </div>
  );
}
