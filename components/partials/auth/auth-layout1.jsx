import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import Social from "@/components/partials/auth/social";
import appConfig from "@/configs/appConfig";
import LoginForm from "./login-form";
import RegForm from "@/components/partials/auth/reg-from";
import ForgotPass from "@/components/partials/auth/forgot-pass";

const AuthLayout1 = ({authflow}) => {
    const [isDark] = useDarkMode();
    if (authflow == "login") {
        var login = 1;
        var caption = "Sign In";
        var caption2 = "Sign in to your account to start using the application";
        var control = <LoginForm />
        var password = false;
        var footer = "Don’t have an account?"
        var footer2 = "Sign up";
        var footerlink = "/register";
    }
    else if (authflow == "register") {
        var caption = "Sign Up";
        var caption2 = "Create an account to start using the application";
        var control = <RegForm />
        var password = false;
        var footer = "Already registered?"
        var footer2 = "Sign In";
        var footerlink = "/";
    }
    else if (authflow == "password") {
        var caption = "Forgot Your Password?";
        var caption2 = "Reset Password for the application.";
        var control = <ForgotPass />
        var password = true;
        var footer = "Forget It,"
        var footer2 = "Send me Back to The Sign In";
        var footerlink = "/";        
    }
    return (
      <>
      <div className="loginwrapper">
        <div className="lg-inner-column">
        <div className="left-column relative z-[1]">
            <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
              <Link href="/">
                <img
                  src={
                    isDark
                      ? "/assets/images/logo/" + appConfig.appShadowLogoDark
                      : "/assets/images/logo/" + appConfig.appShadowLogo
                  }
                  alt=""
                  width={appConfig.appShadowLogoWidth + "px"}
                  className="mb-10"
                />
              </Link>
              <h5>
                {appConfig.appMission}
              </h5>
            </div>
            <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
              {/* <img
                src="/assets/images/auth/ils1.svg"
                alt=""
                className="h-full w-full object-contain"
              /> */}
            </div>
          </div>          
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    <img
                      src={
                        isDark
                          ? "/assets/images/logo/" + appConfig.appLogoDark
                          : "/assets/images/logo/" + appConfig.appLogo
                      }
                      alt=""
                      width={appConfig.appLogoWidth + "px"}
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">{caption}</h4>
                  <div className="text-slate-500 text-base">
                    {caption2}
                  </div>
                </div>
                {password && 
                <>
                  <div className="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10">
                  Enter your Email and instructions will be sent to you!
                  </div>
                </>
                }
                {control}
                {!password && 
                <>
                <div className="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                  <div className="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal">
                    Or continue with
                  </div>
                </div>
                <div className="max-w-[242px] mx-auto mt-8 w-full">
                  <Social />
                </div>
                </>
                }
                <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
                  {footer}{" "}
                  <Link
                    href={footerlink}
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    {footer2}
                  </Link>
                </div>
              </div>
              <div className="auth-footer text-center">
                Copyright {appConfig.year}, {appConfig.companyName}. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>           
      </>

    );
  };
  
  export default AuthLayout1;
