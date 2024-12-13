import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import WebLogo from "../images/web_logo.png";

const Header = () => {
  return (
    <div className="logoArea" style={{display: "flex", alignItems:"center", backgroundColor: "#5986ED", height: "7%"}}>
      <Link to="/"
        style={{marginLeft: "30px", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Image src={WebLogo} style={{ width: '100%'}}/> 
      </Link>
    </div>
  )
};

export default Header;