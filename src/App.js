import React from 'react'
import {Switch , Route} from 'react-router-dom'
import ProtectedRouter from './components/ProtectedRouter'


//pages
import Home from './components/pages/home'
import Error from "./components/pages/error"
import Books from './components/pages/books'
import SingleBook from './components/pages/singleBookPage'
import Stationary from './components/pages/stationary'
import Login from './components/pages/login'
import Register from './components/pages/register'
import Chat from './components/pages/chat'
import ScrollToTop from './components/ScrollToTop'
import Dashboard from './components/pages/dashboard'
import ChatContainer from './components/ChatContainer'
import SingleStationary from './components/pages/SingleStationaryPage'





function App() {
    return (
        <div>
            <ScrollToTop />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/books" component={Books} />
                <ProtectedRouter exact  path="/book/:bookid" component={SingleBook} />
                <Route exact  path="/stationary" component={Stationary} />
                <ProtectedRouter exact  path="/stationary/:stationaryid" component={SingleStationary} />
                <Route exact  path="/login" component={Login} />
                <Route exact  path="/register" component={Register} />
                <ProtectedRouter path="/chat" component={Chat} />
                <ProtectedRouter exact path="/m.chat" component={Chat} />
                <ProtectedRouter exact path={"/m.chat/:chattouser"} component={ChatContainer} />
                <ProtectedRouter path="/dashboard" component={Dashboard} />
                <Route component={Error} />
            </Switch>
            

    
        </div>
    )
}

export default App
