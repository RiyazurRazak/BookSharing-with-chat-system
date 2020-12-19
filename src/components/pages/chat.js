import React from 'react'
import './chat.css'
import { Helmet } from 'react-helmet'
import {  Route, Link, Switch, Redirect } from 'react-router-dom'
import Media from "react-media"
import parser from 'ua-parser-js'


import NavBar from '../NavBar'
import Grid from '@material-ui/core/Grid'
import ChatContactList from '../ChatContactList'
import ChatContainer from '../ChatContainer'




function chat() {


    return (
        <div className="chat">
            <Helmet>
              <title>Chat</title>
              <meta property="og:title" content="Chats - Booksharing"></meta>
            </Helmet>
            <div>
              <div className="nav__container"><NavBar /></div>

              <Grid container spacing={0} className="chat__contact__container">
                 <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                   <div  className="chat__contactlist" >
                   <ul className="chat__contactlist-list">
                     <ChatContactList />
                   </ul>
                   </div>
                 </Grid>

                 <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                  <Media  query="(min-width: 960px)">
                   {
                     matches =>
                   matches? (
                    <Switch>
                    <Route exact path={"/"}><p>Heloo</p></Route>
                    <Route  path={"/chat/:chattouser"} component={ChatContainer} />
                    <Redirect from={"/m.chat/:chattouser"} to={"/chat/:chattouser"} />  
                    <Redirect from={"/m.chat"} to={"/chat"} /> 
                  </Switch>
                   ) : <Switch>
                      <Redirect from={"/chat/:chattouser"} to={"/m.chat/:chattouser"} />  
                          <Redirect from={"/chat"} to={"/m.chat"} />
                         
                     </Switch>
                      }
                  </Media>
                 </Grid>
              </Grid>
            </div>
        </div>
    )
}

export default chat
