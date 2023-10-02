import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleMonoChrome } from "@/store/layoutReducer";

const useMonoChrome = () => {
  const dispatch = useDispatch();
  const isMonoChrome = useSelector((state) => state.layout.isMonochrome);

  const setMonoChrome = (val) => dispatch(handleMonoChrome(val));

  return [isMonoChrome, setMonoChrome];
};

export default useMonoChrome;
