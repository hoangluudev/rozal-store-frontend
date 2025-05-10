const LOCAL_SERVER_URL = process.env.REACT_APP_LOCAL_SERVER_URL;
// const SERVER_TEST_URL = process.env.REACT_APP_SERVER_TEST_URL;

const getServerURL = () => {
  return LOCAL_SERVER_URL;
};

export default getServerURL;
