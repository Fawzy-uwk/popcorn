import {

  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";


import Container from "../Ui/Container";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="flex items-center flex-col">
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="socialIcons">
          <span className="icon git">
            <FaGithub size={25} />
          </span>
          <span className="icon insta">
            <FaInstagram size={25}/>
          </span>
          <span className="icon twitter">
            <FaTwitter size={25}/>
          </span>
          <span className="icon linked">
            <FaLinkedin size={25}/>
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
