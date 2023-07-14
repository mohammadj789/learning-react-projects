import { type } from "@testing-library/user-event/dist/type";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const toogleHandler = () => {
    dispatch(uiActions.toggle());
  };
  const quantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <button className={classes.button} onClick={toogleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
