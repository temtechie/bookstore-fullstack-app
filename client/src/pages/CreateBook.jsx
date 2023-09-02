import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateBook() {

  const navigateTo = useNavigate();

  const goBack = () => {
    navigateTo('/');
  };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState(null);

  const handleCreateBook = async () => {

    if (!title || !author || isNaN(publishYear) || !publishYear) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newBook = {
      title,
      author,
      publishYear
    }

    const res = await axios.post('http://localhost:5000/api/books/',
      newBook
    )
    navigateTo('/');
  }

  return (
    <div className=''>
      <h3 className='text-center text-lg font-bold pt-4'>Create a new Book</h3>
      <form className='flex flex-col items-center mt-4'>
        <div className='mb-4'>
          <label htmlFor="title" className='block text-lg'>Title</label>
          <input type="text"
            placeholder='Enter book name'
            name='title'
            className='bg-gray-200 px-4 py-2 
             rounded-md w-96'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="title" className='block text-lg'>Author</label>
          <input type="text"
            name='title'
            placeholder='Enter book name'
            className='bg-gray-200 px-4 py-2 
            rounded-md w-96'
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="publishedYear" className='block text-lg'>Publish Year</label>
          <input type="number"
            name='title'
            placeholder='Enter book name'
            className='bg-gray-200 px-4 py-2 
            rounded-md w-96'
            required
            onChange={(e) => setPublishYear(e.target.value)}
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

export default CreateBook