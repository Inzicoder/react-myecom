import React from 'react'
import './App.css';
import { Route, Switch , Redirect} from 'react-router-dom';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import  SignInandSignUp from './pages/sign-in and sign-up/sign-in and sign-up.component'
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';


import {auth,createUserProfileDocument} from './firebase/firebase.util';
import {setCurrentUser} from './redux/user/user.actions';
import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selectors';
import {createSelector, createStructuredSelector} from "reselect";


class App extends React.Component {
 
unsubscribeFromAuth=null


componentDidMount(){
  const {setCurrentUser} =this.props
  this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{

if(userAuth){
const userRef = await createUserProfileDocument(userAuth)

userRef.onSnapshot(snapShot=>{
  setCurrentUser({
      id:snapShot.id,
      ...snapShot.data()
    
  })
})

}
setCurrentUser(userAuth)

  })
}

componentWillUnmount(){
  this.unsubscribeFromAuth();
}
  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route  exact path='/' component={Homepage} />
          <Route  path='/shop' component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage}/>
          <Route exact path="/signin" render={()=>this.props.currentUser ?
           (<Redirect to="/" />) : (<SignInandSignUp />)}/>
        </Switch>
      </div>
    );
  }

}
const mapStateToProps =createStructuredSelector({
  currentUser:selectCurrentUser
})
const mapDispatchToProps =dispatch=>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
