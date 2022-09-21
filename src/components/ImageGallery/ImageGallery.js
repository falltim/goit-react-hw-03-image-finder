import styles from './ImageGallery.module.css';
import propTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          openModal={openModal}
          id={id}
          smallImg={webformatURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  openModal: propTypes.func.isRequired,
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
