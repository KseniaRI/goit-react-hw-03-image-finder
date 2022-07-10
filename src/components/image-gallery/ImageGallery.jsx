import { Component } from 'react';
import { ImageGalleryItem } from '../image-gallery-item/ImageGalleryItem';
import { PixabayApiService } from '../../services/pixabay-api';
import { Grid } from './ImageGallery.styled';
import { Button } from '../button/Button';
import { Message } from '../message/Message';
import { Loader } from '../loader/Loader';
import { Modal } from '../modal/Modal';

const pixabayApiService = new PixabayApiService();

export class ImageGallery extends Component{

    state = {
        images: [],
        error: '',
        status: 'idle',
        showModal: false,
    }

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const newQuery = this.props.searchQuery;
        
        if (prevQuery !== newQuery) {

            this.setState({ status: 'pending' });

            pixabayApiService.query = newQuery;
            pixabayApiService.resetPage();

            pixabayApiService.fetchImages().then(responce => {
                if (responce.hits.length > 0) {
                    this.setState({ images: responce.hits, status: 'resolved' })
                } else {
                    this.setState({ error: `There are no images with key word ${newQuery}`, status: 'rejected'})
                }
            }).catch(error => this.setState({ error: error.message, status: 'rejected' }));
        }
    }

    onLoadMore = () => {
        pixabayApiService.fetchImages().then(responce => {
            this.setState(prevState => ({ images: [...prevState.images, ...responce.hits] }))
        }).catch(error => this.setState({ error: error.message, status: 'rejected' }));
    }

    toggleModal = () => {
        
        this.setState(({showModal}) => ({
          showModal: !showModal,
        }));
      
    }

    render() {
        const { images, error, status, showModal } = this.state; 
        if (status === 'idle') {
            return <Message text="Enter something..." />;
        }
        if (status === 'rejected') {
            return <Message text={error} />;
        }
        if (status === 'pending') {
            return <Loader />;
        }
        if (status === 'resolved') {
            return (
                <>
                    <Grid>
                        {images.map(image => { 
                            return (   
                                
                                    <ImageGalleryItem
                                        toogle={this.toggleModal}
                                        showModal={showModal}
                                        image={image}
                                        key={image.id}
                                    />   
                                    // {showModal && (
                                    //          <Modal onClose={this.toggleModal}>
                                    //              <img src={image.largeImageURL} alt={image.tags} />
                                    //          </Modal>
                                    //  )
                                    //  }
                                     
                                
                            )
                        })}  
                        
                    </Grid>
                    <Button onClick={this.onLoadMore} />
                </>
            );       
        }
    }
} 