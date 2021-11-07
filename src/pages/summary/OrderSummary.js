import { useOrderDetails } from "../../store/OrderDetailsContext";
import { useEffect, useState } from "react";
import SummaryForm from "./SummaryForm";

export default function OrderSummary({ changePhase }) {
  const [orderDetails, updateItemCount] = useOrderDetails();
  const [scoops, setScoops] = useState([]);
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    const scoopArray = [...scoops];
    const toppingArray = [...toppings];

    for (const scoop of orderDetails["scoops"]) {
      scoopArray.push(scoop);
      setScoops(scoopArray);
    }

    for (const topping of orderDetails["toppings"]) {
      toppingArray.push(topping);
      setToppings(toppingArray);
    }
  }, []);

  return (
    <div>
      <h2>Order Summary</h2>
      <h3>Scoops</h3>
      <ul>
        {scoops.length > 0 &&
          scoops.map((scoop) => (
            <li key={scoop[0]}>{`${scoop[0]} x${scoop[1]}`}</li>
          ))}
      </ul>
      <h3>toppings</h3>
      <ul>
        {toppings.length > 0 &&
          toppings.map((topping) => (
            <li key={topping[0]}>{`${topping[0]} x${topping[1]}`}</li>
          ))}
      </ul>
      <SummaryForm phaseClick={changePhase} />
    </div>
  );
}
