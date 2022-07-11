import { Component } from 'react';
import { PixabayApiService } from '../../services/pixabay-api';
import { Searchbar } from '../searchbar/Searchbar';
import { ImageGallery } from '../image-gallery/ImageGallery';
import { Container } from './App.styled';
import { Message } from '../message/Message';
import { Loader } from '../loader/Loader';
import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';

const pixabayApiService = new PixabayApiService(); 

export class App extends Component{
  state = {
    query: '',
    error: '',
    images: [],
    status: 'idle',
    selectedImgUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevState.query;
        const newQuery = this.state.query;
        
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

    onShowModal = (lageImageUrl) => {
       this.setState({
           selectedImgUrl: lageImageUrl,
        });
    }

    onCloseModal = () => {
        this.setState({
            selectedImgUrl: '',
        })
    }
    handleSelectedImg(url) {
        
        this.setState({ selectedImgUrl: url });
    }

  formSubmitHandler = ({query}, { resetForm }) => {
    this.setState({
      query,
    });
     resetForm();
  }

  render() {
    const { images, error, status, selectedImgUrl } = this.state; 
    
    return (
      <Container>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {status === 'idle' && <Message text="Enter something..." />}
        {status === 'rejected' && <Message text={error} />}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <>
                                    <ImageGallery images={images} onShowModal={this.onShowModal} searchQuery={this.state.query} />
                                    <Button onClick={this.onLoadMore} />
                                  </>
        }
        {selectedImgUrl && (
                 <Modal onClose={this.onCloseModal}>
                    <img src={selectedImgUrl} alt="" />
                 </Modal>
            )}
      </Container>
    )
  }
};

