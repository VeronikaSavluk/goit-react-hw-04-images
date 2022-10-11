import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../modal';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ url, tag, largeImageURL }) => {
  const [largeImage, setLargeImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLargeImage = () => {
    setLargeImage(() => largeImageURL);
    setShowModal(!showModal);
  };

  return (
    <Item>
      <Image src={url} alt={tag} onClick={handleLargeImage} />
      {showModal && (<Modal onClose={() => setShowModal(!showModal)}>
        <img src={largeImage} alt="" />
      </Modal>)}
    </Item>
  )
}

ImageGalleryItem.propTypes = {
  tag: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string,
}

export default ImageGalleryItem;