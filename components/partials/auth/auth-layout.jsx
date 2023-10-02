import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import AuthLayout1 from "@/components/partials/auth/auth-layout1";
import AuthLayout2 from "@/components/partials/auth/auth-layout2";
import AuthLayout3 from "@/components/partials/auth/auth-layout3";

import appConfig from "@/configs/appConfig";

const AuthLayout = ({ authflow }) => {
  const [isDark] = useDarkMode();
  var layout1 = false;
  var layout2 = false;
  var layout3 = false;
  if (appConfig.loginDesign == 1) layout1 = true;
  if (appConfig.loginDesign == 2) layout2 = true;
  if (appConfig.loginDesign == 3) layout3 = true;

  return (
    <>
      {layout1 && <AuthLayout1 authflow={authflow} />}
      {layout2 && <AuthLayout2 authflow={authflow} />}
      {layout3 && <AuthLayout3 authflow={authflow} />}
    </>
  );
};

export default AuthLayout;
