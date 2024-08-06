import React, { useState } from "react";
import styles from "../../styles/index.module.css";

enum ClassEnum {
  "1 PU" = "1 PU",
  "2 PU" = "2 PU",
}

interface StudentFormInputs {
  name: string;
  email?: string;
  username: string;
  password: string;
  college: string;
  class: ClassEnum;
  academicYear: number;
  contactNumber1: number;
  contactNumber2?: number;
}

const initialFormState: StudentFormInputs = {
  name: "",
  email: "",
  username: "",
  password: "",
  college: "",
  class: ClassEnum["1 PU"],
  academicYear: 2024,
  contactNumber1: 0,
  contactNumber2: 0,
};

const StudentRegister: React.FC = () => {
  const [formData, setFormData] = useState<StudentFormInputs>(initialFormState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof StudentFormInputs, string>>
  >({});

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email ? regex.test(email) : false;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "academicYear" || name.includes("contactNumber")
          ? Number(value)
          : value,
    });
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof StudentFormInputs, string>> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.college) newErrors.college = "College is required";
    if (!formData.class) newErrors.class = "Class is required";
    if (!formData.academicYear)
      newErrors.academicYear = "Academic Year is required";
    if (!formData.contactNumber1)
      newErrors.contactNumber1 = "Contact Number1 is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log(formData);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.sectionHeader}>Student Register</div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your name"
            className={errors.name ? styles.errorInput : ""}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your email"
            className={errors.email ? styles.errorInput : ""}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your username"
            className={errors.username ? styles.errorInput : ""}
          />
          {errors.username && (
            <p className={styles.errorText}>{errors.username}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your password"
            className={errors.password ? styles.errorInput : ""}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="college">College:</label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your college"
            className={errors.college ? styles.errorInput : ""}
          />
          {errors.college && (
            <p className={styles.errorText}>{errors.college}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="class">Class:</label>
          <select
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            onFocus={handleFocus}
            className={errors.class ? styles.errorInput : ""}
          >
            <option value={ClassEnum["1 PU"]}>1 PU</option>
            <option value={ClassEnum["2 PU"]}>2 PU</option>
          </select>
          {errors.class && <p className={styles.errorText}>{errors.class}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="academicYear">Academic Year:</label>
          <input
            type="number"
            id="academicYear"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter academic year"
            className={errors.academicYear ? styles.errorInput : ""}
          />
          {errors.academicYear && (
            <p className={styles.errorText}>{errors.academicYear}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contactNumber1">Contact Number1:</label>
          <input
            type="number"
            id="contactNumber1"
            name="contactNumber1"
            value={formData.contactNumber1}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter contact number"
            className={errors.contactNumber1 ? styles.errorInput : ""}
          />
          {errors.contactNumber1 && (
            <p className={styles.errorText}>{errors.contactNumber1}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contactNumber2">Contact Number2:</label>
          <input
            type="number"
            id="contactNumber2"
            name="contactNumber2"
            value={formData.contactNumber2}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter additional contact number (optional)"
            className={errors.contactNumber2 ? styles.errorInput : ""}
          />
          {errors.contactNumber2 && (
            <p className={styles.errorText}>{errors.contactNumber2}</p>
          )}
        </div>
      </form>
      <div className="termsText">
        By Signing Up, you agree to our <a href="#">Terms of Use</a> &amp;{" "}
        <a href="#">Privacy Policy</a>
      </div>
      <button type="button" onClick={handleSubmit} className="submitButton">
        Submit
      </button>
    </div>
  );
};

export default StudentRegister;
