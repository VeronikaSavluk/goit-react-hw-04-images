import { useState, useEffect } from 'react';
import { ImSad } from "react-icons/im";
import SearchBar from './searchbar';
import Loader from './loader';
import ImageGallery from './imagegallery';
import Button from "./button";
import { Section, Gallery } from './App.styled';
import getImages from './api';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    };

    setLoading(true);
    setDisabled(false);

    async function fetchAPI() {
      try {
        const newImages = await getImages(query, currentPage);
        if (newImages.length < 12) {
          setDisabled(true);
        };
        return setImages(prevImages => [...prevImages, ...newImages]);
      } catch (error) {
        setError('Faild to load images and photos');
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
}, [query, currentPage]);

  const handleSearchForm = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setCurrentPage(1);
  };

  return (
  <Section>
    <SearchBar onSubmit={handleSearchForm} />
      <Gallery>
        {error && <div><ImSad color="IndianRed" font-size="25px" /> <span>{error}</span></div>}
        <ImageGallery images={images} />
        {loading && <Loader />}
        {images.length > 0 && !loading && !disabled && <Button onClick={() => setCurrentPage(currentPage + 1)} />}
    </Gallery>
  </Section>
  );
};

export default App;