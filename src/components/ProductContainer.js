import React from 'react'
import "./ProductContainer.css"
import {Link} from 'react-router-dom'


function ProductContainer(props) {
    return (
        <div>
            
            <Link to={`/${props.type}/${props.id}`}>
               <div className="product-container">
                    <div className="product-container__inner">
                       <img className="product__image" src={props.image} alt="books"></img>
                       <h3 className="product-container__name">{props.title}</h3>
                    </div>
                </div>
            </Link>
         
          
         
            
        </div>
    )
}

export default ProductContainer
