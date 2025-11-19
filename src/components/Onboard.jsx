import logo from "../assets/logo.png";
import food1 from "../assets/food1.png";
import { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useFirebase } from "../contexts/fireBaseContext";

export default function Onboard() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const user = firebase.user;
  const loading = firebase.loading;

  useEffect(() => {
    if (loading) return;

    setTimeout(() => {
      if (user) {
        navigate("/home", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }, 900);
  }, [firebase.loading]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFEEDA]">
      <img className="scale-[0.6]" src={logo} alt="" />
      <img className="dropShadow absolute bottom-0 left-0" src={food1} alt="" />
    </div>
  );
}
