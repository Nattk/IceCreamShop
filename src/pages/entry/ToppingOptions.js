import { Form, Col } from "react-bootstrap";
import { Fragment } from "react";

export default function ToppingOptions({ name, imagePath, updateItemCount }) {
  return (
    <Fragment>
      <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
        <img
          src={`http://localhost:3030${imagePath}`}
          style={{ width: "75%" }}
          alt={`${name} topping`}
        />
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label={name}
            onChange={(e) => {
              e.target.checked
                ? updateItemCount(name, 1)
                : updateItemCount(name, 0);
            }}
          />
        </Form.Group>
      </Col>
    </Fragment>
  );
}
