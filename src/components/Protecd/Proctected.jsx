import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Proctected = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  //Menggunakan useSelector untuk mendapatkan nilai token dari state Redux di bawah properti "auth".

  useEffect(() => {
    if (!token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return children;
};

export default Proctected;
