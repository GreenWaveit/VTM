import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/index.module.css";

enum SubjectEnum {
  "Math" = "Math",
  "Science" = "Science",
  "History" = "History",
  // Add more subjects as needed
}

const QualificationEnum = {
  Bachelors: 1,
  Masters: 2,
  PhD: 3,
  // Add more qualifications as needed
};

interface FacultyFormInputs {
  name: string;
  username: string;
  email: string;
  password: string;
  contactNumber: string;
  subjects: SubjectEnum; // Single selection for subjects
  cv: File | null;
  qualification: number;
  aadhar: string;
  pan: string;
  bankAccount: string;
  ifsc: string;
}

const initialFormState: FacultyFormInputs = {
  name: "",
  username: "",
  email: "",
  password: "",
  contactNumber: "",
  subjects: SubjectEnum["Math"], // Default value
  cv: null,
  qualification: 1,
  aadhar: "",
  pan: "",
  bankAccount: "",
  ifsc: "",
};

const FacultyRegister: React.FC = () => {
  const [formData, setFormData] = useState<FacultyFormInputs>(initialFormState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FacultyFormInputs, string>>
  >({});
  const router = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement; // Type casting to HTMLInputElement

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files?.[0] || null,
      }));
    } else if (
      name === "contactNumber" ||
      name === "aadhar" ||
      name === "bankAccount"
    ) {
      // Allow only numeric input for these fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.replace(/[^0-9]/g, ""),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFocus = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof FacultyFormInputs, string>> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact Number is required";
    else if (formData.contactNumber.length !== 10)
      newErrors.contactNumber = "Contact Number must be 10 digits";
    if (!formData.subjects) newErrors.subjects = "Subject is required";
    if (!formData.cv) newErrors.cv = "CV is required";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required";
    if (!formData.aadhar) newErrors.aadhar = "Aadhar Number is required";
    else if (formData.aadhar.length !== 12)
      newErrors.aadhar = "Aadhar Number must be 12 digits";
    if (!formData.pan) newErrors.pan = "PAN Number is required";
    if (!formData.bankAccount)
      newErrors.bankAccount = "Bank Account Number is required";
    if (!formData.ifsc) newErrors.ifsc = "IFSC is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log(formData);
      router("/faculty-list"); // Redirect after successful submission
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.sectionHeader}>Faculty Registration</div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">
            Name<span style={{ color: "#e25050" }}>*</span>
          </label>
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
          <label htmlFor="username">
            Username<span style={{ color: "#e25050" }}>*</span>
          </label>
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
          <label htmlFor="email">
            Email<span style={{ color: "#e25050" }}>*</span>
          </label>
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
          <label htmlFor="password">
            Password<span style={{ color: "#e25050" }}>*</span>
          </label>
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
          <label htmlFor="contactNumber">
            Contact Number<span style={{ color: "#e25050" }}>*</span>
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your contact number"
            maxLength={10}
            pattern="\d*"
            className={errors.contactNumber ? styles.errorInput : ""}
          />
          {errors.contactNumber && (
            <p className={styles.errorText}>{errors.contactNumber}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subjects">
            Subjects<span style={{ color: "#e25050" }}>*</span>
          </label>
          <select
            id="subjects"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            onFocus={handleFocus}
            className={errors.subjects ? styles.errorInput : ""}
          >
            {Object.values(SubjectEnum).map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subjects && (
            <p className={styles.errorText}>{errors.subjects}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cv">
            CV<span style={{ color: "#e25050" }}>*</span>
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleChange}
            onFocus={handleFocus}
            className={errors.cv ? styles.errorInput : ""}
          />
          {errors.cv && <p className={styles.errorText}>{errors.cv}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="qualification">
            Qualification<span style={{ color: "#e25050" }}>*</span>
          </label>
          <select
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            onFocus={handleFocus}
            className={errors.qualification ? styles.errorInput : ""}
          >
            {Object.entries(QualificationEnum).map(([qual, id]) => (
              <option key={id} value={id}>
                {qual}
              </option>
            ))}
          </select>
          {errors.qualification && (
            <p className={styles.errorText}>{errors.qualification}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="aadhar">
            Aadhar Number<span style={{ color: "#e25050" }}>*</span>
          </label>
          <input
            type="text"
            id="aadhar"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your Aadhar Number"
            maxLength={12}
            pattern="\d*"
            className={errors.aadhar ? styles.errorInput : ""}
          />
          {errors.aadhar && <p className={styles.errorText}>{errors.aadhar}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pan">
            PAN Number<span style={{ color: "#e25050" }}>*</span>
          </label>
          <input
            type="text"
            id="pan"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your PAN Number"
            className={errors.pan ? styles.errorInput : ""}
          />
          {errors.pan && <p className={styles.errorText}>{errors.pan}</p>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bankAccount">
            Bank Account Number<span style={{ color: "#e25050" }}>*</span>
          </label>
          <input
            type="text"
            id="bankAccount"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your Bank Account Number"
            pattern="\d*"
            className={errors.bankAccount ? styles.errorInput : ""}
          />
          {errors.bankAccount && (
            <p className={styles.errorText}>{errors.bankAccount}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ifsc">
            IFSC<span style={{ color: "#e25050" }}>*</span>
          </label>
          <input
            type="text"
            id="ifsc"
            name="ifsc"
            value={formData.ifsc}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Enter your IFSC code"
            className={errors.ifsc ? styles.errorInput : ""}
          />
          {errors.ifsc && <p className={styles.errorText}>{errors.ifsc}</p>}
        </div>
      </form>
      <button
        type="button"
        onClick={handleSubmit}
        className="submitButton"
        style={{ marginTop: 20 }}
      >
        Submit
      </button>
    </div>
  );
};

export default FacultyRegister;
