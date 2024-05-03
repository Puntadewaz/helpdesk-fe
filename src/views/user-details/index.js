import { useState, Fragment, useEffect } from "react";
import { Check, ChevronLeft } from "react-feather";
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  FormGroup,
  FormFeedback,
} from "reactstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { toast } from "react-toastify";
import Avatar from "@components/avatar";
import { Link } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";

import "@styles/react/libs/charts/apex-charts.scss";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const SuccessUpdate = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title">Success!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Update User Success
      </span>
    </div>
  </Fragment>
);

const DetailUser = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState({ value: "Agent", label: "Agent" });
  const [readonlyInput, setReadonlyInput] = useState(true);

  const { id } = useParams();

  useEffect(function () {
    async function getUserDetails() {
      try {
        const res = await fetch(
          `https://helpdesk-be-i5qwuwknwq-as.a.run.app/v1/users/${id}`
        );
        if (!res.ok) throw new Error("Something went wrong when fetching data");
        const userDetails = await res.json();
        setUsername(userDetails.username);
        setEmail(userDetails.email);
        setPassword(userDetails.password);
        setConfirmPassword(userDetails.password);
        switch (userDetails) {
          case 0:
            return setRole({ value: "Admin", label: "Admin" });
          case 1:
            return setRole({ value: "Supervisor", label: "Supervisor" });
          case 2:
            return setRole({ value: "Technical", label: "Technical" });
          case 3:
            return setRole({ value: "Agent", label: "Agent" });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserDetails();
  }, []);

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Technical", label: "Technical" },
    { value: "Agent", label: "Agent" },
  ];

  const notifySuccessUpdate = () =>
    toast.success(<SuccessUpdate />, { hideProgressBar: true });

  const updateUser = () => {
    notifySuccessUpdate();
    history.push("/user-management");
  };

  return (
    <div id="dashboard-analytics">
      <Card>
        <CardBody>
          <Row>
            <div style={{ marginLeft: "1.5rem" }}>
              <Link to={{ pathname: "/user-management" }}>
                <Row>
                  <ChevronLeft />
                  <p>Back</p>
                </Row>
              </Link>
            </div>
          </Row>
          <Row className="match-height">
            <Col xs="12" sm="6">
              <Row>
                <Col xs="12">
                  <h3>Detail User</h3>
                </Col>
                <Col xs="12">
                  <Label>Username</Label>
                  <Input
                    className="dataTable-filter mb-50"
                    type="text"
                    bsSize="sm"
                    id="username-input"
                    required
                    readOnly={readonlyInput}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Col>
                <Col xs="12">
                  <Label>Email</Label>
                  <Input
                    className="dataTable-filter mb-50"
                    type="email"
                    bsSize="sm"
                    id="email-input"
                    required
                    readOnly={readonlyInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
                <Col xs="12">
                  <Label>Password</Label>
                  {/* <Input
                    className='dataTable-filter mb-50'
                    type='password'
                    bsSize='sm'
                    id='username-input'
                    required
                    readOnly={readonlyInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  /> */}
                  <InputPasswordToggle
                    value={password}
                    id="password-input"
                    name="password"
                    readOnly={readonlyInput}
                    className="input-group-merge"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
                <Col xs="12">
                  <FormGroup>
                    <Label>Confirm Password</Label>
                    {/* <Input
                      className='dataTable-filter mb-50'
                      type='password'
                      bsSize='sm'
                      id='username-input'
                      required
                      readOnly={readonlyInput}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    /> */}
                    <InputPasswordToggle
                      value={confirmPassword}
                      id="confirm-password-input"
                      name="confirm-password"
                      readOnly={readonlyInput}
                      className="input-group-merge"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Label>Role</Label>
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    // defaultValue={roleOptions[1]}
                    name="loading"
                    options={roleOptions}
                    isClearable={false}
                    required
                    isDisabled={readonlyInput}
                    value={role}
                    onChange={(e) => setRole(e)}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs="12" sm="6"></Col>
          </Row>
          {readonlyInput ? (
            <Row>
              <Col xs="12" className="d-flex justify-content-end">
                <Button
                  color="primary"
                  style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}
                  onClick={() => setReadonlyInput(false)}
                  outline
                >
                  Update Data
                </Button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col xs="12" className="d-flex justify-content-end">
                <Button
                  color="danger"
                  style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}
                  onClick={() => setReadonlyInput(true)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}
                  onClick={updateUser}
                >
                  Update
                </Button>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default DetailUser;
