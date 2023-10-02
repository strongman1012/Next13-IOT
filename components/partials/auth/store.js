import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// save users in local storage

const initialIsAuth = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("isAuth");
    return item ? JSON.parse(item) : false;
  }
  return false;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // user: initialUser(),
    user: null,
    isAuth: initialIsAuth(),
  },
  reducers: {
    handleRegister: (state, action) => {
      if (action.payload.state === 1)
        toast.success(action.payload.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      else
        toast.error(action.payload.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    },
    handleLogin: (state, action) => {
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      state.user = action.payload;
      state.isAuth = "true";
    },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      // remove isAuth from local storage
      if (typeof window !== "undefined") {
        window?.localStorage.removeItem("isAuth");
      }
      toast.success("User logged out successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
