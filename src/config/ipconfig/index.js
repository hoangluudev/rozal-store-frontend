const LOCAL_SERVER_URL = process.env.REACT_APP_BASE_SERVER_URL;
const BASE_URL = "https://rozal-store-api.onrender.com/api/v1";

const getServerURL = () => {
  return BASE_URL || LOCAL_SERVER_URL;
};

export default getServerURL;
