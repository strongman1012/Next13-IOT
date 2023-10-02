import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/Icon";
import { toggleActiveChat } from "@/components/partials/app/chat/store";
import { useDispatch } from "react-redux";
import useMobileMenu from "@/hooks/useMobileMenu";

const Navmenu = ({ menus }) => {
  const router = useRouter();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [role, setRole] = useState(null);
  const toggleSubmenu = (i) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const location = usePathname();
  const locationName = location.replace("/", "");

  const [mobileMenu, setMobileMenu] = useMobileMenu();
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(window?.localStorage.getItem("userInfo"));
    setRole(userInfo.role);
    let submenuIndex = null;
    menus.map((item, i) => {
      if (!item.child) return;
      if (item.link === locationName) {
        submenuIndex = null;
      } else {
        const ciIndex = item.child.findIndex(
          (ci) => ci.childlink === locationName
        );
        if (ciIndex !== -1) {
          submenuIndex = i;
        }
      }
    });

    setActiveSubmenu(submenuIndex);
    dispatch(toggleActiveChat(false));
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [router, location]);

  return (
    <>
      <ul>
        {menus.map((item, i) => (
          <li
            key={i}
            className={` single-sidebar-menu 
              ${item.child ? "item-has-children" : ""}
              ${activeSubmenu === i ? "open" : ""}
              ${locationName === item.link ? "menu-item-active" : ""}`}
          >
            {/* single menu with no childred*/}
            {!item.child &&
              !item.isHeadr &&
              item.auth &&
              item.auth.includes(role) && (
                <Link className="menu-link" href={item.link}>
                  <span className="menu-icon flex-grow-0">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box flex-grow">{item.title}</div>
                  {item.badge && (
                    <span className="menu-badge">{item.badge}</span>
                  )}
                </Link>
              )}
            {/* only for menulabel */}
            {item.isHeadr &&
              !item.child &&
              item.auth &&
              item.auth.includes(role) && (
                <div className="menulabel">{item.title}</div>
              )}
            {/*    !!sub menu parent   */}
            {item.child && item.auth && item.auth.includes(role) && (
              <div
                className={`menu-link ${
                  activeSubmenu === i
                    ? "parent_active not-collapsed"
                    : "collapsed"
                }`}
                onClick={() => toggleSubmenu(i)}
              >
                <div className="flex-1 flex items-start">
                  <span className="menu-icon">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box">{item.title}</div>
                </div>
                <div className="flex-0">
                  <div
                    className={`menu-arrow transform transition-all duration-300 ${
                      activeSubmenu === i ? " rotate-90" : ""
                    }`}
                  >
                    <Icon icon="heroicons-outline:chevron-right" />
                  </div>
                </div>
              </div>
            )}
            <Collapse isOpened={activeSubmenu === i}>
              <ul className="sub-menu ">
                {item.child?.map(
                  (subItem, j) =>
                    subItem.auth &&
                    subItem.auth.includes(role) && (
                      <li key={j} className="block pl-4 pr-1 mb-4 first:mt-4">
                        <Link href={subItem.childlink}>
                          <span
                            className={`${
                              locationName === subItem.childlink
                                ? " text-black dark:text-white font-medium"
                                : "text-slate-600 dark:text-slate-300"
                            } text-sm flex space-x-3 items-center transition-all duration-150`}
                          >
                            <span
                              className={`${
                                locationName === subItem.childlink
                                  ? " bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                                  : ""
                              } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none`}
                            ></span>
                            <span className="flex-1">{subItem.childtitle}</span>
                          </span>
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </Collapse>
          </li>
        ))}
        <li className="single-sidebar-menu">
          <a
            href="https://dashcode-react-doc.codeshaper.tech/"
            target="_blank"
            className="menu-link"
          >
            <span className="menu-icon">
              <Icon icon="heroicons:document" />
            </span>
            <div className="text-box">Documentation</div>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Navmenu;
