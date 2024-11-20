import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={` ${styles.loaderBG} w-full h-screen flex justify-center items-center absolute bg-black opacity-90`}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
