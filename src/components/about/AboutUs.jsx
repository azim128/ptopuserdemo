"use client" 
import { Card } from "react-bootstrap";
import { FaShieldAlt, FaCoins, FaUserFriends, FaComments, FaLightbulb } from "react-icons/fa";

const CardItem = ({ icon, title, content }) => {
  return (
    <Card className="about-card text-center d-flex flex-column">
      <Card.Body>
        <div className="about-icon mb-3">{icon}</div>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

const AboutUs = () => {
  const aboutItems = [
    {
      icon: <FaShieldAlt size={55}/>,
      title: "Secure Transactions",
      content: "Our platform employs robust security measures to ensure safe and secure transactions.",
    },
    {
      icon: <FaCoins size={55}/>,
      title: "Multiple Currencies",
      content: "Trade various currencies like paypal, Ethereum, and USDT on our platform.",
    },
    {
      icon: <FaCoins size={55}/>,
      title: "Zero Commission Trading",
      content: "We don't charge any commission for secure trades and internal transfers.",
    },
    {
      icon: <FaUserFriends size={55}/>,
      title: "Community Engagement",
      content: "Be part of a vibrant community of cryptocurrency enthusiasts and traders.",
    },
    {
      icon: <FaComments size={55}/>,
      title: "Transparent Feedback",
      content: "Our feedback system ensures transparency and builds trust among users.",
    },
    {
      icon: <FaLightbulb size={55}/>,
      title: "Continuous Improvement",
      content: "We are continuously improving our platform for the best user experience.",
    },
  ];

  return (
    <section id="about-us" className="py-5" style={{background:'#202123'}}>
      <div className="container">
        <h2 className="text-center mb-4 text-light">What is PTOP?</h2>
        <p className="text-center w-50 mx-auto text-light">PTOP operates as a global P2P marketplace, facilitating cryptocurrency trading worldwide.</p>
        <div className="row justify-content-center">
          {aboutItems.map((item, index) => (
            <div key={index} className="col-lg-4 mb-4">
              <CardItem icon={item.icon} title={item.title} content={item.content} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
