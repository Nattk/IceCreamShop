import Options from "./Options";
import { useOrderDetails } from "../../store/OrderDetailsContext";

export default function OrderEntry({ changePhase }) {
  const [orderDetails, updateItemCount] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}$</h2>
      <button
        onClick={() => {
          changePhase("order summary");
        }}
      >
        Order your ice cream
      </button>
    </div>
  );
}
