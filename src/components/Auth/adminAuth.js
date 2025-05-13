import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../services/tokenService";
import { useCurrentUserApi } from "../../hooks/api";

const AdminAuthentication = ({ childComponent }) => {
  const { isAdminRole, currentUserData } = useCurrentUserApi().state;

  const navigate = useNavigate();
  const isLoggedIn = getAccessToken();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (currentUserData !== null && isAdminRole !== null) {
      setLoading(false);
    }
    if (isLoggedIn === null) {
      setLoading(false);
      navigate("/forbidden", { replace: true });
    }
  }, [currentUserData, isAdminRole, isLoggedIn, navigate]);
  React.useEffect(() => {
    if (!loading) {
      if (currentUserData && isAdminRole === false) {
        navigate("/forbidden", { replace: true });
      }
    }
  }, [loading, currentUserData, isAdminRole, navigate]);

  return childComponent;
};

export default AdminAuthentication;
