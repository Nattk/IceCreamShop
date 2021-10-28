import { Fragment } from "react";

export default function ToppingOptions({ name, imagePath }) {
  return (
    <Fragment>
      <img src={`http://localhost:3030${imagePath}`} alt={`${name} topping`} />
    </Fragment>
  );
}
