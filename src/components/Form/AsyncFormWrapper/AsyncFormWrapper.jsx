import { MessageSuccess, MessageError, Loader } from "../../index";

const AsyncFormWrapper = ({ status, success, error, children }) => {
  switch (status) {
    case "success":
      return <MessageSuccess message={success} />;
    case "error":
      return <MessageError message={error} />;
    case "loading":
      return <Loader />;
    default:
      return children;
  }
};

export default AsyncFormWrapper;
