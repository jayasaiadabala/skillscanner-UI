import '../styles/Invite.css'
import { useNavigate } from 'react-router-dom';

import becomepartner from "../assets/images/becomepartner.png"
import invite from "../assets/images/invite.png"

export default function () {

    const navigate = useNavigate();

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
        <div className="invite-wrapper">
            <div className="invite">
                <img className='invite-image' onClick={()=>navigate("/workPartner")} src={becomepartner} alt="becomepartner" />
            </div>

            <div className="invite">
                <img className='invite-image' onClick={handleInvite} src={invite} alt="become-partner" />
            </div>
        </div>
    )
}