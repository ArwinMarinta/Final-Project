import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, profile } from "../../redux/actions/AuthActions";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const onlogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (token) {
      dispatch(profile(navigate, null, "/login"));
    }
  }, [dispatch, navigate, token]);

  return (
    <>
      <Desktop user={user} />
      <Mobile />
    </>
  );
};

export default Header;
