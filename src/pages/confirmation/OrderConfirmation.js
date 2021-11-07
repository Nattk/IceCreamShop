import { useOrderDetails } from "../../store/OrderDetailsContext";
import { formatCurrency } from "../../utilities";

export default function OrderConfirmation({ changePhase }) {
  const [orderDetails, updateItemCount, resetAll] = useOrderDetails();

  const newOrderHandler = () => {
    resetAll();
    changePhase("order entry");
  };
  return (
    <div>
      <h3>Thank you</h3>
      <p>Your order number is : 0000001</p>
      <button onClick={newOrderHandler}>New order</button>
    </div>
  );
}
