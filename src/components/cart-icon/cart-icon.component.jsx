import React from 'react';
import Cart from '../../assets/cart'
import './cart-icon.styles.scss';
import { connect } from "react-redux";
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import {  createStructuredSelector} from "reselect";


const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <Cart className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
)

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
  })

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)