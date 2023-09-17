import Footer from "@/components/Footer"
import BasicNavbar from "@/components/Navbar"
import ContactForm from "@/components/contact/ContactFrom"


const page = () => {
  return (
    <div className="hero-section">
     <header>
        <BasicNavbar />
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