import Header from "../components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react"

import { useNavigate, useLocation  } from "react-router-dom";
import UserContext from "../context/UserContext";



export default function AvailablePartners(){

    const navig = useNavigate();

    const uselocation = useLocation();
    const initialSkill = uselocation.state?.skill || "";

    const { globalUser, isLoggedIn } = useContext(UserContext);

    const [city, setCity] = useState("Hyderabad");
    
    const [location, setLocation] = useState("");

    const [workSkill, setWorkSkill] = useState(initialSkill);

    const API = import.meta.env.VITE_API_URL;

    const [sendingMailFor, setSendingMailFor] = useState('');

    const [mailStatus, setMailStatus] = useState({});
    
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        axios.get(`${API}/allusers`)
        .then(response => setUsers(response.data))
        .catch(error => console.log(error))
    },[])
    
    function filterUsers() {
        let filteredUsers = users.filter(user => user.workpartner == "yes");
        if(!city && !location) {
            return filteredUsers;
        }
        if (city) {
            filteredUsers = filteredUsers.filter(user => user.city.toLowerCase().includes(city.toLowerCase()));
        }
        if (location) {
            filteredUsers = filteredUsers.filter(user => user.location.toLowerCase().includes(location.toLowerCase()));
        }
        if (workSkill) {
            filteredUsers = filteredUsers.filter(user => {
                const userSkillsArray = user.skill.split(',').map(s => s.trim().toLowerCase());
                return userSkillsArray.includes(workSkill.toLowerCase());
            });
        }
        return filteredUsers;
    }

    function mail(partnerGmail, userGmail) {
        setSendingMailFor(partnerGmail);
        setMailStatus(prev => ({ ...prev, [partnerGmail]: "" }));

        axios.get(`${API}/mailToPartner/${partnerGmail}/${userGmail}`)
            .then(resp => {
                setMailStatus(prev => ({ ...prev, [partnerGmail]: resp.data }));
                setSendingMailFor('');
            })
            .catch(() => {
                setMailStatus(prev => ({ ...prev, [partnerGmail]: "Mail not delivered" }));
                setSendingMailFor('');
            });
    }

    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const hasBirthdayPassedThisYear =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasBirthdayPassedThisYear) {
            age--;
        }
        return age;
    }

    return(
        <>
            <Header/>
            {(isLoggedIn)?
                (<div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <h1 style={{textAlign:"center",margin:"2vh"}}><span style={{color:"rgb(18, 0, 180)"}}>Available </span ><span style={{color:"rgb(250, 110, 10)"}}>Partners</span></h1>

                    <div className="search-bar" style={{display:"flex",justifyContent:"center",marginBottom:"2vh"}}>
                        <select className="form-select" name="workSkill" id="workSkillSelect" value={workSkill} onChange={(e) => setWorkSkill(e.target.value)}>
                            <option value="">Search Work Skill</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Appliance Installation">Appliance Installation</option>
                            <option value="Appliance Repair">Appliance Repair</option>
                            <option value="Surveillance">Surveillance</option>
                            <option value="Laptop Repair">Laptop Repair</option>
                            <option value="Painting">Painting</option>
                            <option value="Cleaning">Cleaning</option>
                        </select>                            
                    </div>

                    <div className="search-bar" style={{display:"flex",justifyContent:"center",marginBottom:"2vh"}}>
                        
                        <select className="form-select" name="city" id="citySelect" required disabled onChange={(e)=>setCity(e.target.value)}>
                            {/* <option value="">Select your City</option> */}
                            <option value="Hyderabad">Hyderabad</option>
                        </select>

                        <select className="form-select" name="location" id="locationSelect" required disabled={!city} onChange={(e)=>setLocation(e.target.value)}>
                            <option value="">Select your location</option>
                            <option value="Amerpet">Amerpet</option>
                            <option value="Hitech City">Hitech City</option>
                            <option value="KPHB">KPHB</option>
                            <option value="Kukatpally">Kukatpally</option>
                            <option value="Lingampally">Lingampally</option>
                            <option value="Madhapur">Madhapur</option>
                            <option value="Miapur">Miapur</option>
                            <option value="Raidurg">Raidurg</option>
                        </select>                            
                    </div>

                    <div style={{width:"100vw",overflow:"scroll"}}>

                        {   users.length === 0 || filterUsers().length === 0 ? (
                            <div className="alert alert-info" role="alert">
                                No partners available.
                            </div>
                        ) : (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Skills</th>
                                        <th>Location</th>
                                        <th>Age</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {filterUsers().map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.skill}</td>
                                            <td>{user.location}, {user.city}</td>
                                            <td>{calculateAge(user.dob)}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => mail(user.emailid, globalUser.emailid)}
                                                    disabled={sendingMailFor === user.emailid}
                                                >
                                                    {sendingMailFor === user.emailid
                                                        ? "Sending..."
                                                        :  <i className="bi bi-envelope-at-fill"> Mail</i>
                                                    }
                                                </button>
                                                
                                                <button className="btn btn-outline-secondary text-success">
                                                    <a 
                                                        href={`https://wa.me/+91${user.mobile}?text=${encodeURIComponent(
                                                        `Hi ${user.name}, I found your details on SkillScanner app would like to hire you for your services. Are you available?`
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{textDecoration:"none"}}
                                                    ><i className="bi bi-whatsapp"></i> Chat</a>
                                                </button>
                                                <button className="btn btn-outline-primary">
                                                    <a 
                                                        href={`tel:${user.mobile}`} 
                                                        style={{ textDecoration: "none", color: "inherit" }}
                                                    >
                                                    <i className="bi bi-telephone-fill"></i> Call
                                                    </a>
                                                </button>

                                                {mailStatus[user.emailid] && (
                                                    <i style={{ marginTop: "0.5rem", color: mailStatus[user.emailid] === "Mail Sent Successfully" ? "green" : "red" }}>
                                                        {mailStatus[user.emailid]}
                                                    </i>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>  
                        )}
                    </div>
                </div>):
                (<div style={popupStyle}>
                    <div style={popupContentStyle}>
                        <h2>Please Login First</h2>
                        <button className="btn btn-primary" onClick={()=>navig("/login")}>Login</button>
                        <button className="btn btn-secondary" onClick={()=>navig("/")}>Back To Home</button>
                    </div>
                </div>)
            }
        </>
    )
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
    width :"20rem",
    height :"15rem",
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    textAlign: "center",
    display :"flex",
    flexDirection:"column",
    justifyContent:"space-around"
};