import { Fragment } from "react";

export default function ScoopOptions({ name, imagePath }) {
  return (
    <Fragment>
      <img src={`http://localhost:3030${imagePath}`} alt={`${name} scoop`} />
    </Fragment>
  );
}
