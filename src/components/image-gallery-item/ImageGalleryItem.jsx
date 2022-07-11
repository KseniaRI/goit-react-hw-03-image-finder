import { GridItem, GridImg } from './ImageGalleryItem.styled';
import { Modal } from '../modal/Modal';


export const ImageGalleryItem = ({onShowModal, onCloseModal, showModal, selectedImgUrl, image }) => {

    return (
        <GridItem >
            <GridImg
                onClick={() => onShowModal(image.largeImageURL)}
                src={image.webformatURL} alt={image.tags} />
                
             {showModal && (
                 <Modal onClose={onCloseModal}>
                    <img src={selectedImgUrl} alt={image.tags} />
                 </Modal>
            )}
        </GridItem>
    );
}