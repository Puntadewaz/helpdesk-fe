import { useState, Fragment, useEffect } from "react";
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

import "@styles/react/libs/charts/apex-charts.scss";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { getDataUser, apiUpdateUser } from '@src/redux/reducers/user'
import { getRoles } from '@src/redux/reducers/master'
import { useDispatch, useSelector } from 'react-redux'

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

const FailedUpdate = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Failed!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Update User Failed
      </span>
    </div>
  </Fragment>
);

const DetailUser = ({ history }) => {
  const dispatch = useDispatch()
  const storeMaster = useSelector(state => state.master)
  const storeUser = useSelector(state => state.user)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState({ value: 1, label: "Agent" });
  const [kuota, setKuota] = useState(0);
  const [readonlyInput, setReadonlyInput] = useState(true);

  const { id } = useParams();

  const notifyFailedUpdate = () =>
    toast.error(<FailedUpdate />, { hideProgressBar: true });

  const notifySuccessUpdate = () =>
    toast.success(<SuccessUpdate />, { hideProgressBar: true });

  const updateUser = async () => {
    const data = {
      uuid: id,
      password,
      role_id: role.value,
      kuota_assigned: parseInt(kuota)
    } 
    const update = await dispatch(apiUpdateUser({
      data
    }))
    // console.log(update)
    if (update?.payload?.data?.message === "User update successfully") {
      notifySuccessUpdate();
      history.push("/user-management");
    } else {
      notifyFailedUpdate()
    }
    
  };

  useEffect(async () => {
    const datauser = await dispatch(getDataUser({uuid: id}))
    const data = datauser?.payload?.data
    // console.log(datauser)
    setUsername(data?.username);
    setEmail(data?.email);
    setRole({value: data?.role?.id, label: data?.role?.name})
    setKuota(data?.kuota_assigned)
    dispatch(getRoles({}))
  }, [dispatch, storeMaster?.role_options?.length, storeUser?.dataUser])

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
                    readOnly={true}
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
                    readOnly={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
                {!readonlyInput ? (
                  <>
                    <Col xs="12">
                      <Label>Password</Label>
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
                  </>
                ): (
                  <></>
                )}
              </Row>
              <Row>
                <Col xs="12">
                  <Label>Role</Label>
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    // defaultValue={roleOptions[1]}
                    name="loading"
                    options={storeMaster.role_options}
                    isClearable={false}
                    required
                    isDisabled={readonlyInput}
                    value={role}
                    onChange={(e) => setRole(e)}
                  />
                </Col>
                <Col xs="12">
                  <Label>Kuota</Label>
                  <Input
                    className="dataTable-filter mb-50"
                    type="tel"
                    bsSize="sm"
                    id="kuota-input"
                    required
                    readOnly={readonlyInput}
                    value={kuota}
                    onChange={(e) => setKuota(e.target.value)}
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
