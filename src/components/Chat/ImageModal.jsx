import styles from "./chat.module.css";

const ImageModal = ({ show, onHide, imageSrc }) => {
  return (
    
    <div className={styles.imagepre}>
    {show &&<div className="position-relative">
      <button onClick={onHide} className="btn btn-success position-absolute top-0 end-0">X</button>
      <div className={styles.imagesize}>
      <img src={imageSrc} alt="Selected" className="img-fluid"/></div> 
      </div>}

    </div>
  );
};

export default ImageModal;
