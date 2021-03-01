import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.util'
import Logo from '../../assets/logo.component';
import {connect} from 'react-redux';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createStructuredSelector} from 'reselect'

import './header.styles.scss'

const Header = ({currentUser,hidden})=>(
    <div className="header" >
        <Link className="logo-container" to="/">
          <Logo />
        </Link>
        <div className="options">
   <Link className="option" to="/shop" >SHOP</Link>
   <Link className="option" to="/shop"> CONTACT</Link>
   {
     currentUser?
     <div className="option" onClick={()=>auth.signOut()}> Sign Out </div>
     :
     <Link className="option" to="/signIn">SIGN IN </Link>
   }
   
        <CartIcon />
        </div>
        {
          hidden ?null : <CartDropdown />  }    
    </div>
)

const mapStateToProps=createStructuredSelector({
 currentUser:selectCurrentUser,
 hidden:selectCartHidden
})

export default connect(mapStateToProps)(Header)