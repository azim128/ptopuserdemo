"use client"
import React, { useState } from 'react';
import styles from "../profile/form.module.css"
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
        console.log(formData)
        toast.success("data");
    } catch (error) {
        console.log(error)
        toast.error('error')
    }
  };

  return (
    <Container style={{ minHeight: "75vh" }}>
    <div className={styles.wrapper}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.IconDiv}>
          
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.IconDiv}>
          
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.IconDiv}>
          
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitbtn}>Submit</button>
      </form>
    </div>
    </Container>
  );
}

export default ContactForm;
