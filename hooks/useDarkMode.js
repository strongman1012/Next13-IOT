import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleDarkMode } from "@/store/layoutReducer";

const useDarkmode = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.layout.darkMode);

  const setDarkMode = (mode) => {
    dispatch(handleDarkMode(mode));
  };

  return [isDark, setDarkMode];
};

export default useDarkmode;
