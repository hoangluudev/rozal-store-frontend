import * as React from "react";
import { getAccessToken } from "../../services/tokenService";

const IsAlreadyLoggedIn = ({ childComponent }) => {
  const isLoggedIn = getAccessToken();

  React.useEffect(() => {
    const currentPath = window.location.pathname;
    if (isLoggedIn) {
      if (currentPath === "/login" || currentPath === "/sign-up") {
        window.location.replace("/");
      }
    }
  }, [isLoggedIn]);

  return childComponent;
};

export default IsAlreadyLoggedIn;
