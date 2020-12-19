import React from 'react'
import "./SingleProductLg.css"


//ui

import Grid from '@material-ui/core/Grid'
import { motion } from "framer-motion";


function SingleProductLg(props) {


    return (
        <div className="singleproduct__container">
             <Grid container spacing={2}>
                <Grid item xs={12} s={12} md={12} lg={4} xl={4}>
                    <div className="singleproduct__details">
                      <h3 className="singleproduct__product-name">{props.name}</h3>
                      <p className="singleproduct__product-desc">{props.desc}</p>
                    </div>
                    
                </Grid>
                <Grid item xs={12} s={12} md={12} lg={4} xl={4}>
                    <div className="singleproduct__product__image">
                         <img className="singleproduct_img" src={props.image}></img>
                    </div>
                </Grid>
                <Grid item xs={12} s={12} md={12} lg={4} xl={4}>
                    <div className="singleproduct__details">
                      <h5 className="singleproduct__uploaded__name">Uploaded By : {props.by}</h5>
                      <p>Uploaded At: {props.at}</p>
                      <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                         <button onClick={()=> props.asked(props.id)} className={`singleproduct__ask_btn ${props.isasked && "ask-btn-disable"}`}>{props.isasked ? "Already Asked By Other" : "Ask Him To Get"}</button>
                      </motion.div>

                    </div>
                   
                </Grid>
                </Grid>
        </div>
    )
}

export default SingleProductLg
