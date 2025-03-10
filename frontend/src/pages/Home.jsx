import React from 'react'
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get('http://localhost:5000/books')
      .then((res) => {
        console.log(books);
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
         console.log(error);
         setLoading(false);
      });
  }, []);
  

  return (
    <>
    {books.length > 0 && <div>{books[0].title}</div>}
    <div>okay2</div>
    </>
  )
}

export default Home