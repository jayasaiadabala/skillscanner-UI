import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import UserContext from "../context/UserContext";
import axios from "axios";
import "../styles/Profile.css";

import { emptyuser } from '../constants/emptyUser';

export default function Profile() {

  const API = import.meta.env.VITE_API_URL;

  const { globalUser, setGlobalUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  
  const navigate = useNavigate();

  function calculateAge(dob) {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const deleteAccount = (e) => {
    e.preventDefault();
    axios.delete(`${API}/delete/${globalUser.emailid}`)
    .then(resp => "yes-deleted")
    .catch(err => console.log(err));
    setGlobalUser(emptyuser);
    setIsLoggedIn(false);
  }

  return (
    <>
      <Header />
      {
        (isLoggedIn) ? (
          <div className="profile-container">
            <h2 className="profile-title fnt">User Profile</h2>
            <div className="profile-card fnt">
              <div className="profile-row"><span>Name:</span> {globalUser.name}</div>
              <div className="profile-row"><span>Email:</span> {globalUser.emailid}</div>
              <div className="profile-row"><span>Mobile:</span> {globalUser.mobile}</div>
              <div className="profile-row"><span>Age:</span> {calculateAge(globalUser.dob)}</div>
              <div className="profile-row"><span>Address:</span> {globalUser.location+", "+globalUser.city}</div>
              <div className="profile-row">
                <span>WorkPartner:</span>
                <span className={globalUser.workpartner === "yes" ? "available" : "not-available"}>
                  {globalUser.workpartner === "yes" ? "Available" : 
                  (<div>Not Available <button className="btn btn-success" onClick={()=>navigate("/workPartner")}>Register</button></div>)}
                </span>
              </div>
              <div className="profile-row">
                <span>Skills:</span> 
                  <span className={globalUser.workpartner === "yes" ? "skills" : "not-available"}>
                    {globalUser.workpartner === "yes" ?(globalUser.skill):'Not Available'}
                  </span>
              </div>
            </div>
            <div className="delete-account fnt"><button type="submit" onClick={deleteAccount} className="btn btn-danger mt-3" >Delete Account</button></div>
          </div>
        ) : (
          <div style={popupStyle}>
            <div style={popupContentStyle}>
              <h2>Please Login First</h2>
              <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
              <button className="btn btn-secondary" onClick={() => navigate("/")}>Back To Home</button>
            </div>
          </div>
        )
      }
    </>
  );
}

const popupStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const popupContentStyle = {
  width: "20rem",
  height: "15rem",
  background: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around"
};