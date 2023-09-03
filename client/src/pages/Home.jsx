import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal';
import Loader from '../components/Loader';


export default function Home() {

  const [bookList, setbookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState('');


  async function fetchAllBooks() {
    setLoading(true);
    const res = await axios.get('http://localhost:5000/api/books/');
    setbookList(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchAllBooks()
  }, []);


  const handleDelete = async (bookId) => {
    const res = await axios.delete(`http://localhost:5000/api/books/${bookId}`);

    if (res) {
      fetchAllBooks()
    }
  }

  function openModal(bookId) {
    setIsOpen(true);
    setDeleteBookId(bookId);
  }
  function closeModal() {
    setIsOpen(false)
  }

  if (loading) return <Loader />

  return (
    <>
      <Header />
      <div className='mt-4 px-20 text-center w-full '>
        <div className='flex justify-end'>
          <Link to={'/books/create'}>
            <div className='
            flex
           justify-between
           text-white
           items-center
            bg-blue-500 
            p-2
            rounded-md
            hover:bg-blue-600
            '>
              <MdAdd />
              <button className=''>Add Book</button>
            </div>
          </Link>
        </div>
        <div className='w-full flex justify-center'>
          <table className='mt-4 w-full text-left text-gray-500'>
            <thead className='bg-gray-50'>
              <tr className='border border-gray-300'>
                <th className='text-lg font-bold p-2'>S/No.</th>
                <th className='text-lg font-bold'>Title</th>
                <th className='text-lg font-bold'>Author</th>
                <th className='text-lg font-bold'>Year</th>
                <th className='text-lg font-bold'>Action</th>
              </tr>
            </thead>
            <tbody className=''>
              {bookList?.map((book, idx) => (
                <tr key={book._id} className='px-6 py-4 border border-gray-300'>
                  <td className='text-lg p-2'>{idx + 1}</td>
                  <td className='text-lg'>{book.title}</td>
                  <td className='text-lg '>{book.author}</td>
                  <td className='text-lg'>{book.publishYear}</td>
                  <td className='text-lg'>
                    <div className='flex text-xl'>
                      <Link className='text-blue-500' to={`/books/edit/${book._id}`}>
                        <BiEdit className='text-lg' />
                      </Link>
                      <Link className='text-red-500 ml-4'
                        onClick={() => openModal(book._id)}
                      >
                        <MdDeleteForever className='text-lg' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DeleteModal setIsOpen={setIsOpen} isOpen={isOpen} deleteBookId={deleteBookId} onClose={closeModal} onDelete={handleDelete} />
      </div>
    </>
  )
}
