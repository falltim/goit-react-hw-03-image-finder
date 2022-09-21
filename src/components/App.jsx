import React, { Component } from 'react';
import styles from './App.module.css';
import Notiflix from 'notiflix';
import imagesApi from '../servises/images-api';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { animateScroll as scroll } from 'react-scroll';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      isLoading: false,
      error: null,
      showModal: false,
      largeImageURL: '',
      total: 0,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ isLoading: true });

    imagesApi(options)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          Notiflix.Notify.info('No images found');
          return;
        }
        const newImages = hits.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        });
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          total: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(this.setState({ isLoading: false }));
    if (this.state.images.length > 0) {
      scroll.scrollToBottom();
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = searchId => {
    const image = this.state.images.find(image => image.id === searchId);
    this.setState({ largeImageURL: image.largeImageURL });
    this.toggleModal();
  };

  render() {
    const { images, isLoading, error, showModal } = this.state;
    const shouldRenderLoadMoreButton =
      images.length > 0 && !isLoading && images.length !== this.state.total;

    return (
      <div className={styles.app}>
        {error && Notiflix.Notify.failure(error)}
        <Searchbar onSubmit={this.onChangeQuery} />
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery openModal={this.openModal} images={images} />
        )}
        {shouldRenderLoadMoreButton && <Button onClick={this.loadMore} />}
        {showModal && (
          <Modal
            largeImg={this.state.largeImageURL}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
