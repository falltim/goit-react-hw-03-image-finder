import styles from './ImageGalleryItem.module.css';
import propTypes from 'prop-types';

const ImageGalleryItem = ({ smallImg, id, openModal }) => {
  return (
    <li className={styles.galleryItem} onClick={() => openModal(id)}>
      <img className={styles.galleryItemImg} src={smallImg} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  openModal: propTypes.func.isRequired,
  smallImg: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
};

export default ImageGalleryItem;
