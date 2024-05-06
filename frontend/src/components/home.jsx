import React, { useContext } from 'react';
import { NavContext } from './context.js';

import './header.jsx';
import './Styles/home.css';


function Home() {
  const { isOpen } = useContext(NavContext);

  return (
    <div className={`home-page ${isOpen ? 'blur' : ''}`}>
      {/* Home Section */}
      <div className="home-section">
        <h1><span className="gradient-text">Welcome to KanbanFlow</span></h1>
        <p className="desc-text">Write, plan, collaborate, and get organized.</p>
      </div>
      
      {/* Buttons Section */}
      <div className="buttons-section">
        <a className="get-started-button" href="/register">Get Started</a>
        <a className="learn-more-button" href="/#about">Learn More</a>
      </div>
      
      <hr className="section-separator" />
      
      {/* Products Section */}
      <div id="products" className="products-section">
        <h2><span className="white-text">Our</span> <span className="gradient-text">Products</span></h2>
        <p className="desc-text">We develop products that help you and your team work together more efficiently.</p>

        <div className="product-item">
          <img src="https://predictalab.fr/images/products/predictasearch.jpeg" alt="Product 1" />
          <div className="product-features-list">
            <ul>
              <li>
                <div className="feature-item">
                  <h4>Kanban board</h4>
                  <p>Effortlessly manage tasks with customizable columns, WIP limits, subtasks, swimlanes, filters, recurring tasks, task relations, and automatic task archiving.</p>
                  <a href="/#about">Learn More</a>
                </div>
              </li>
              <li>
                <div className="feature-item">
                  <h4>Time tracking</h4>
                  <p>Efficiently manage your time with customizable timers including Pomodoro technique and Stopwatch, track time spent on tasks, generate detailed</p>
                  <a href="/#about">Learn More</a>
                </div>
              </li>
              <li>
                <div className="feature-item">
                  <h4>Analytics & Reporting</h4>
                  <p>Gain deep insights into your workflow with customizable charts, calendar views, dashboards, and forecasting, optimizing productivity and performance tracking.</p>
                  <a href="/#about">Learn More</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="section-separator" />

      {/* Services Section */}
      <div id="services" className="services-section">
        <h2><span className="white-text">Our</span> <span className="gradient-text">Services</span></h2>
        <p className="desc-text">Whether you need help with a project or ongoing support, we can help.</p>
      </div>
      <div className="services-wrapper">
        {/* Service 1 */}
        <div className="service-item">
          <a href="https://github.com/CalValmar">
            <div className="service-image">
              <img src="https://predictalab.fr/images/services/dev.jpg" alt="Service 1" />
            </div>
            <div className="service-content">
              <h4 className="service-title">Software development</h4>
              <p className="service-description">We can help you build custom software solutions that meet your unique needs.</p>
            </div>
          </a>
        </div>
        {/* Service 2 */}
        <div className="service-item">
          <a href="https://github.com/CalValmar">
            <div className="service-image">
              <img src="https://predictalab.fr/images/services/investigations.jpg" alt="Service 2" />
            </div>
            <div className="service-content">
              <h4 className="service-title">Investigations</h4>
              <p className="service-description">We can help you investigate and resolve complex technical issues.</p>
            </div>
          </a>
        </div>
        {/* Service 3 */}
        <div className="service-item">
          <a href="https://github.com/CalValmar">
            <div className="service-image">
              <img src="https://predictalab.fr/images/services/formation.jpg" alt="Service 3" />
            </div>
            <div className="service-content">
              <h4 className="service-title">Training courses</h4>
              <p className="service-description">We teach you how to use our products and services to get the most out of them.</p>
            </div>
          </a>
        </div>
      </div>
    
      <hr className="section-separator" />

      {/* Demo Section */}
     <div className="demo-wrapper">
        <div id="demo" className="demo-section">
          <h2 className="title">Want a live demo ?</h2>
          <p className="description">Reach out and we will get back to you in no time.</p>
          <button className="demo-button"> Book a meeting </button>
        </div>
     </div>

      <hr className="section-separator" />

      {/* FAQ Section */}
      <div id="about" className="about-section">
        <h2><span className="white-text">About</span> <span className="gradient-text"> Us </span></h2>
        <p className="desc-text">Here are some of the most frequently asked questions about our services.</p>
        <p className="desc-text">If you have any other questions, feel free to reach out to us.</p>
      </div>
      <div className="about-wrapper">
        {/* FAQ 1 */}
        <div className="about-item">
          <div className="about-content">
            <h4 className="about-title">What is KanbanFlow ?</h4>
            <hr className="about-separator" />
            <p className="about-description">KanbanFlow is a project management tool that helps you visualize your work and collaborate ! </p>
          </div>
        </div>
        {/* FAQ 2 */}
        <div className="about-item">
          <div className="about-content">
            <h4 className="about-title">How do I get started ?</h4>
            <hr className="about-separator" />
            <p className="about-description">You can get started by creating an account and signing in.</p>
          </div>
        </div>
        {/* FAQ 3 */}
        <div className="about-item">
          <div className="about-content">
            <h4 className="about-title">How much does it cost ?</h4>
            <hr className="about-separator" />
            <p className="about-description">KanbanFlow is free to use :3</p>
          </div>
        </div>
        {/* FAQ 4 */}
        <div className="about-item">
          <div className="about-content">
            <h4 className="about-title">How can I contact support ?</h4>
            <hr className="about-separator" />
            <p className="about-description">You can contact the support. We will get back to you as soon as possible !</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;