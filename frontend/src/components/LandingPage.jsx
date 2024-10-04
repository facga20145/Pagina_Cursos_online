import React from 'react'
import Header from './header/Header'
import Section from './section/Section'
import Plans from './plans/Plans'

export default function LandingPage() {
  return (
    <div className='landingConatiner'>
        <Header/>
        <Section/>
        <Plans/>
    </div>
  )
}
