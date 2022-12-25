import { useSelector } from "react-redux";
//save and export user
const useAuth = () => useSelector((state) => state.auth);

export default useAuth;
