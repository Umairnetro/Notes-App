import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={` ${styles.loaderBG} w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-black bg-opacity-70 z-50`}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
