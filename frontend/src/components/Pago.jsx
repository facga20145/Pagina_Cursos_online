import React from 'react'
import PurchaseSteps from './Pago/pagoKids/PurchaseSteps'
import Header from './header/HeaderAdult/Header'
import FooterKids from './Footers/footerKids/FooterKids'

export default function Pago() {
  return (
    <div>
        <Header isKids={true}/>
        <PurchaseSteps/>
        <FooterKids/>
    </div>
  )
}
