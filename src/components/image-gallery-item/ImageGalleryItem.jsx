import { GridItem, GridImg } from './ImageGalleryItem.styled';
// import { Modal } from '../modal/Modal';
import PropTypes from 'prop-types'; 


export const ImageGalleryItem = ({
    onShowModal,
    image }) => {

    return (
        <GridItem >
            <GridImg
                onClick={() => onShowModal(image.largeImageURL)}
                src={image.webformatURL} alt={image.tags} />
        </GridItem>
    );
}

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
    })
}