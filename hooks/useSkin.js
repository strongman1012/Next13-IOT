import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleSkin } from "@/store/layoutReducer";

const useSkin = () => {
  const dispatch = useDispatch();
  const skin = useSelector((state) => state.layout.skin);

  const setSkin = (mod) => dispatch(handleSkin(mod));

  return [skin, setSkin];
};

export default useSkin;
