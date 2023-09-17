import Footer from "@/components/Footer"
import BasicNavbar from "@/components/Navbar"
import AboutUs from "@/components/about/AboutUs"

function page() {
  return (
    <div className="hero-section">
    <header>
        <BasicNavbar />
      </header>
      <AboutUs/>
      <footer>
        <Footer/>
      </footer>
    
    </div>
  )
}

export default page