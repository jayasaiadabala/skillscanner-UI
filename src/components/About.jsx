import '../styles/About.css';
export default function About() {
  return (
    <div className="containerr" id='about'>
        <div className="back-container">
            <div className="about">
                <h1>About This App</h1>
                <p>At SkillScanner, we believe that every skill is worthy. From plumbing and electrical work to appliance repair, laptop servicing, and surveillance solutions, no skill is too small when it solves real-world problems. Our mission is to bridge the gap between skilled professionals and people who need reliable services by creating a platform where skills are recognized, valued, and easily discoverable.
                </p>
                <p>Designed for both customers and partners, SkillScanner allows service providers to register, showcase their skills, and reach the right audience, while customers can find trusted professionals for their everyday needs. Built with practicality and purpose, SkillScanner aims to empower local talent and make skill-based services accessible to everyone.</p>
                <p>This application is a demo version created for trial and educational purposes. It demonstrates the core features of the SkillScanner platform, highlighting how technology can be used to connect skilled partners with customers, promote diverse skill sets, and build a dependable service community.</p>
            </div>
            <div className="contact">
                <h1>Contact Us</h1>
                <p>If you have any questions, feedback, or inquiries, please feel free to reach out to us at.</p>
                <p><i className="bi bi-envelope-at-fill"></i> : <a href="mailto:saiadabala1919@gmail.com">saiadabala1919@gmail.com</a></p>
                <p><i className="bi bi-whatsapp"></i> : <a href="https://wa.me/+918074336123">Chat with us</a></p>
                <p><i className="bi bi-linkedin"></i> : <a href="https://www.linkedin.com/in/jaya-sai-adabala/">Jaya Sai Adabala</a></p>
                <p><i className="bi bi-github"></i> : <a href="https://github.com/jayasaiadabala">jayasaiadabala</a></p>

            </div>
            <div className="footer">
                <p>&copy; 2025 SkillScanner. All rights reserved.</p>
            </div>
        </div>
    </div>
  );
}