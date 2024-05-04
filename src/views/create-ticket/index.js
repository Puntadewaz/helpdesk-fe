import { Fragment, useState, useContext, useEffect } from "react";
import { isObjEmpty } from "@utils";
import classnames from "classnames";
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleLogin } from "@store/actions/auth";
import { Link, useHistory } from "react-router-dom";
import { AbilityContext } from "@src/utility/context/Can";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
} from "reactstrap";

import "@styles/base/pages/page-auth.scss";
import logo from "@src/assets/images/logo/logo-1.png";

const Register = () => {
  const ability = useContext(AbilityContext);

  const [skin, setSkin] = useSkin();

  const history = useHistory();

  const { errors } = useForm();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("hehe");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const illustration = skin === "dark" ? "graphic-1.png" : "graphic-1.png",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const submitTicket = async () => {
    const post_data_form = new FormData();

    post_data_form.append("customer_name", name);
    post_data_form.append("customer_phone_number", phoneNumber);
    post_data_form.append("customer_email", email);
    post_data_form.append("category_id", 1);
    post_data_form.append("description", description);

    const res = await fetch(
      `https://helpdesk-be-i5qwuwknwq-as.a.run.app/v1/tickets`,
      {
        method: "POST",
        body: post_data_form,
      }
    );

    const data = await res.json();

    history.push("/");

    // useEffect(function () {
    //   async function registerTicket() {
    //     const res = await fetch(
    //       `https://helpdesk-be-i5qwuwknwq-as.a.run.app/v1/tickets`,
    //       {
    //         method: "POST",
    //         body: JSON.stringify(newTicket),
    //       }
    //     );
    //     console.log(res);
    //   }
    //   registerTicket();
    //   history.push("/");
    // }, []);
  };

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img style={{ width: "65px", height: "65px" }} src={logo} />
          <h2
            style={{ marginTop: "1.5rem" }}
            className="brand-text text-primary ml-1"
          >
            Helpdesk
          </h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="6" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="6"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              Create Ticket Here!
            </CardTitle>
            <CardText className="mb-2">Find the solution here!</CardText>

            <Form className="auth-register-form mt-2">
              <FormGroup>
                <Label className="form-label" for="register-username">
                  Name
                </Label>
                <Input
                  autoFocus
                  type="text"
                  value={name}
                  placeholder="johndoe"
                  id="register-name"
                  name="register-name"
                  onChange={(e) => setName(e.target.value)}
                  className={classnames({
                    "is-invalid": errors["register-username"],
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="register-email">
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  id="register-phone-number"
                  name="register-phone-number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="08123456789"
                  className={classnames({
                    "is-invalid": errors["register-email"],
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="register-email">
                  Email
                </Label>
                <Input
                  type="email"
                  value={email}
                  id="register-email"
                  name="register-email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className={classnames({
                    "is-invalid": errors["register-email"],
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="register-email">
                  Category
                </Label>
                <Input
                  type="text"
                  value={category}
                  id="register-category"
                  name="register-category"
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="IT Support"
                  className={classnames({
                    "is-invalid": errors["register-email"],
                  })}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="register-email">
                  Description
                </Label>
                <Input
                  type="textarea"
                  value={description}
                  id="register-description"
                  name="register-description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder=""
                  row="3"
                  className={classnames({
                    "is-invalid": errors["register-email"],
                  })}
                />
              </FormGroup>
              <Button.Ripple
                type="button"
                onClick={submitTicket}
                block
                color="primary"
              >
                Create Ticket
              </Button.Ripple>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
