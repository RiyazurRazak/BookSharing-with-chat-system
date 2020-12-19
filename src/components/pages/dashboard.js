import React, { useState } from 'react'
import './dashboard.css'
import { Helmet } from 'react-helmet'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

//redux
import {useSelector}from 'react-redux'


import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

//icons
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import AddBoxIcon from '@material-ui/icons/AddBox'
import PostAddIcon from '@material-ui/icons/PostAdd'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//components
import NavBar from '../NavBar';
import UploadBooks from '../UploadBooks';
import UploadStationary from '../UploadStationary';
import Settings from '../Settings';
import RequestedItems from '../RequestedItems'






function Dashboard() {

   
    const user = useSelector(state => state['userReducer'])
    const[selectedIndex , setSelectedIndex]=useState(null)

    const logoutHandller = () =>{
       localStorage.removeItem("booksharing")
       window.location.reload()
    }

      
    return (

    <div className='dashboard'>
        <Helmet>
            <title>Dashboard</title>
            <meta property="og:title" content="Dashboard - Booksharing"></meta>
        </Helmet>
        <div className="nav__container"><NavBar /></div>
        <div className="dashboard__container">
            
            <Grid container spacing={0}>
               <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <div className="dashboard__list">
                     <List>
                        <p className="dashboard__username">Howdy {user}</p>
                        <Divider className="dashboard__divider" />
                        <Link to={"/dashboard/uploadbook"} className="dashboard__link">
                        <ListItem button selected={selectedIndex === 0} onClick={() => setSelectedIndex(0)}>
                          <ListItemIcon>
                              <CreateNewFolderIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Upload Books" className="dashboard__text" />
                         </ListItem>
                        </Link>
                        <Divider className="dashboard__divider" />
                        <Link to={"/dashboard/uploadstationary"} className="dashboard__link">
                        <ListItem button selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
                          <ListItemIcon>
                             <AddBoxIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Upload Stationary" className="dashboard__text" />
                        </ListItem>
                        </Link>
                        <Divider className="dashboard__divider" />
                        <Link to={"/dashboard/requesteditems"} className="dashboard__link">
                        <ListItem button selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
                          <ListItemIcon>
                             <PostAddIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Requested Items" className="dashboard__text" />
                        </ListItem>
                        </Link>
                        <Divider className="dashboard__divider" />
                        <Link to={"/dashboard/setting"} className="dashboard__link">
                        <ListItem button selected={selectedIndex === 3} onClick={() => setSelectedIndex(3)}>
                          <ListItemIcon>
                             <SettingsIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Settings" className="dashboard__text" />
                        </ListItem>
                        </Link>
                        <Divider className="dashboard__divider" />
                        <ListItem button onClick={logoutHandller}>
                          <ListItemIcon>
                             <ExitToAppIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Logout" className="dashboard__text" />
                        </ListItem>
                     </List>
                   </div>
               </Grid>
               <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                   <div className="dasboard-inner">
                  <Switch>
                      <Route path="/dashboard/uploadbook" component={UploadBooks} />
                      <Route path="/dashboard/uploadstationary" component={UploadStationary} />
                      <Route path="/dashboard/setting" component={Settings} />
                      <Route path="/dashboard/requesteditems" component={RequestedItems} />
                  </Switch>
                  </div>
               </Grid>
            </Grid>  
        </div>
     </div>
    )
}

export default Dashboard
