import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';



export function App () {

 const [query, setQuery] = useState('');
 const [page, setPage] = useState(1);
 const [images, setImages] = useState([]);
 const [modalImg, setModalImg] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState('');
 const [total, setTotal] = useState(0);
 const [showModal, setShowModal] = useState(false);



   useEffect(() => {
    if(!query ){
      return;
    }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await fetchImages (query, page)
      if(res.total === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      }
      setImages(prevState => [...prevState, ...res.hits])
      setTotal(res.totalHits)
    }
    catch(error) {
      setError(error)
      
    }
    finally{
      setIsLoading(false)
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

   const openModal = (image) => {
    setShowModal(true)
    setModalImg(image)
   }
    
   const closeModal = () => {
    setShowModal(false)
    setModalImg(null)
   }
    const totalPage = images.length / total
    return (
      <div>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} onClick={openModal}/>
        {isLoading  && <Loader />}
        {error && toast.error('Oops! Something went wrong! Please try again.')}
        {totalPage < 1 &&!isLoading && <Button loadMore={loadMore} />}
        {showModal && <Modal image={modalImg} onClose={closeModal} />}
        <ToastContainer/>
      </div>
    );
  }


