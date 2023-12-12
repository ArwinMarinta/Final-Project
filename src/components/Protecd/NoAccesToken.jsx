import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Proctected = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  //Menggunakan useSelector untuk mendapatkan nilai token dari state Redux di atas properti "auth".

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return children;
};

export default Proctected;
