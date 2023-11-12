import Footer from "@/components/footer/Footer"
import MainNavbar from "@/components/nav/Navbar"
import AboutUs from "@/components/about/AboutUs"

function page() {
  return (
    <div className="hero-section">
    <header>
        <MainNavbar />
      </header>
      <AboutUs/>
      <footer>
        <Footer/>
      </footer>
    
    </div>
  )
}

export default page