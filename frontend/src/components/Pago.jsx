import React from 'react'
import PurchaseSteps from './Pago/pagoKids/PurchaseSteps'
import Header from './header/headerKids/HeaderKids'
import FooterKids from './Footers/footerKids/FooterKids'

export default function Pago() {
  return (
    <div>
        <Header/>
        <PurchaseSteps/>
        <FooterKids/>
    </div>
  )
}
