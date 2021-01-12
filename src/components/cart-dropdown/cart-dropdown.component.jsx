import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss';
import { connect } from "react-redux";
import CartItem from '../cart-item/cart-item.component';
import {withRouter} from "react-router-dom";
import { selectCartItems } from '../../redux/cart/cart.selectors';
import {toggleCartHidden} from '../../redux/cart/cart.actions'
import {createSelector, createStructuredSelector} from "reselect";

const CartDropdown = ({ cartItems,history,dispatch }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {    cartItems.length ?
                cartItems.map(cartItem =>
                    <CartItem key={cartItem.id} item={cartItem} />) :
                    (
                        <span className="empty-message">Your cart is empty</span>
                    )
                   
            }
        </div>
        <CustomButton
         onClick={()=>
            {history.push('/checkout')
            dispatch(toggleCartHidden())
         }}>CHECKOUT</CustomButton>

    </div>
)

const mapStateToProps = createStructuredSelector ({
    cartItems:selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))