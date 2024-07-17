import React, { useState, useEffect } from 'react';
import MarvelCard from './MarvelCard'; 
import { useNavigate, Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toggle } from '../utils/CartSlice';
import '../style/navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [searchText, setSearchText] = useState("abc");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      if (searchText === 'abc') return;

      const response = await fetch(`https://gateway.marvel.com/v1/public/characters?name=${searchText}&ts=1&apikey=ee1472ffedd74244705223a41d1f736f&hash=0b7ff9639e8370dc789d902143738a9b`);
      const json = await response.json();
      setData(json?.data?.results[0]);
      
      // Log the data to check if it's fetched correctly
      console.log(json?.data?.results[0]);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (searchText !== 'abc') {
      fetchData();
    }
  }, [searchText]);

  useEffect(() => {
    if (data) {
      navigate('/marveldetailpage', { state: { productData: data } });
    }
  }, [data, navigate]);

  const flag = useSelector(Store=>Store.cart.flag);
  const dispatch = useDispatch();
  //console.log(flag);

  return (
    <div className='nav-bar'>
      <div className='nav-bar-1'>
        <Link to="/">
          <img
            src="https://1000logos.net/wp-content/uploads/2019/05/Avengers-Logo-2012.jpg"
            alt="marvel-logo"
          />
        </Link>
      </div>

      <div className='nav-bar-2'>
        <input
          placeholder='Search...'
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              setSearchText(text);
            }
          }}
        />
      </div>
      {
        flag ? (
          <div className='nav-bar-3'>
            <Link to="/signup"><button>Sign Up</button></Link>
            <Link to="/login"><button>Login</button></Link>
         </div>
        ) :
        (
          <div className='nav-bar-3'>
            <button
              onClick={()=>{
                dispatch(toggle())
              }}
             >Logout</button>
         </div>
        )
      }
    </div>
  );
};

export default NavBar;
