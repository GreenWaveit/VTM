import React, { useState } from "react";
import styles from "../../styles/index.module.css";

interface CollegeFormInputs {
  name: string;
  address: string;
  city: string;
  pincode: number;
  contactPerson: string;
  contactNumber1: number;
  contactNumber2?: number;
  email: string;
  username: string;
  password: string;
}

const initialFormState: CollegeFormInputs = {
  name: "",
  address: "",
  city: "",
  pincode: 0,
  contactPerson: "",
  contactNumber1: 0,
  contactNumber2: 0,
  email: "",
  username: "",
  password: "",
};

const CollegeRegister: React.FC = () => {
  const [formData, setFormData] = useState<CollegeFormInputs>(initialFormState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CollegeFormInputs, string>>
  >({});

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "pincode" || name.includes("contactNumber")
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof CollegeFormInputs, string>> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.contactPerson)
      newErrors.contactPerson = "Contact Person is required";
    if (!formData.contactNumber1)
      newErrors.contactNumber1 = "Contact Number1 is required";
    if (formData.email && !validateEmail(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log(formData);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.sectionHeader}>College Registration</div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter the college name"
            className={errors.name ? styles.errorInput : ""}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter the college address"
            className={errors.address ? styles.errorInput : ""}
          />
          {errors.address && (
            <p className={styles.errorText}>{errors.address}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter the city"
            className={errors.city ? styles.errorInput : ""}
          />
          {errors.city && <p className={styles.errorText}>{errors.city}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="number"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter the pincode"
            className={errors.pincode ? styles.errorInput : ""}
          />
          {errors.pincode && (
            <p className={styles.errorText}>{errors.pincode}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contactPerson">Contact Person:</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Enter the contact person's name"
            className={errors.contactPerson ? styles.errorInput : ""}
          />
          {errors.contactPerson && (
            <p className={styles.errorText}>{errors.contactPerson}</p>
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
            placeholder="Enter the contact number"
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
            placeholder="Enter an additional contact number (optional)"
            className={errors.contactNumber2 ? styles.errorInput : ""}
          />
          {errors.contactNumber2 && (
            <p className={styles.errorText}>{errors.contactNumber2}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter the college email"
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
            placeholder="Enter the username"
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
            placeholder="Enter the password"
            className={errors.password ? styles.errorInput : ""}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
        </div>
        <div className={styles.formGroup} />
        <div className={styles.formGroup} />
      </form>
      <p className="termsText">
        By signing up, you agree to our <a href="/terms">Terms of Use</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <button type="button" onClick={handleSubmit} className="submitButton">
        Submit
      </button>
    </div>
  );
};

export default CollegeRegister;
