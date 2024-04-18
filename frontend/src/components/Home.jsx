import React from 'react';
import './home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Home Section */}
      <div className="home-section">
        <h1>Welcome to My App</h1>
        <p>All-in-one workspace — Write, plan, collaborate, and get organized.</p>
      </div>
      
      {/* Buttons Section */}
      <div className="buttons-section">
        <a className="get-started-button" href="/login">Get Started</a>
        <a className="learn-more-button" href="/#about">Learn More</a>
      </div>
      
      <hr className="section-separator" />
      
      {/* Products Section */}
      <div id="products" className="products-section">
        <h2>Our Products</h2>
        <p>We develop products that help you and your team work together more efficiently.</p>
      
        <div className="product-item">
          <img src="/images/product1.jpg" alt="Product 1" />
        </div>
        <div className="product-features-list">
          <ul>
            <li>
              <div className="feature-item">
                <h4>Feature 1</h4>
                <p>Feature 1 description</p>
                <a href="https://github.com/CalValmar"> My GitHub Profile </a>
              </div>
            </li>
            <li>
              <div className="feature-item">
                <h4>Feature 2</h4>
                <p>Feature 2 description</p>
                <a href="/#about">Learn More</a>
              </div>
            </li>
            <li>
              <div className="feature-item">
                <h4>Feature 3</h4>
                <p>Feature 3 description</p>
                <a href="/#about">Learn More</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <hr className="section-separator" />

      {/* Services Section */}
      <div id="services" className="services-section">
        <h2>Our Services</h2>
        <p>Whether you need help with a project or ongoing support, we can help.</p>
      </div>
      <div className="services-wrapper">
        {/* Service 1 */}
        <div className="service-item">
          <a href="/#service1">
            <div className="service-image">
              <img src="/images/service1.jpg" alt="Service 1" />
            </div>
            <div className="service-content">
              <h4 className="service-title">Service 1</h4>
              <p className="service-description">Service 1 description</p>
            </div>
          </a>
        </div>
        {/* Service 2 */}
        <div className="service-item">
          <a href="/#service2">
            <div className="service-image">
              <img src="/images/service2.jpg" alt="Service 2" />
            </div>
            <div className="service-content">
              <h4 className="service-title">Service 2</h4>
              <p className="service-description">Service 2 description</p>
            </div>
          </a>
        </div>
        {/* Service 3 */}
        <div className="service-item">
          <a href="/#service3">
            <div className="service-image">
              <img src="/images/service3.jpg" alt="Service 3" />
            </div>
            <div className="service-content">
              <h4 className="service-title">Service 3</h4>
              <p className="service-description">Service 3 description</p>
            </div>
          </a>
        </div>
      </div>
    
      <hr className="section-separator" />

      {/* Demo Section */}
      <div id="demo" className="demo-section">
        <h2 className="title">Want a live demo?</h2>
        <p className="description">Reach out and we will get back to you in no time.</p>
        <button className="demo-button">Book a meeting</button>
      </div>

      <hr className="section-separator" />

      {/* About Section */}
      <div id="about" className="about-section">
        <h2 className="title">About
          <span className="title-gradient"> Us</span>
        </h2>
        <p className="description">We are a team of professionals who are passionate about what we do.</p>
        <p className="description">We are dedicated to helping you and your team work together more efficiently.</p>
        <div className="faq-wrapper">
          {/* FAQ 1 */}
          <div className="faq-card">
            <div className="card-header">
              <button type='button' className="card-button">What is KanbanFlow?</button>
            </div>
            <div className="card-content">
              "KanbanFlow is a project management tool that helps you visualize your work and collaborate with your team."
            </div>
          </div>
          {/* FAQ 2 */}
          <div className="faq-card">
            <div className="card-header">
              <button type='button' className="card-button">How do I get started?</button>
            </div>
            <div className="card-content">
              "You can get started by creating an account and signing in."
            </div>
          </div>
          {/* FAQ 3 */}
          <div className="faq-card">
            <div className="card-header">
              <button type='button' className="card-button">How much does it cost?</button>
            </div>
            <div className="card-content">
              "KanbanFlow is free to use."
            </div>
          </div>
          {/* FAQ 4 */}
          <div className="faq-card">
            <div className="card-header">
              <button type='button' className="card-button">How can I contact support?</button>
            </div>
            <div className="card-content">
              "You can contact support by sending an email to "". We will get back to you as soon as possible."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;