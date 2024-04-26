import React from 'react'
import NavBar from '../components/WebPage/NavBar'
import Hero from '../components/WebPage/Hero'
import Features from '../components/WebPage/Features'
import FAQ from '../components/WebPage/FAQ'
import Footer from '../layout/Footer'

export default function Home() {
  return (
    <>
    <NavBar />
    <Hero />
    <Features />
    <FAQ />
    <Footer />
    </>
  )
}
