import { GridItem, GridImg } from './ImageGalleryItem.styled';
import { Modal } from '../modal/Modal';


export const ImageGalleryItem = ({image, toogle, showModal}) => {

    return (
        <GridItem >
            <GridImg
                onClick={toogle}
                src={image.webformatURL} alt={image.tags} />
            
             {showModal && (
                 <Modal onClose={toogle}>
                    <img src={image.largeImageURL} alt={image.tags} />
                 </Modal>
            )}
        </GridItem>
    );
}