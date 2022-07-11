import { ImageGalleryItem } from '../image-gallery-item/ImageGalleryItem';
import { Grid } from './ImageGallery.styled';

export const ImageGallery = ({images, onShowModal}) => {

    return (
        <>
            <Grid>
                {images.map(image => <ImageGalleryItem onShowModal={onShowModal} image={image} key={image.id}/>)}     
            </Grid>
        </>
    );       
}
