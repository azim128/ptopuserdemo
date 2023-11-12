import styles from "@/components/loading/loading.module.css"

const LoadingComponent = () => {
  return (
    <>
    <div className={`px-5 d-flex justify-content-center align-items-center flex-cloumn w-100 ${styles.mainContainer}`}>
          <div className="w-100 px-5" >
            <div className={styles.skeleton}>
              <div className={styles.skeletonLeft}>
                <div className={`${styles.line} w-100`}></div>
                <div className={`${styles.line} w-100`}></div>
                <div className={`${styles.line} w-100`}></div>
                <div className={`${styles.line} w-100`}></div>
              </div>
              <div className={styles.skeletonRight}>
                <div className={styles.square}></div>
              </div>
            </div>
            <div className={styles.skeleton}>
              <div className={styles.skeletonLeft}>
                <div className={`${styles.line} w-100`}></div>
                <div className={`${styles.line} w-100`}></div>
                <div className={`${styles.line} w-100`}></div>
                <div className={`${styles.line} w-100`}></div>
              </div>
              <div className={styles.skeletonRight}>
                <div className={styles.square}></div>
              </div>
            </div>
            <div className={styles.skeleton}>
              <div className={styles.skeletonLeft}>
                <div className={`${styles.line} w-100`}></div>
                <div className={`${styles.line} w-100`}></div>
                <div className={`${styles.line} w-100`}></div>
                <div className={`${styles.line} w-100`}></div>
              </div>
              <div className={styles.skeletonRight}>
                <div className={styles.square}></div>
              </div>
            </div>
          </div>
  
  
         
        </div>
    
    </>
  )
}

export default LoadingComponent