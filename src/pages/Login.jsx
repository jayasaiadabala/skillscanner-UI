import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function Login() {

    const { setIsLoggedIn , setGlobalUser } = useContext(UserContext);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    
    let navig = useNavigate();

    const API = import.meta.env.VITE_API_URL;

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

   
    function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        axios.get(`${API}/login/${user.email}/${user.password}`)
            .then(resp => {
                if (resp.status === 200 && resp.data) {
                    setMessage("Login successful");
                    setIsLoggedIn(true);
                    setGlobalUser(resp.data);
                    navig("/");
                } else {
                    setMessage("Login failed");
                }
            })
            .catch(() => {
                setMessage("Login failed");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Header/>
            
                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", }}>
                    <h1 className="text-center" style={{marginTop:"5vh,", }}><span className="fnt">Login</span></h1>
                    <i style={{ color: message === "Login failed" ? "red" : "green"}}>{message}</i>
                    <div className="container" style={{marginTop:"5vh"}}>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fnt">Email address</label>
                                <input type="email" className="form-control fnt" id="email" placeholder="Enter your email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fnt">Password</label>
                                <input className="form-control fnt" type={showPassword ? "text" : "password"} id="password" placeholder="Enter your password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary mt-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                    >
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </button>
                            </div>
                            <Nav className="fnt">
                                New User? <Link to="/registration"> Register</Link>
                                <span className="ms-auto" style={{ float: "right" }}>
                                    Forgot Password? <Link to="/resetPassword"> Reset</Link>
                                </span>
                            </Nav>
                            <button
                                className="btn btn-primary mt-3 fnt"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            aria-hidden="true"
                                        ></span>
                                        <span role="status">Loading...</span>
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
    </>
    );
}