import { Fragment, useState } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

const SummaryForm = ({ phaseClick }) => {
  const [btnSwitch, setBtnSwitch] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>no ice cream will be actually delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <label htmlFor="terms-conditions-checkbox">
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </label>
  );

  return (
    <Fragment>
      {checkboxLabel}
      <input
        id="terms-conditions-checkbox"
        type="checkbox"
        onChange={(e) => {
          setBtnSwitch(e.target.checked);
        }}
      />
      <button
        onClick={() => phaseClick("order confirmation")}
        disabled={!btnSwitch}
      >
        Confirm order
      </button>
    </Fragment>
  );
};

export default SummaryForm;
