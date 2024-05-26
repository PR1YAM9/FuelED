import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("/api/auth/signin", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
}
export const logoutCall = (dispatch) => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
};
