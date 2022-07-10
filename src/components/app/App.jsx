import { Component } from 'react';
import { Searchbar } from '../searchbar/Searchbar';
import { ImageGallery } from '../image-gallery/ImageGallery';
import { Container } from './App.styled';


export class App extends Component{
  state = {
    query: '',
  };

  formSubmitHandler = ({query}, { resetForm }) => {
    this.setState({
      query,
    });
     resetForm();
  }

  render() {
    return (
      <Container>
          <Searchbar onSubmit={this.formSubmitHandler} />
          <ImageGallery searchQuery={this.state.query} />
      </Container>
    )
  }
};
