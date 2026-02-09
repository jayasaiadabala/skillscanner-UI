import axios from "axios"
import { useState } from "react"
import Header from "../components/Header";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";    
import '../styles/Register.css';

export default function Register(){

    let navig=useNavigate();
    const API = import.meta.env.VITE_API_URL;
    
    let [registered,setRegistered]=useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpMsg, setOtpMsg] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    let[user,setUser]=useState({
        name:'',
        emailid:'',
        mobile:'',
        password:'',
        dob:'',
        city:'',
        location:'',
        workpartner:'',
        skill:''
    })

    function sendOtp() {
        setSendingOtp(true);
        setOtpMsg("");
        setRegistered("");

        axios.post(`${API}/sendOtp/${user.emailid}`)
            .then(res => {
                setOtpSent(true);
                setOtpMsg("OTP sent to email");
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setRegistered(err.response.data); // backend message
                } else {
                    setRegistered("Failed to send OTP");
                }
                setOtpSent(false);
            })
            .finally(() => setSendingOtp(false));
    }

    function verifyOtp() {
        setVerifyingOtp(true);
        setOtpMsg("");

        axios.post(`${API}/verifyOtp/${user.emailid}/${otp}`)
            .then(res => {
                setOtpVerified(true);
                setOtpMsg(res.data);
            })
            .catch(() => {
                setOtpMsg("Invalid OTP");
                setOtpVerified(false);
            })
            .finally(() => setVerifyingOtp(false));
    }

    function register(e){
        e.preventDefault();

        if (!user.mobile || user.mobile.length !== 10) {
            setRegistered("Enter a valid mobile number");
            return;
        }

        if (user.password.length < 8 || user.password.length > 16) {
            setRegistered("Password must be 8 to 16 characters");
            return;
        }

        setLoading(true);
        setRegistered("");

        axios.post(`${API}/register`, user)
            .then(resp => {
                setRegistered("Registration successful, please login");
                setTimeout(()=>{
                    navig("/login");
                },1000);
            })
            .catch(err => {
                console.log(err);
                setRegistered("Registration failed, please try again");
            })
            .finally(() => {
                setLoading(false);
            });
    }


    return(
        <div>
            <Header/>
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                <h1 className="text-center" style={{marginTop:"5vh"}}>Registration</h1>
                <i style={{color: registered === "Registration successful, please login" ? "green" : "red",textAlign:"center"}}>{registered}</i>
                <div className="container reg">
                    <form onSubmit={register}>
                        
                        <div>
                            <label htmlFor="text" className="form-label">Full Name</label>
                            <input type="text" className="form-control" placeholder="Enter name" required onChange={(e)=>setUser({...user,name:e.target.value})}/><br />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <div className="input-group">
                                <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="emailid"
                                placeholder="Enter your email"
                                value={user.emailid}
                                required
                                onChange={(e) => setUser({ ...user, emailid: e.target.value })}
                                disabled={otpSent}
                                />
                                <button
                                    type="button"
                                    className={`btn ${otpSent ? "btn-success" : "btn-outline-success"}`}
                                    onClick={sendOtp}
                                    disabled={
                                        sendingOtp ||
                                        otpSent ||
                                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.emailid)
                                    }
                                >
                                    {sendingOtp ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            ></span>
                                            Sending...
                                        </>
                                    ) : (
                                        otpSent ? "Sent" : "Send OTP"
                                    )}
                                </button>
                            </div>

                            {user.emailid.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.emailid) && (
                                <small className="text-danger">Enter a valid email address</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">OTP</label>
                            <div className="input-group">
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    disabled={!otpSent || otpVerified}
                                />
                                <button
                                    type="button"
                                    className={`btn ${otpVerified ? "btn-success" : "btn-outline-success"}`}
                                    onClick={verifyOtp}
                                    disabled={verifyingOtp || otpVerified || !otp}
                                >
                                    {verifyingOtp ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            ></span>
                                            Verifying...
                                        </>
                                    ) : (
                                        otpVerified ? "Verified" : "Verify"
                                    )}
                                </button>
                            </div>

                            {otpMsg && (
                                <small className={otpVerified ? "text-success" : "text-danger"}>
                                    {otpMsg}
                                </small>
                            )}
                        </div>

                        <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="mobile"
                            name="mobile"
                            placeholder="Enter your mobile number"
                            value={user.mobile}
                            maxLength={10}
                            required
                            onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setUser({ ...user, mobile: value });
                            }
                            }}
                        />
                        {user.mobile.length > 0 && user.mobile.length !== 10 && (
                            <small className="text-danger">
                            Enter a valid mobile number
                            </small>
                        )}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Create password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                                maxLength={16}
                                />
                                <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                                >
                                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </button>
                            </div>
                            {user.password.length > 0 && (user.password.length < 8 || user.password.length > 16) && (
                                <small className="text-danger">
                                Password must be 8 to 16 characters
                                </small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" required id="dob" onChange={(e)=>setUser({...user,dob:e.target.value})}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <select className="form-select" name="city" id="citySelect" required onChange={(e)=>setUser({...user,city:e.target.value})}>
                                <option value="">Select your City</option>
                                <option value="Hyderabad">Hyderabad</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <select className="form-select" name="location" id="locationSelect" required disabled={!user.city} onChange={(e)=>setUser({...user,location:e.target.value})}>
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

                        <Nav>Already have an account?<Link to="/login">Login</Link></Nav>

                        <button 
                            type="submit" 
                            className="btn btn-primary mt-3 mb-5" 
                            disabled={!otpVerified || registered === "Registration successful, please login" || loading}
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
                                "Register"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
