import { useEffect } from "react";
import { useOrderDetails } from "../../store/OrderDetailsContext";
import { formatCurrency } from "../../utilities";
import axios from "axios";
import { useState } from "react";

export default function OrderConfirmation({ changePhase }) {
  const [orderDetails, updateItemCount, resetAll] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  const newOrderHandler = () => {
    resetAll();
    changePhase("order entry");
  };

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((err) => setOrderNumber(null));
  }, []);

  const confirmation =
    orderNumber === null ? (
      <p>Loading...</p>
    ) : (
      <p>Your order number is : {orderNumber} </p>
    );
  return (
    <div>
      <h3>Thank you</h3>
      {confirmation}
      <button onClick={newOrderHandler}>New order</button>
    </div>
  );
}
