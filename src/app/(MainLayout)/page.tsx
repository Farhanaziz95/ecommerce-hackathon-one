import About from '../components/shortAbout'
import EventsBanner from '../components/permotion'
import FeatureProduct from '../components/featureproducts'
import { HeroSection } from '../components/herosection'
import NewsLetter from '../components/newsletter'
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
