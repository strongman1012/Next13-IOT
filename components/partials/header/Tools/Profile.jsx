import React, { useState, useEffect } from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { handleLogout } from "@/components/partials/auth/store";
import { useRouter } from "next/navigation";

const ProfileLabel = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userInfo = JSON.parse(window?.localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);
  return (
    <div className="flex items-center">
      <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            src="/assets/images/all-img/user.png"
            alt=""
            className="block w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">
          {user.username}
        </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const ProfileMenu = [
    {
      label: "MY ACCOUNT",
    },
    {
      label: "Profile",
      icon: "heroicons-outline:user",

      action: () => {
        router.push("/editProfile");
      },
    },
    {
      label: "Password",
      icon: "heroicons:lock-closed",
      action: () => {
        router.push("/password");
      },
    },
    {
      label: "Two-Factor Auth",
      icon: "material-symbols:phone-iphone-outline-sharp",
      action: () => {
        router.push("/twoAuth");
      },
    },
    {
      label: "Account Links",
      icon: "material-symbols:link",
      action: () => {
        router.push("/accountLinks");
      },
    },
    {
      label: "User API Tokens",
      icon: "file-icons:openapi",
      action: () => {
        router.push("/userAPItoken");
      },
    },
    {
      label: "Logout",
      icon: "heroicons-outline:login",
      action: () => {
        dispatch(handleLogout(false));
      },
    },
  ];

  return (
    <Dropdown label={ProfileLabel()} classMenuItems="w-[180px] top-[58px]">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${
                active
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
              } block     ${
                item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
              }`}
            >
              <div className={`block cursor-pointer px-4 py-2`}>
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
