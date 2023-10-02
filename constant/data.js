export const menuItems = [
  {
    isHeadr: true,
    title: "menu",
  },

  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    isOpen: true,
    isHide: true,
    auth: ["OrganisationAdmin", "OrganisationUser"],
    child: [
      {
        childtitle: "Main Dashboard",
        childlink: "analytics",
        auth: ["OrganisationAdmin", "OrganisationUser"],
      },
      {
        childtitle: "Dashboard Management",
        childlink: "ecommerce",
        auth: ["OrganisationAdmin"],
      },
      {
        childtitle: "Other Dashboards",
        childlink: "project",
        auth: ["OrganisationUser"],
      },
    ],
  },
  {
    title: "Users & Organisation",
    icon: "heroicons:users",
    isOpen: false,
    isHide: true,
    auth: ["SuperAdmin", "OrganisationAdmin"],
    child: [
      {
        childtitle: "Manage Organisations",
        childlink: "organisation",
        auth: ["SuperAdmin"],
      },
      {
        childtitle: "My Organisation",
        childlink: "my_organisation",
        auth: ["OrganisationAdmin"],
      },
      {
        childtitle: "Manage Users",
        childlink: "users",
        auth: ["SuperAdmin", "OrganisationAdmin"],
      },
    ],
  },
  {
    title: "Role Management",
    icon: "eos-icons:role-binding-outlined",
    isHide: true,
    link: "role",
    auth: ["SuperAdmin"],
  },
  {
    title: "Project Related",
    icon: "grommet-icons:projects",
    isOpen: false,
    isHide: true,
    auth: ["OrganisationAdmin", "OrganisationUser"],
    child: [
      {
        childtitle: "My Projects",
        childlink: "faq",
        auth: ["OrganisationAdmin", "OrganisationUser"],
      },
      {
        childtitle: "My Devices",
        childlink: "blog",
        auth: ["OrganisationAdmin", "OrganisationUser"],
      },
      {
        childtitle: "My Workflow Templates",
        childlink: "blank-page",
        auth: ["OrganisationAdmin", "OrganisationUser"],
      },
    ],
  },
  {
    title: "Billing Dashboard",
    icon: "map:general-contractor",
    isHide: true,
    link: "profile",
    auth: ["OrganisationAdmin", "OrganisationBillingAdmin"],
  },
  {
    title: "Devices",
    icon: "bi:device-ssd",
    isOpen: false,
    isHide: true,
    auth: ["SuperAdmin", "DeviceAdmin", "OrganisationUser"],
    child: [
      {
        childtitle: "Device Types",
        childlink: "devices/category",
        auth: ["SuperAdmin", "DeviceAdmin", "OrganisationUser"],
      },
      {
        childtitle: "Lookup",
        childlink: "devices/model",
        auth: ["SuperAdmin", "OrganisationUser"],
      },
    ],
  },
  {
    title: "Workflow",
    icon: "mdi:workflow-outline",
    isHide: true,
    auth: ["SuperAdmin"],
    link: "audit_log"
  },
  {
    title: "Catalog",
    icon: "carbon:catalog",
    isOpen: false,
    isHide: true,
    auth: ["CatalogAdmin"],
    child: [
      {
        childtitle: "Device Catalogs",
        childlink: "react-table",
        auth: ["CatalogAdmin"],
      },
    ],
  },
];

export const notifications = [
  {
    title: "Your order is placed",
    desc: "Amet minim mollit non deser unt ullamco est sit aliqua.",

    image: "/assets/images/all-img/user.png",
    link: "#",
  },
  {
    title: "Congratulations Darlene  🎉",
    desc: "Won the monthly best seller badge",
    unread: true,
    image: "/assets/images/all-img/user2.png",
    link: "#",
  },
  {
    title: "Revised Order 👋",
    desc: "Won the monthly best seller badge",

    image: "/assets/images/all-img/user3.png",
    link: "#",
  },
  {
    title: "Brooklyn Simmons",
    desc: "Added you to Top Secret Project group...",

    image: "/assets/images/all-img/user4.png",
    link: "#",
  },
];

export const message = [
  {
    title: "Wade Warren",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: true,
    notification_count: 1,
    image: "/assets/images/all-img/user1.png",
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: "/assets/images/all-img/user2.png",
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: "/assets/images/all-img/user3.png",
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: "/assets/images/all-img/user4.png",
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: "/assets/images/all-img/user2.png",
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: "/assets/images/all-img/user3.png",
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: "/assets/images/all-img/user4.png",
    link: "#",
  },
];

export const colors = {
  primary: "#4669FA",
  secondary: "#A0AEC0",
  danger: "#F1595C",
  black: "#111112",
  warning: "#FA916B",
  info: "#0CE7FA",
  light: "#425466",
  success: "#50C793",
  "gray-f7": "#F7F8FC",
  dark: "#1E293B",
  "dark-gray": "#0F172A",
  gray: "#68768A",
  gray2: "#EEF1F9",
  "dark-light": "#CBD5E1",
};

export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const topFilterLists = [
  {
    name: "Inbox",
    value: "all",
    icon: "uil:image-v",
  },
  {
    name: "Starred",
    value: "fav",
    icon: "heroicons:star",
  },
  {
    name: "Sent",
    value: "sent",
    icon: "heroicons-outline:paper-airplane",
  },

  {
    name: "Drafts",
    value: "drafts",
    icon: "heroicons-outline:pencil-alt",
  },
  {
    name: "Spam",
    value: "spam",
    icon: "heroicons:information-circle",
  },
  {
    name: "Trash",
    value: "trash",
    icon: "heroicons:trash",
  },
];

export const bottomFilterLists = [
  {
    name: "personal",
    value: "personal",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Social",
    value: "social",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Promotions",
    value: "promotions",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Business",
    value: "business",
    icon: "heroicons:chevron-double-right",
  },
];

export const meets = [
  {
    img: "/assets/images/svg/sk.svg",
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
  {
    img: "/assets/images/svg/path.svg",
    title: "Design meeting (team)",
    date: "01 Nov 2021",
    meet: "Skyp meeting",
  },
  {
    img: "/assets/images/svg/dc.svg",
    title: "Background research",
    date: "01 Nov 2021",
    meet: "Google meeting",
  },
  {
    img: "/assets/images/svg/sk.svg",
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
];

export const files = [
  {
    img: "/assets/images/icon/file-1.svg",
    title: "Dashboard.fig",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/pdf-1.svg",
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/zip-1.svg",
    title: "Job portal_app.zip",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/pdf-2.svg",
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/scr-1.svg",
    title: "Screenshot.jpg",
    date: "06 June 2021 / 155MB",
  },
];
