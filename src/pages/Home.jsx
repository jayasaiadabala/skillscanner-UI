import About from "../components/About";
import Content from "../components/Content";
import Header from "../components/Header";
import Invite from "../components/Invite";
import Welcome from "../components/Welcome";

export default function Home(){
    return(
        <>
           <Header/>
           <Welcome/>
           <Content/>
           <Invite/>
           <About/>
        </>
    )
}