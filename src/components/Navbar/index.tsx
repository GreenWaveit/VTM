import styles from "./index.module.css";

const Navbar = () => {
  return (
    <div className="container">
      <div className={styles.wrap}>
        <div className={styles.logoWrap}>
          <img src="/images/Logo.jpg" className={styles.logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
