import React from 'react';
import './About.css';


const About = () => (
  <div className="about-container">
    <header className="about-header">
      <h1>About CHV Apps</h1>
      <p>Dynamic, forward-thinking, and user-centric solutions.</p>
    </header>

    <section className="about-section overview-section">
      <h2>Overview</h2>
      <p>
        CHV Apps is a dynamic and forward-thinking technology company specializing in the development of intuitive and impactful mobile and web applications. With a passion for clean design and powerful functionality, we transform complex challenges into elegant, user-centric solutions. Our team is driven by a collaborative spirit and a relentless pursuit of excellence, aiming to deliver products that not only meet but exceed client expectations.
      </p>
    </section>

    <section className="about-section services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        <div className="service-card"><h3>Custom App Development</h3><p>Crafting bespoke applications for iOS and Android platforms.</p></div>
        <div className="service-card"><h3>Web Design & Development</h3><p>Building responsive, high-performance websites and web applications.</p></div>
        <div className="service-card"><h3>UI/UX Design</h3><p>Creating engaging and intuitive user interfaces for a seamless user experience.</p></div>
        <div className="service-card"><h3>Cloud Solutions</h3><p>Leveraging cloud infrastructure for scalable and reliable application performance.</p></div>
        <div className="service-card"><h3>Strategic Consulting</h3><p>Providing expert guidance to align technology with business objectives.</p></div>
      </div>
    </section>

    <section className="about-section mission-section">
      <h2>Our Mission</h2>
      <p>
        Our mission is to empower businesses and individuals through innovative technology. We are committed to developing solutions that are not only technologically advanced but also accessible, reliable, and secure, fostering growth and efficiency for our clients in an increasingly digital world.
      </p>
    </section>

    <section className="about-section internship-section">
      <h2>Internship Opportunities at CHV Apps</h2>
      <p>
        CHV Apps is proud to offer a vibrant internship program designed to nurture the next generation of tech talent. We provide students with hands-on experience, mentorship from industry experts, and the opportunity to contribute to real-world projects.
      </p>
      <h3>Available Internship Roles:</h3>
      <ul className="roles-list">
        <li><strong>Software Development Intern:</strong> Work alongside our development team on the full lifecycle of our applications, from coding and debugging to testing and deployment.</li>
        <li><strong>UI/UX Design Intern:</strong> Collaborate with our design team to create wireframes, mockups, and prototypes, helping to shape the look and feel of our products.</li>
        <li><strong>Quality Assurance Intern:</strong> Play a crucial role in ensuring the quality of our applications by identifying, documenting, and tracking bugs.</li>
      </ul>
      <h3>Benefits and Skill-Building:</h3>
      <p>
        Interns at CHV Apps enjoy a range of benefits, including a competitive stipend, flexible working hours, and a collaborative work environment. You will have the opportunity to develop in-demand skills in areas such as agile development, version control with Git, and mobile and web development frameworks.
      </p>
    </section>
  </div>
);

export default About;

