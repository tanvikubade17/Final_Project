import Sidebar from "../Sidebar/Sidebar.jsx";  
import Student from "../Student/Student.jsx";
import Staff from "../Staff/Staff.jsx";
import './Dashboard.css';
import { Routes,Route } from "react-router-dom";
import Enquiry from "../Enquiry/Enquiry.jsx";
import Course from "../Course/Course.jsx";
import GetInTouch from "../GetInTouch/GetInTouch.jsx"
import Closure from "../Closure/Closure.jsx";
import PaymentHistory from "../Payment/PaymentHistory.jsx";
import AddPayment from "../Payment/AddPayment.jsx";

const Dashboard = () => {

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
      <Routes >
        <Route path="/Student" element={<Student />} />
        <Route path="/Staff" element={<Staff />} />
        <Route path="/Enquiry" element={<Enquiry/>} />
        <Route path="/Course" element={<Course/>}/>
        <Route path="/Notification" element={<GetInTouch/>}/>
        <Route path="/Closure" element={<Closure/>}/>
        <Route path="/Payment" element={<PaymentHistory/>} />
        <Route path="/payment/add" element={<AddPayment />} />
      </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
