import React from 'react';
import "../styles/adminprofile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin, faCodepen } from '@fortawesome/free-brands-svg-icons';

export default function AdminProfile() {
  return (
    <div className="container-adminprofile">
      <div className="card">
        <img src="image/img1.jpg" alt="" className="card__image" />
        <p className="card__name">Lily-Grace Colley</p>

        <div className="grid-container">
          <div className="grid-child-posts content">156 Post</div>
          <div className="grid-child-posts content">1012 Like</div>
        </div>
        <ul className="social-icons">
          <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faCodepen} /></a></li>
        </ul>
        <button className="btn draw-border">Follow</button>
        <button className="btn draw-border">Message</button>
      </div>

      <div className="card">
        <img src="image/img2.jpg" alt="" className="card__image" />
        <p className="card__name">Murray Reeve</p>

        <div className="grid-container">
          <div className="grid-child-posts content">305 Post</div>
          <div className="grid-child-posts content">2643 Like</div>
        </div>
        <ul className="social-icons">
          <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faCodepen} /></a></li>
        </ul>
        <button className="btn draw-border">Follow</button>
        <button className="btn draw-border">Message</button>
      </div>

      <div className="card">
        <img src="image/img3.jpg" alt="" className="card__image" />
        <p className="card__name">Bianca Serrano</p>

        <div className="grid-container">
          <div className="grid-child-posts content">902 Post</div>
          <div className="grid-child-posts content">1300 Like</div>
        </div>
        <ul className="social-icons">
          <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faCodepen} /></a></li>
        </ul>
        <button className="btn draw-border">Follow</button>
        <button className="btn draw-border">Message</button>
      </div>

      <div className="card">
        <img src="image/img2.jpg" alt="" className="card__image" />
        <p className="card__name">Murray Reeve</p>

        <div className="grid-container">
          <div className="grid-child-posts content">305 Post</div>
          <div className="grid-child-posts content">2643 Like</div>
        </div>
        <ul className="social-icons">
          <li><a href=""><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li><a href=""><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href=""><FontAwesomeIcon icon={faLinkedin} /></a></li>
          <li><a href=""><FontAwesomeIcon icon={faCodepen} /></a></li>
        </ul>
        <button className="btn draw-border">Follow</button>
        <button className="btn draw-border">Message</button>
      </div>

      <div className="card">
        <img src="image/img2.jpg" alt="" className="card__image" />
        <p className="card__name">Murray Reeve</p>

        <div className="grid-container">
          <div className="grid-child-posts content">305 Post</div>
          <div className="grid-child-posts content">2643 Like</div>
        </div>
        <ul className="social-icons">
          <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faCodepen} /></a></li>
        </ul>
        <button className="btn draw-border">Follow</button>
        <button className="btn draw-border">Message</button>
      </div>
    </div>
  );
}