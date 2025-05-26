import logo from "../assets/image/Home/rimac_white.png";
import copy from "../assets/image/Home/copy.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>

        <div className="footer__copy">
          <a href="/">
            <img src={copy} alt="copy" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
