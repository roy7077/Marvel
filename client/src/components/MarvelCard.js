import React from 'react';
import '../style/marvelcard.css'; 
import { useNavigate } from 'react-router-dom';

const MarvelCard = ({ item }) => {
  const { name, thumbnail ,description} = item;
  const imagePath = `${thumbnail.path}.${thumbnail.extension}`;

  const navigate = useNavigate();
  const clickHandler=()=>{
    navigate('/marveldetailpage', { state: { productData: item } });
  }
  return (
    <div className="card-container">
      <div className="card-image">
        <img src={imagePath} alt="Product" className="product-image" />
      </div>
      <div className="card-text">
        <div className="category">
          <span className="category-span">Ethnic</span>
        </div>
        <div className="title-product">
          <h3 className="title">{name}</h3>
        </div>
        <div className="description-prod">
          <p>{description}</p>
        </div>
        <div className="card-footer">
          <div className="wcf-left"><span className="price">Rp 500.000</span></div>
          <div className="wcf-right">
            <a 
            className="buy-btn"
            onClick={()=>{
              clickHandler();
            }}
            >
            <i className="zmdi zmdi-shopping-basket"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarvelCard;
