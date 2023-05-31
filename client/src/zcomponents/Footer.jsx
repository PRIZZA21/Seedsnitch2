import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="bg-[#0f6d6d] text-white py-2 static bottom-0 left-0 w-full footer">
      <div className="footer ">
        <div className="row ">
          <Link
            target="_blank"
            to="https://instagram.com/seedsnitch?igshid=ZDdkNTZiNTM="
            id="instagram"
          >
            <i className="fab fa-instagram"></i>
          </Link>
          <Link
            target="_blank"
            to="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=connect@seedsnitch.in"
            id="gmail"
          >
            <i className="fas fa-envelope"></i>
          </Link>
          <Link
            target="_blank"
            to="https://www.linkedin.com/company/seedsnitch/"
            id="linkedin"
          >
            <i className="fab fa-linkedin"></i>
          </Link>
          <Link
            target="_blank"
            to="https://twitter.com/seedsnitch"
            id="twitter"
          >
            <i className="fab fa-twitter"></i>
          </Link>
        </div>

        <div className="row">
          <ul>
            <li>
              <Link to="./about">About us</Link>
            </li>
            <li>
              <Link to="./contact">Contact us</Link>
            </li>
            <li>
              <Link to="./faq">FAQ</Link>
            </li>
            <li>
              <Link to="./ambassador">Ambassador Program </Link>
            </li>
          </ul>
        </div>

        <div className="row">
          Seedsnitch Copyright © 2023 All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
