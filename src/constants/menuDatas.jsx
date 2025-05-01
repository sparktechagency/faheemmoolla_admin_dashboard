import {
  dashboard,
  earning,
  meal,
  notification,
  order,
  password,
  payouts,
  privacy,
  profile,
  setting,
  shop,
} from "../assets/assets";

export const menuDatas = [
  {
    icon: dashboard,
    title: "Dashboard",
    link: "/",
  },
  {
    icon: order,
    title: "User management",
    link: "/user-management",
  },
  {
    icon: shop,
    title: "Business management",
    link: "/business-management",
  },
  {
    icon: earning,
    title: "Total earning",
    link: "/earning",
  },
  {
    icon: payouts,
    title: "Payouts",
    link: "/payouts",
  },
  {
    icon: meal,
    title: "Add Category",
    link: "/add-category",
  },

  {
    icon: setting,
    title: "Settings",
    link: "/settings",
    subLinks: [
      { subicon: password, title: "Change Password", link: "/settings" },
      { subicon: profile, title: "Profile", link: "/settings/profile" },
      {
        subicon: notification,
        title: "Notification",
        link: "/settings/notification",
      },
      {
        subicon: privacy,
        title: "Privacy and Policy",
        link: "/settings/privacy-policy",
      },
      {
        subicon: privacy,
        title: "Terms and Conditions",
        link: "/settings/terms-conditions",
      },
    ],
  },
];
