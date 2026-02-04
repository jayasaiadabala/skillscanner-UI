
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/images/skillscannerlogo.png";
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function Header() {

    const { isLoggedIn, setIsLoggedIn, globalUser ,setGlobalUser} = useContext(UserContext);

    let navig = useNavigate();

    const handleInvite = () => {
      const appLink = window.location.origin;
      const shareData = {
        title: "SkillScanner",
        text: "Check out SkillScanner - your go-to home services app!",
        url: appLink
      };

      if (navigator.share) {
        navigator.share(shareData)
          .then(() => console.log("App shared successfully"))
          .catch(err => console.log("Error sharing:", err));
      } else {
        navigator.clipboard.writeText(appLink)
          .then(() => alert("App link copied to clipboard!"))
          .catch(() => alert("Failed to copy link"));
      }
    };


    return (
    <Navbar collapseOnSelect expand="lg" className="bg-light" style={{boxShadow:"0 0 10px rgba(0, 0, 0, 0.19)"}}>
      <Container>
        <Navbar.Brand onClick={()=>navig("/")} style={{cursor:"pointer"}}>
            <img
              src={logo}
              width="150"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto fnt">
            <Nav.Link onClick={()=>navig("/workPartner")}>Become Partner</Nav.Link>
            <Nav.Link onClick={()=>navig("/availablePartners")}>Search For Service</Nav.Link>
            <Nav.Link href="#about" onClick={()=>navig("/")}>About Us</Nav.Link>
            <Nav.Link onClick={handleInvite}>Invite</Nav.Link>
          </Nav>
          <Nav className="fnt">
            {
              (isLoggedIn) ? (
              <>
              <Nav.Link onClick={()=>{
                setIsLoggedIn(false);
                setGlobalUser({});
                navig("/");
              }}>Logout</Nav.Link>
              <Nav.Link onClick={()=>navig("/profile")}>My Profile: <span style={{color: "green", fontWeight:'bold'}}>
                {globalUser && <span>{globalUser.name}</span>}</span>
              </Nav.Link>
              </>
              ) : (
              <>
                <Nav.Link onClick={()=>navig("/login")}>Login</Nav.Link>
                <Nav.Link onClick={()=>navig("/registration")}>Register</Nav.Link>
              </>)
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}
