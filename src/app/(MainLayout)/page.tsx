import About from '../components/shortAbout'
import EventsBanner from '../components/permotion'
import FeatureProduct from '../components/featureproducts'
import { HeroSection } from '../components/herosection'
import Image from 'next/image'
import NewsLetter from '../components/newsletter'
import { UserButton } from '@clerk/nextjs'
export default function Home() {
  return (
    <main>
       
      <HeroSection/>
      <EventsBanner/>
      <FeatureProduct/>
      <About />
      <NewsLetter/>
    </main>
  )
}
