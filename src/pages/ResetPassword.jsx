import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {

    let navig = useNavigate();
    const API = import.meta.env.VITE_API_URL;

    const [message, setMessage] = useState("");

    const [mail, setMail] = useState("");

    const [user, setUser] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpMsg, setOtpMsg] = useState("");

    const [loading, setLoading] = useState(false);

    const [newPassword, setNewPassword] = useState({
        newPass: "",
        confirmPass: ""
    });

    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    function sendOtp() {
        setSendingOtp(true);
        setOtpMsg("");
        setMessage("");

        axios.post(`${API}/sendResetOtp/${mail}`)
            .then(res => {
                setOtpSent(true);
                setOtpMsg(res.data || "OTP sent to email");
            })
            .catch(err => {
                if (err.response?.data) {
                    setMessage(err.response.data);
                } else {
                    setMessage("Failed to send OTP");
                }
                setOtpSent(false);
            })
            .finally(() => {
                setSendingOtp(false);
            });
    }

    function verifyOtp() {
        setVerifyingOtp(true);
        setOtpMsg("");
        setMessage("");

        axios.post(`${API}/verifyOtp/${mail}/${otp}`)
            .then(res => {
                setOtpVerified(true);
                setOtpMsg(res.data || "OTP verified successfully");

                // Fetch user details after OTP verification
                axios.get(`${API}/user/${mail}`)
                    .then(resp => {
                        if (resp.status === 200 && resp.data) {
                            setUser(resp.data);
                            setMessage("Hello " + resp.data.name);
                        }
                    })
                    .catch(() => setMessage("Email not registered"));
            })
            .catch(() => {
                setOtpMsg("Invalid OTP");
                setOtpVerified(false);
            })
            .finally(() => {
                setVerifyingOtp(false);
            });
    }

    function handleReset(e) {
        e.preventDefault();

        if (newPassword.newPass.length < 8 || newPassword.confirmPass.length < 8) {
            setMessage('');
            return;
        }

        if (newPassword.newPass === newPassword.confirmPass) {
            const resetUser = { ...user, password: newPassword.newPass };
            setUser(resetUser);

            setLoading(true);
            axios.put(`${API}/update`, resetUser)
                .then(() => {
                    setMessage("Password Reset Successfully, Please login");
                    setTimeout(() => navig("/login"), 2000);
                })
                .catch(() => setMessage("Something went wrong"))
                .finally(() => setLoading(false));
        } else {
            setMessage("Confirm password wrong");
        }
    }

    return (
        <>
            <Header />
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <h1 className="text-center" style={{ marginTop: "5vh" }}>Reset Password</h1>
                <i style={{ color: (message === "Email not registered" || message === "Confirm password wrong") ? "red" : "green" }}>{message}</i>
                <div className="container" style={{ marginTop: "5vh" }}>
                    <form onSubmit={handleReset}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={mail}
                                    required
                                    onChange={(e) => setMail(e.target.value)}
                                    disabled={otpSent}
                                />
                                <button
                                    type="button"
                                    className={`btn ${otpSent ? "btn-success" : "btn-outline-success"}`}
                                    onClick={sendOtp}
                                    disabled={sendingOtp || otpSent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)}
                                >
                                    {sendingOtp ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                            Sending...
                                        </>
                                    ) : otpSent ? "Sent" : "Send OTP"}
                                </button>
                            </div>
                            {mail.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) && (
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
                                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                            Verifying...
                                        </>
                                    ) : otpVerified ? "Verified" : "Verify"}
                                </button>
                            </div>
                            {otpMsg && (
                                <small className={otpVerified ? "text-success" : "text-danger"}>{otpMsg}</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="New password"
                                    value={newPassword.newPass}
                                    onChange={(e) => setNewPassword({ ...newPassword, newPass: e.target.value })}
                                    required
                                    maxLength={16}
                                />
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </button>
                            </div>
                            {newPassword.newPass.length > 0 && (newPassword.newPass.length < 8 || newPassword.newPass.length > 16) && (
                                <small className="text-danger">Password must be 8 to 16 characters</small>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Confirm Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Confirm password"
                                    value={newPassword.confirmPass}
                                    onChange={(e) => setNewPassword({ ...newPassword, confirmPass: e.target.value })}
                                    required
                                    maxLength={16}
                                />
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </button>
                            </div>
                            {newPassword.confirmPass.length > 0 && (newPassword.confirmPass.length < 8 || newPassword.confirmPass.length > 16) && (
                                <small className="text-danger">Password must be 8 to 16 characters</small>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            disabled={!otpVerified || message === "Password Reset Successfully, Please login" || loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </>
                            ) : (
                                "Reset"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
