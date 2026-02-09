import { useNavigate } from "react-router-dom";
import servicesimg from "../assets/images/cleaning-services.jpg";
import '../styles/Welcome.css'; 

import cleaning from "../assets/images/cleaning.png";
import painting from "../assets/images/painting.png";
import plumbing from "../assets/images/plumbing.png";
import electrical from "../assets/images/electrical.png";
import appliancerepair from "../assets/images/appliance-repair.png";
import applianceinstallation from "../assets/images/appliance-installation.png";

const servicecards = [
    {
        id:1, servicesimg: cleaning, title: "Cleaning"
    },
    {
        id:2, servicesimg: painting, title: "Painting"
    },
    {
        id:3, servicesimg: plumbing, title: "Plumbing"
    },
    {
        id:4, servicesimg: electrical, title: "Electrical"
    },
    {
        id:5, servicesimg: appliancerepair, title: "Appliance Repair"
    },
    {
        id:6, servicesimg: applianceinstallation, title: "Appliance Installation"
    }
];

export default function Welcome() {

    const navigate = useNavigate();

    return (
        <div className='wrapper'>
            <div className="welcome-note">
                <div className="welcome-head"><h1>Welcome to <span style={{color:"rgb(18, 0, 180)"}}>Skill</span ><span style={{color:"rgb(250, 110, 10)"}}>Scanner</span></h1></div>
                <div className='welcome-text'>
                    <i>"The platform where you get all your home services at your doorstep."</i>
                </div>
            </div>

            <div className='services-data'>
                <div className="servicesdiv">
                    <div className='services-head'><h1>Services at your doorstep</h1></div>
                    <div className='services'>
                        <div className="services-msg"><h4>What are you looking for?</h4></div>
                        <div className="services-types">
                            {servicecards.map((image)=>(
                                <div className="service-card" key={image.id} onClick={() => navigate("/availablePartners", { state: { skill: image.title } })}>
                                    <img src={image.servicesimg} className="service-img" alt={image.title}></img>
                                    <p className="service-title">{image.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="imgdiv"><img src={servicesimg} alt="donor-love" className="image"/></div>
            </div>
        </div>
    );
}