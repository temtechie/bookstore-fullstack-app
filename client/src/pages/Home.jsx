import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Home() {

  const [bookList, setbookList] = useState([])


    async function fetchAllBooks(){
        const res = await axios.get('http://localhost:5000/api/books/');
        setbookList(res.data);
    }

    useEffect(() => {
        fetchAllBooks()
    }, []);


  return (
    <div>Home</div>
  )
}
