const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        const base64Image = event.target.result;
        setModalImageSrc(base64Image); // Set the image source for the modal
        setShowImageModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

export default handleImageUpload;