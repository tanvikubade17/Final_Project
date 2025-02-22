import { IoIosPaper } from "react-icons/io";
import {
  FaGear,
  FaUserPen,
  FaTable,
  FaRightFromBracket,
} from "react-icons/fa6";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { FaBookReader } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { LuMessageSquareOff } from "react-icons/lu";

export const menuItemsAdmin = [
  {
    title: "Enquiries",
    icon: <BiMessageRoundedDetail />,
    path: "/enquiry", 
  },
  {
    title: "Notification",
    icon: <BiSolidDashboard />,
    path: "/notification", 
  },
  {
    title: "Staff",
    icon: <FaChalkboardTeacher />,
    path: "/staff", 
  },
  {
    title: "Student",
    icon: <FaUserGraduate />,
    path: "/student",  
  },
  {
    title: "Courses",
    icon: <FaBookReader />,
    path: "/course",  
  },
  {
    title: "Closure Reasons",
    icon: <LuMessageSquareOff />,
    path: "/closure",  
  },
  {
    title: "Payment",
    icon: <MdPayment />,
    path: "/payment",  
  },
];

export const accountItems = [
  {
    title: "Settings",
    icon: <FaGear className="w-10" />,
    path: "/settings", 
  },
  {
    title: "Logout",
    icon: <FaRightFromBracket className="w-10" />,
    path: "/logout",
  },
];
