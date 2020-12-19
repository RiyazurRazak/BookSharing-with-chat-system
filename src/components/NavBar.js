import React, { useState } from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom'


//ui
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';


//icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ContactsIcon from '@material-ui/icons/Contacts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';





const Navbar =() =>{
  
    const[open , setOpen]=useState(false)
    const [Listopen, setListOpen]=useState(false)
    const drawerList =[{text: "Home", slug: "/", ico: HomeRoundedIcon},{text: "Books", slug: "/books", ico: ImportContactsIcon},
    {text: "Stationary", slug:"/stationary" ,ico: AllInboxIcon},{text: "Chat", slug: "/chat" , ico: ContactsIcon}, ] 

    return(
    <>
          <div className="uk-position-relative navbar">
            <div className="uk-position-top">
              <nav className="uk-navbar-container uk-navbar-transparent" data-uk-navbar>
                <div className="uk-navbar-right nav__menu">
                   <ul className="uk-navbar-nav">
                     <li><Link to={"/"} >Home</Link></li>
                     <li><Link to={"/books"} >Books</Link></li>
                     <li><Link to={"/stationary"} >stationary</Link></li>
                     <li><Link to={"/chat"} >Chat</Link></li>
                   
                     <li>
                        <Link to={"/dashboard"} >Dashboard</Link>
                        <div className="uk-navbar-dropdown nav__menu-dropdown">
                            <ul className="uk-nav uk-navbar-dropdown-nav">
                                <li><Link to={"/register"}>Register</Link></li>
                            </ul>
                        </div>
                     </li>
                     </ul>
                 </div>
              </nav>
            </div>
         </div>

           <div className="uk-position-relative">
            <div className="uk-position-top">
              <nav className="uk-navbar-container uk-navbar-transparent" data-uk-navbar>
                <div className="uk-navbar-left nav__menu nav__menu_icon" onClick={() => setOpen(true)}>
                   <MenuRoundedIcon color={"inherit"} fontSize={"inherit"}/>
                </div>
              </nav>
            </div>
           </div>

        <Drawer
           anchor={'left'}
           open={open}
           onClose={() =>setOpen(false)} 
        >
              <div className="nav__drawer">
                  {drawerList.map((list , index) =>{
                      return (
                    <List key={index}>
                      <Link to={list.slug} className="link">
                        <ListItem button>
                            <ListItemIcon>
                                <list.ico className="nav__drawer_icon"/>
                            </ListItemIcon>
                            <ListItemText className="nav__drawer_text"
                               primary={list.text}
                            />
                        </ListItem>
                        </Link>
                         <hr></hr>
                    </List>
                      )})}
                    <List>
                      <ListItem button onClick={() => setListOpen(!Listopen)}>
                          <ListItemIcon>
                              <AccountCircleIcon className="nav__drawer_icon" />
                          </ListItemIcon>
                        <ListItemText primary="User" />
                        {Listopen ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                    <Collapse in={Listopen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                      <Link to={"/dashboard"} className="link" >
                        <ListItem button className="nav-inner-list" >
                         <ListItemIcon>
                         <DashboardIcon className="nav__drawer_icon"/>
                        </ListItemIcon>
                         <ListItemText primary="Dashboard"  />
                         </ListItem>
                         </Link>
                        </List>
                        <List component="div" disablePadding>
                        <Link to={"/register"} className="link" >
                        <ListItem button className="nav-inner-list" >
                         <ListItemIcon>
                         <PersonAddIcon className="nav__drawer_icon"/>
                        </ListItemIcon>
                         <ListItemText primary="Register"  />
                         </ListItem>
                         </Link>
                        </List>
                    </Collapse>
                    </List>
                    <hr></hr>
                    </div>
        </Drawer>
        
           

 
    </>)}

export default Navbar;