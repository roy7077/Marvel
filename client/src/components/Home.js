import React, { useEffect, useState } from 'react'
import '../style/home.css'
import marvel_img from '../assist/marvel_img2.jpg'
import MarvelCard from './MarvelCard';
import { Link } from 'react-router-dom';

const Home = () => {

  const [data,setData]=useState(null);

  const getData= async ()=>{
    const result=await fetch('https://gateway.marvel.com/v1/public/characters?nameStartsWith=h&ts=1&apikey=ee1472ffedd74244705223a41d1f736f&hash=0b7ff9639e8370dc789d902143738a9b');
    const json=await result.json();
    console.log(json?.data?.results);
    setData(json?.data?.results);
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className='home'>
        <div className='home-1'>
              <img
                src={marvel_img}
                alt="avengers-background-img"
                >
            </img>
        </div>
        <div className='marvels-hero'>
        {
          data ? (
            data.map((item)=>(
              <MarvelCard item={item}/>
            ))
          ) :
          <h1>loading......!</h1>
        }
        </div>
    </div>
  )
}

export default Home