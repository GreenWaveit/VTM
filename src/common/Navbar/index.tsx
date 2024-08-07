import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState("/");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const path = e.target.value;
    setSelectedPage(path);
    navigate(path);
  };
  return (
    <div className="container">
      <div className={styles.wrap}>
        <div className={styles.logoWrap}>
          <img src="/images/Logo.jpg" className={styles.logo} alt="logo" />
        </div>
        <select
          value={selectedPage}
          onChange={handleChange}
          style={{ padding: "10px", fontSize: "16px", width: "60%" }}
        >
          <option value="/">Select a page</option>
          <option value="/login">Login</option>
          <option value="/student-register">Student Register</option>
          <option value="/faculty-register">Faculty Register</option>
          <option value="/college-register">College Register</option>
          <option value="/manage-subjects">Manage Subjects</option>
          <option value="/manage-chapters">Manage Chapters</option>
          <option value="/manage-qualifications">Manage Qualifications</option>
          <option value="/manage-topics">Manage Topics</option>
          <option value="/map-faculty-subject">Map faculty to subject</option>
          <option value="/map-faculty-college">Map faculty to college</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
