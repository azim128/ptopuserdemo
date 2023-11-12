import Footer from "@/components/footer/Footer"
import MainNavbar from "@/components/nav/Navbar"
import ContactForm from "@/components/contact/ContactFrom"


const page = () => {
  return (
    <div className="hero-section">
     <header>
        <MainNavbar />
      </header>
      <main>
        <ContactForm/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default page