import logo from "../assets/image/Home/rimac.png";
import contact from "../assets/image/Home/contact.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/">
            <img src={logo} alt="logo_prueba" />
          </a>
        </div>

        <div className="header_contact">
          <a href="/">
            <img src={contact} alt="contact_prueba" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
