import React from 'react';
import "../styles/adminprofile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin, faCodepen } from '@fortawesome/free-brands-svg-icons';

export default function AdminProfile() {
  return (
    <div className="container-adminprofile">
      <div className="card">
        <img src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/329760201_1221043158554398_1745754320890898211_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sFUhpAztDpkAX9Hy-gj&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfAJW6AKvmEjrzOTGgvkj7j-T05gBB_FvUhbw-V_fGvzPA&oe=654E1608" alt="" className="card__image" />
        <p className="card__name">Phan Quốc Khải</p>

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
        <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/329549956_759115438573392_6489946355855461010_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=PaXU72_WtZIAX9u3pZF&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBcMpjx1UL_xihxds0VKfOLBrvA_rQr9pJ8wfJFSHxSag&oe=654E6BAD" alt="" className="card__image" />
        <p className="card__name">Sexxy My</p>

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
        <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/395326695_655833753382814_8170546670281010006_n.jpg?stp=dst-jpg_s206x206&_nc_cat=103&ccb=1-7&_nc_sid=510075&_nc_ohc=cxaXTxdIuwgAX_Pdpjk&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSjpg4gJIzs7BAYFhGzJaHm0KCVW2pvp9RK-_bWgzmK0A&oe=65703136" alt="" className="card__image" />
        <p className="card__name">Cris Bryann</p>

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
        <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/385550408_891437572443875_3096934365083617517_n.jpg?stp=dst-jpg_s206x206&_nc_cat=110&ccb=1-7&_nc_sid=510075&_nc_ohc=WzZAoQVl_OMAX85Umwo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQ3EAVXlmitKjY-sncV8FMTL6niMrbWytzYjcybhjxzNw&oe=657031C9" alt="" className="card__image" />
        <p className="card__name">Nguyễn Hữu Bảo</p>

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
        <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/398494260_3288127181485601_6326303622982312884_n.jpg?stp=dst-jpg_s206x206&_nc_cat=110&ccb=1-7&_nc_sid=510075&_nc_ohc=qr22G1-JatEAX9sCyjm&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSIM72oZbD81oMr9jMFcbSeBqx_7Gtv-6tXmjaAml5YrQ&oe=65703C6B" alt="" className="card__image" />
        <p className="card__name">Nguyễn Trọng Khang</p>

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