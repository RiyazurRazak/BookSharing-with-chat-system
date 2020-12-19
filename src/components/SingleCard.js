import React from 'react'
import './SingleCard.css'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import img from "../assets/img.jpg"
import { Link } from 'react-router-dom';


function SingleCard({name , image , id, type}) {
    return (
        <>
           <Link to={`/${type}/${id}`}>
           <Card className="singlecard">
              <CardActionArea>
                  <CardMedia 
                    component="img"
                    alt={name}
                    image={image}
                    height="100px"
                  />
                  <CardContent>
                      <h3 className="singlecard__book_title">{name}</h3>
                  </CardContent>
              </CardActionArea>
           </Card> 
           </Link>
        </>
    )
}

export default SingleCard
