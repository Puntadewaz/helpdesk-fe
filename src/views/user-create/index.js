import { useState, Fragment } from "react";
import { Check, ChevronLeft, X } from "react-feather";
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

import { apiCreateUser } from '../store/user'
import { useDispatch } from 'react-redux'


import "@styles/react/libs/charts/apex-charts.scss";

const SuccessCreate = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title">Success!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Create User Success
      </span>
    </div>
  </Fragment>
);

const FailedCreate = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Failed!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Create User Failed
      </span>
    </div>
  </Fragment>
);

const CreateUser = ({ history }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState({ value: "Agent", label: "Agent" });

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Technical", label: "Technical" },
    { value: "Agent", label: "Agent" },
  ];

  const notifySuccessCreate = () =>
    toast.success(<SuccessCreate />, { hideProgressBar: true });

  const notifyFailedCreate = () =>
    toast.error(<FailedCreate />, { hideProgressBar: true });

  const createUser = async () => {
    const newUser = {
      username,
      password,
      email,
    };

    switch (role.value) {
      case "Admin":
        newUser.role_id = 0;
        break;
      case "Supervisor":
        newUser.role_id = 1;
        break;
      case "Technical":
        newUser.role_id = 2;
        break;
      case "Agent":
        newUser.role_id = 3;
        break;
    }

    const res = await dispatch(apiCreateUser({newUser}))
    // console.log(create?.payload?.data)
    if (res?.payload?.data?.error){
      notifyFailedCreate()
    } else {
      notifySuccessCreate();
      history.push("/user-management");
    }
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
                  <h3>Create User</h3>
                </Col>
                <Col xs="12">
                  <Label>Username</Label>
                  <Input
                    className="dataTable-filter mb-50"
                    type="text"
                    bsSize="sm"
                    id="username-input"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Please type your username"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please type your email"
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
                    className="input-group-merge"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please type your password"
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
                      className="input-group-merge"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Please re-type your password"
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
                    value={role}
                    onChange={(e) => setRole(e)}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs="12" sm="6"></Col>
          </Row>
          <Row>
            <Col xs="12" className="d-flex justify-content-end">
              <Button
                color="primary"
                style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}
                onClick={createUser}
              >
                Create
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateUser;
