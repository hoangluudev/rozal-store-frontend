import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../services/tokenService";

const IsLoggedIn = ({ childComponent }) => {
  const navigate = useNavigate();
  const isLoggedIn = getAccessToken();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return childComponent;
};

export default IsLoggedIn;
