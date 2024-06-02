import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    isFetching: false,
    error: false,
    events: null,
});

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                setUser: (user) => dispatch({ type: "LOGIN_SUCCESS", payload: user }),
                isFetching: state.isFetching,
                error: state.error,
                events: state.user ? state.user.events : null,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
