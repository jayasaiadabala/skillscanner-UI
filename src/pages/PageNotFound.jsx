import err from "../assets/images/error.jpg"
export default function PageNotFound() {
  return (
    <div style={{ width: "100%", height: "100vh",overflow:"hidden"}}>
      <img style={{ width: "100%", height: "auto" }} src={err} alt="404 - Not Found" />
    </div>
  );
}