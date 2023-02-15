import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';



export function App () {

 const [query, setQuery] = useState('');
 const [status, setStatus] = useState('idle');
 const [page, setPage] = useState(1);
 const [images, setImages] = useState([]);
 const [modalImg, setModalImg] = useState('');



   useEffect(() => {
    if(query === ''){
      setStatus('idle');
      return;
    }

  const fetchData = async () => {
    try {
      setStatus ('loading');
      const res = await fetchImages (query, page)
      if(res.total === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      }
      setImages(prevState => [...prevState, ...res.hits])
      setStatus('finished')
    }
    catch(error) {
      toast.error('Oops! Something went wrong! Please try again.')
      setStatus('idle')
    }
  }
  fetchData();

   }, [page, query])

  
   const handleSubmit = search => {
    setQuery(search)
    setPage(1)
    setImages([])
   }

   const loadMore = () =>{
    setPage(prevState => prevState + 1)
   }

   const toggleModal = (image) => {
    setModalImg(image)
   }
  

    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} onClick={toggleModal} />
        {status === 'loading' && <Loader />}
        {status === 'finished' && <Button loadMore={loadMore} />}
        {modalImg && <Modal image={modalImg} onClose={toggleModal} />}
        <ToastContainer />
      </div>
    );
  }



