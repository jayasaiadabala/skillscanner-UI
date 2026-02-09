import { useContext,useState } from "react";
import Header from "../components/Header";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import '../styles/WorkPartner.css';
import axios from "axios";

export default function WorkPartner(){

    const{globalUser,setGlobalUser,isLoggedIn}=useContext(UserContext);

    const navig = useNavigate();

    const API = import.meta.env.VITE_API_URL;

    const skillsOptions = [
    'Electrical',
    'Plumbing',
    'Appliance Installation',
    'Appliance Repair',
    'Surveillance',
    'Laptop Repair',
    'Painting',
    'Cleaning',
  ]

  const [selectedSkills, setSelectedSkills] = useState('')

  const handleCheckboxChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const updateSkills = (e) => {
    e.preventDefault();
    const updatedUser = { ...globalUser, workpartner: "yes", skill:selectedSkills.join(", ") };
    setGlobalUser(updatedUser);
    axios.put(`${API}/update`, updatedUser)
    .then(resp => "yes-Updated")
    .catch(err => console.log(err));
  }

  const deRegister = (e) => {
    e.preventDefault();
    const updatedUser = { ...globalUser, workpartner: '', skill:'' };
    setGlobalUser(updatedUser);
    axios.put(`${API}/update`, updatedUser)
    .then(resp => "yes-Updated")
    .catch(err => console.log(err));
  }


    return(
        <>
            <Header/>
            {
                (isLoggedIn) ? 
                    (<div className='partner-wrapper'>
                        <div className="partner-welcome fnt">
                            <h1 className="partner-welcome-head"><span style={{color:"rgb(18, 0, 180)"}}>Hello </span><span style={{color:"rgb(250, 110, 10)"}}>{globalUser.name}</span></h1>
                            {(globalUser.workpartner)?
                                (<div className="partner-current-note">
                                    <i className="partner-welcome-text">We are so happy to have you in our SlillScanner family</i>
                                    <div className="current-skills">
                                        <div className="mt-3">
                                            <strong>Current Skills:</strong> {globalUser.skill}
                                            
                                        </div>
                                        <button type="submit" onClick={deRegister} className="btn btn-danger mt-3" >Deregister</button>
                                    </div>
                                </div>):
                            (<i className="partner-welcome-text">Register your skills to become a partner</i>)}
                        </div>

                        <div className="container mt-3 partner-skilldata">
                            <div className="skill-form fnt">
                                <h3>Select Your Skills</h3>

                                <form onSubmit={updateSkills}>
                                    <div className="form-group border p-3 rounded">
                                    {skillsOptions.map((skill) => (
                                        <div className="form-check" key={skill}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={skill}
                                            checked={selectedSkills.includes(skill)}
                                            onChange={() => handleCheckboxChange(skill)}
                                        />
                                        <label className="form-check-label" htmlFor={skill}>
                                            {skill}
                                        </label>
                                        </div>
                                    ))}
                                    </div>

                                    <div className="selected-skills">
                                        {selectedSkills.length > 0 && (
                                            <div className="mt-3">
                                            <strong>Selected Skills:</strong> {selectedSkills.join(', ')}
                                            </div>
                                        )}
                                    </div>

                                    <button type="submit" className="btn btn-primary mt-3" disabled={selectedSkills.length < 1}>
                                    Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                    </div>) :
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