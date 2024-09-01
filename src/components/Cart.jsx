import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from '../store/UserProgressContext.jsx';
import CartItem from "./CartItem.jsx";

export default function Cart(){
    const cartCtx = useContext(CartContext);
    const progressCtx = useContext(UserProgressContext);

    const totalPrice = cartCtx.items.reduce( (total,item)=> total+item.quantity*item.price ,0);

    function handleCloseCart(){
        progressCtx.hideCart();
    }

    function handleGoToCheckout(){
        progressCtx.showCheckout();
    }
    return(
      <Modal className="cart" open ={progressCtx.progress==='cart'} onClose={progressCtx.progress==='cart' ? handleCloseCart:null}>
        <h2>Your Cart</h2>
        <ul>
            {
                cartCtx.items.map((item) =>(
                    <CartItem key={item.id} name={item.name} price={item.price} quantity={item.quantity}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))
            }
        </ul>
        <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>

            {cartCtx.items.length>0 && <Button onClick={handleGoToCheckout}>CheckOut</Button>}
        </p>
      </Modal>
    );
}