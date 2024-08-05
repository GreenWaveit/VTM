import React, { useState } from "react";
import styles from "./index.module.css";

const Registration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"student" | "faculty" | "college">(
    "student"
  );
  const [formData, setFormData] = useState<any>({
    student: {
      name: "",
      email: "",
      username: "",
      password: "",
      college: "",
      class: "1 PU",
      academicYear: "",
      contactNumber1: "",
      contactNumber2: "",
    },
    faculty: {
      name: "",
      email: "",
      username: "",
      password: "",
      contactNumber: "",
      subjects: "",
      qualification: "",
      aadhar: "",
      pan: "",
      bankAccount: "",
      ifsc: "",
    },
    college: {
      name: "",
      address: "",
      city: "",
      pincode: "",
      contactPerson: "",
      contactNumber1: "",
      contactNumber2: "",
      email: "",
      username: "",
      password: "",
    },
  });
  const [errors, setErrors] = useState<any>({
    student: {},
    faculty: {},
    college: {},
  });

  const handleTabSwitch = (tab: "student" | "faculty" | "college") =>
    setActiveTab(tab);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [activeTab]: {
        ...prevData[activeTab],
        [name]: value,
      },
    }));
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [activeTab]: { ...prevErrors[activeTab], [name]: "" },
    }));
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const currentData = formData[activeTab];
    const requiredFields = {
      student: [
        "name",
        "email",
        "username",
        "password",
        "college",
        "class",
        "academicYear",
        "contactNumber1",
      ],
      faculty: [
        "name",
        "email",
        "username",
        "password",
        "contactNumber",
        "subjects",
        "qualification",
        "aadhar",
        "pan",
        "bankAccount",
        "ifsc",
      ],
      college: [
        "name",
        "address",
        "city",
        "pincode",
        "contactPerson",
        "contactNumber1",
        "email",
        "username",
        "password",
      ],
    };
    const newErrors: any = {};
    requiredFields[activeTab].forEach((field) => {
      if (
        !currentData[field] ||
        (field === "email" && !validateEmail(currentData[field]))
      ) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required${field === "email" ? " or invalid format" : ""}`;
      }
    });
    setErrors({ ...errors, [activeTab]: newErrors });
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) console.log(formData[activeTab]);
  };

  const requiredFields = {
    student: [
      "name",
      "email",
      "username",
      "password",
      "college",
      "class",
      "academicYear",
      "contactNumber1",
    ],
    faculty: [
      "name",
      "email",
      "username",
      "password",
      "contactNumber",
      "subjects",
      "qualification",
      "aadhar",
      "pan",
      "bankAccount",
      "ifsc",
    ],
    college: [
      "name",
      "address",
      "city",
      "pincode",
      "contactPerson",
      "contactNumber1",
      "email",
      "username",
      "password",
    ],
  };

  const renderField = (
    labelText: string,
    fieldName: string,
    type = "text",
    placeholder = ""
  ) => (
    <div className={styles["form-group"]}>
      <label
        className={
          requiredFields[activeTab].includes(fieldName)
            ? styles["required-label"]
            : ""
        }
        htmlFor={fieldName}
      >
        {labelText}
      </label>
      {type === "file" ? (
        <input
          type="file"
          id={fieldName}
          name={fieldName}
          onChange={handleChange}
        />
      ) : type === "select" ? (
        <select
          id={fieldName}
          name={fieldName}
          value={formData[activeTab][fieldName]}
          onChange={handleChange}
        >
          {fieldName === "class" && (
            <>
              <option value="1 PU">1 PU</option>
              <option value="2 PU">2 PU</option>
            </>
          )}
        </select>
      ) : (
        <input
          type={type}
          id={fieldName}
          name={fieldName}
          value={formData[activeTab][fieldName]}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
      {errors[activeTab][fieldName] && (
        <span className={styles.error}>{errors[activeTab][fieldName]}</span>
      )}
    </div>
  );

  return (
    <div className={styles["registration-container"]}>
      <div className={styles["tabs"]}>
        <button
          className={activeTab === "student" ? styles.active : ""}
          onClick={() => handleTabSwitch("student")}
        >
          Student
        </button>
        <button
          className={activeTab === "faculty" ? styles.active : ""}
          onClick={() => handleTabSwitch("faculty")}
        >
          Faculty
        </button>
        <button
          className={activeTab === "college" ? styles.active : ""}
          onClick={() => handleTabSwitch("college")}
        >
          College
        </button>
      </div>
      <h2 className={styles.title}>
        {activeTab === "student"
          ? "Student Registration"
          : activeTab === "faculty"
          ? "Faculty Registration"
          : "College Registration"}
      </h2>
      <form onSubmit={handleSubmit} className={styles["registration-form"]}>
        {activeTab === "student" ? (
          <>
            {renderField("Name", "name", "text", "Enter your full name")}
            {renderField("Email", "email", "email", "Enter your email")}
            {renderField("Username", "username", "text", "Enter a username")}
            {renderField(
              "Password",
              "password",
              "password",
              "Enter your password"
            )}
            {renderField(
              "College",
              "college",
              "text",
              "Enter your college name"
            )}
            {renderField("Class", "class", "select")}
            {renderField(
              "Academic Year",
              "academicYear",
              "number",
              "Enter academic year"
            )}
            {renderField(
              "Contact Number1",
              "contactNumber1",
              "text",
              "Enter primary contact number"
            )}
            {renderField(
              "Contact Number2",
              "contactNumber2",
              "text",
              "Enter secondary contact number (optional)"
            )}
          </>
        ) : activeTab === "faculty" ? (
          <>
            {renderField("Name", "name", "text", "Enter your full name")}
            {renderField("Email", "email", "email", "Enter your email")}
            {renderField("Username", "username", "text", "Enter a username")}
            {renderField(
              "Password",
              "password",
              "password",
              "Enter your password"
            )}
            {renderField(
              "Contact Number",
              "contactNumber",
              "text",
              "Enter contact number"
            )}
            {renderField(
              "Subjects",
              "subjects",
              "text",
              "Enter subjects you teach"
            )}
            {renderField(
              "Qualification",
              "qualification",
              "text",
              "Enter your qualification"
            )}
            {renderField(
              "Aadhar",
              "aadhar",
              "text",
              "Enter your Aadhar number"
            )}
            {renderField("PAN", "pan", "text", "Enter your PAN number")}
            {renderField(
              "Bank Account",
              "bankAccount",
              "text",
              "Enter your bank account number"
            )}
            {renderField("IFSC", "ifsc", "text", "Enter your IFSC code")}
          </>
        ) : (
          <>
            {renderField("Name", "name", "text", "Enter college name")}
            {renderField("Address", "address", "text", "Enter college address")}
            {renderField("City", "city", "text", "Enter city")}
            {renderField("Pincode", "pincode", "text", "Enter pincode")}
            {renderField(
              "Contact Person",
              "contactPerson",
              "text",
              "Enter contact person name"
            )}
            {renderField(
              "Contact Number1",
              "contactNumber1",
              "text",
              "Enter contact number"
            )}
            {renderField(
              "Contact Number2",
              "contactNumber2",
              "text",
              "Enter secondary contact number (optional)"
            )}
            {renderField("Email", "email", "email", "Enter college email")}
            {renderField("Username", "username", "text", "Enter username")}
            {renderField("Password", "password", "password", "Enter password")}
          </>
        )}
        <button type="submit">Submit</button>
      </form>
      <p className={styles.register}>
        By Signing Up, you agree to our <a href="/register">Terms of Use</a> &{" "}
        <a href="/register">Privacy Policy</a>
      </p>

      <p className={styles.register}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Registration;
