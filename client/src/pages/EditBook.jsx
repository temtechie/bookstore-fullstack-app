import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Routes, Route, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

function EditBook() {

  const navigateTo = useNavigate();
  let { id: bookId } = useParams();

  console.log(bookId);

  const goBack = () => {
    navigateTo('/');
  };

  const [singleBook, setSingleBook] = useState({});
  const [loading, setLoading] = useState(false);
  

  const fetchSingleBook = async(bookId) => {
    setLoading(true)
    const res = await axios.get(`http://localhost:5000/api/books/${bookId}`);
    setSingleBook(res.data.book);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleBook(bookId);
    return () => {
    }
  }, [bookId]);

  function updateBookData (e, name){
    setSingleBook({...singleBook,  [name]: e.target.value});
  }


  
  const handleCreateBook = async () => {

    if (!singleBook?.title || !singleBook?.author || !singleBook?.publishYear) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const updateBook = {
      title: singleBook?.title,
      author: singleBook?.author,
      publishYear: singleBook?.publishYear
    }

    console.log("updateBook", updateBook);
    

    const res = await axios.put(`http://localhost:5000/api/books/${bookId}`,
    updateBook
    )
    navigateTo('/');
  }

  if (loading) return <Loader />

  return (
    <div className=''>
      <h3 className='text-center text-lg font-bold pt-4'>Update Book</h3>
      <form className='flex flex-col items-center mt-4'>
        <div className='mb-4'>
          <label htmlFor="title" className='block text-lg'>Title</label>
          <input type="text"
            placeholder='Enter book name'
            name='title'
            className='bg-gray-200 px-4 py-2 
             rounded-md w-96'
             value={singleBook?.title || ''}
            onChange={(e) => updateBookData(e, 'title')}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="title" className='block text-lg'>Author</label>
          <input type="text"
            name='author'
            placeholder='Enter book name'
            className='bg-gray-200 px-4 py-2 
            rounded-md w-96'
            value={singleBook?.author || ''}
            onChange={(e) => updateBookData(e, 'author')}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="publishYear" className='block text-lg'>Publish Year</label>
          <input type="number"
            name='publishYear'
            placeholder='Enter book name'
            className='bg-gray-200 px-4 py-2 
            rounded-md w-96'
            value={singleBook?.publishYear || 0}
            onChange={(e) => updateBookData(e, 'publishYear')}
          />
        </div>
        <div>
          <button className='
          py-2
          px-6
          mt-2
          bg-red-500
          hover:bg-red-600
          rounded-md
          text-white
          '
            type='button'
            onClick={goBack}
          >Cancel</button>
          {"  "}
          <button className='
          py-2
          px-6
          mt-2
          bg-blue-500
          hover:bg-blue-600
          rounded-md
          text-white
          '
            type='button'
            onClick={handleCreateBook}
          >Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EditBook;