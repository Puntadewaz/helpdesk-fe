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
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { toast } from "react-toastify";
import Avatar from "@components/avatar";
import { Link } from "react-router-dom";

import "@styles/react/libs/charts/apex-charts.scss";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getDataTicket, apiUpdateTicket, apiRaiseTicket, apiResolvedTicket } from '@src/redux/reducers/ticket'
import { getCategories, getPriority } from '@src/redux/reducers/master'
import { useDispatch, useSelector } from 'react-redux'

const SuccessToastRaise = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title">Success!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Raise Ticket Success
      </span>
    </div>
  </Fragment>
);

const SuccessToastUpdate = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title">Success!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Update Ticket Success
      </span>
    </div>
  </Fragment>
);

const SuccessToastResolved = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title">Success!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Resolve Ticket Success
      </span>
    </div>
  </Fragment>
);

const FailedToastUpdate = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Failed!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Update Ticket Failed
      </span>
    </div>
  </Fragment>
);

const FailedToastRaise = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Failed!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Raise Ticket Failed
      </span>
    </div>
  </Fragment>
);

const FailedToastResolved = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<X size={12} />} />
        <h6 className="toast-title">Failed!</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        Resolved Ticket Failed
      </span>
    </div>
  </Fragment>
);

const TicketDetails = ({ history }) => {
  const dispatch = useDispatch()
  const storeMaster = useSelector(state => state.master)
  const [ticket, setTicket] = useState({});
  const [category, setCategory] = useState({});
  const [priority, setPriority] = useState({});
  const [response, setResponse] = useState("");
  const [summary, setSummary] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();

  useEffect(async () => {
    const dataticket = await dispatch(getDataTicket({uuid: id}))
    const data = dataticket?.payload?.data
    // console.log(data)
    setCategory({value: data?.category?.id, label: data?.category?.name})
    setPriority({value: data?.priority?.id, label: data?.priority?.name})
    setTicket(data)
    let comment1 = ''
    for (const key in data?.ticket_details) {
      comment1 += `${data?.ticket_details[key].created_at} [${data?.ticket_details[key]?.user?.username}]: ${data?.ticket_details[key].response} \n\n`
      
    }
    setComment(comment1)
    dispatch(getCategories({}))
    dispatch(getPriority({}))
  }, [ dispatch, ]);

  const notifySuccessRaise = () =>
    toast.success(<SuccessToastRaise />, { hideProgressBar: true });
  const notifySuccessUpdate = () =>
    toast.success(<SuccessToastUpdate />, { hideProgressBar: true });
  const notifySuccessResolved = () =>
    toast.success(<SuccessToastResolved />, { hideProgressBar: true });

  const notifyFailedRaise = () =>
    toast.error(<FailedToastRaise />, { hideProgressBar: true });
  const notifyFailedUpdate = () =>
    toast.error(<FailedToastUpdate />, { hideProgressBar: true });
  const notifyFailedResolved = () =>
    toast.error(<FailedToastResolved />, { hideProgressBar: true });

  const raiseTicket = async () => {
    const data = {
      uuid: id,
      category_id: category?.value,
      priority_id: priority?.value,
      user_id: ticket.user_id,
      response,
    };

    const update = await dispatch(apiRaiseTicket({
      data
    }))
    // console.log(update)
    if (update?.payload !== undefined) {
      notifySuccessRaise();
      history.push("/ticket");
    } else {
      notifyFailedRaise()
    }
  };

  const updateTicket = async () => {
    const data = {
      uuid: id,
      category_id: category?.value,
      priority_id: priority?.value,
      user_id: ticket.user_id,
      response,
    };

    const update = await dispatch(apiUpdateTicket({
      data
    }))
    // console.log(update)
    if (update?.payload !== undefined) {
      notifySuccessUpdate();
      history.push("/ticket");
    } else {
      notifyFailedUpdate()
    }
  };

  const resolvedTicket = async () => {
    const data = {
      uuid: id,
      category_id: category?.value,
      priority_id: priority?.value,
      user_id: ticket.user_id,
      response,
      summary
    };

    const update = await dispatch(apiResolvedTicket({
      data
    }))
    // console.log(update)
    if (update?.payload !== undefined) {
      notifySuccessResolved();
      history.push("/ticket");
    } else {
      notifyFailedResolved()
    }
  };

  return (
    <div id="dashboard-analytics">
      <Card>
        <CardBody>
          <Row>
            <div style={{ marginLeft: "1.5rem" }}>
              <Link to={{ pathname: "/ticket" }}>
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
                  <h3>Ticket Details</h3>
                </Col>
                <Col xs="4">
                  <p style={{ marginBottom: "0px", marginTop: "1rem" }}>
                    Ticket Number
                  </p>
                  <p>{ticket?.ticket_number}</p>
                </Col>
                <Col xs="4">
                  <p style={{ marginBottom: "0px", marginTop: "1rem" }}>Name</p>
                  <p>{ticket?.customer_name}</p>
                </Col>
                <Col xs="4">
                  <p style={{ marginBottom: "0px", marginTop: "1rem" }}>
                    Email
                  </p>
                  <p>{ticket?.customer_email}</p>
                </Col>
              </Row>
              <Row>
                <Col xs="4">
                  <p style={{ marginBottom: "0px", marginTop: "1rem" }}>
                    Ticket Created
                  </p>
                  <p>{ticket?.created_at}</p>
                </Col>
                <Col xs="4">
                  <p style={{ marginBottom: "0px", marginTop: "1rem" }}>
                    Status
                  </p>
                  <p>{ticket?.status?.name}</p>
                </Col>
                <Col xs="4">
                  <p style={{ marginBottom: "0px", marginTop: "1rem" }}>
                    Agent
                  </p>
                  <p>{ticket?.user?.username?.toUpperCase()}</p>
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col xs="6">
                  <Label>Category</Label>
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    // defaultValue={category.label}
                    value={category}
                    name="loading"
                    options={storeMaster.category_options}
                    onChange={(e) => setCategory(e)}
                    // isLoading={true}
                    isClearable={false}
                  />
                </Col>
                <Col xs="6">
                  <Label>Priority</Label>
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    // defaultValue={priority.value}
                    value={priority}
                    name="loading"
                    options={storeMaster.priority_options}
                    onChange={(e) => setPriority(e)}
                    // isLoading={true}
                    isClearable={false}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col xs="12">
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    readOnly
                    name="text"
                    id="exampleText"
                    value={ticket?.description}
                    rows="3"
                    placeholder="Textarea"
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col xs="6">
                  <p style={{ marginBottom: "0px", marginTop: "1rem" }}>
                    Status
                  </p>
                  <Row>
                    <Button color="primary" style={{ marginLeft: "1rem" }}>
                      File 1
                    </Button>
                    <Button color="primary" style={{ marginLeft: "1rem" }}>
                      File 2
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs="12" sm="6">
              <Row>
                <Col xs="12">
                  <h3>Ticket Response</h3>
                </Col>
                <Col xs="12">
                  <Input
                    type="textarea"
                    readOnly
                    name="text"
                    id="exampleText"
                    rows="3"
                    value={comment}
                    placeholder="Textarea"
                  />
                </Col>
                <Col xs="12">
                  <Input
                    style={{ marginTop: "1rem" }}
                    type="textarea"
                    name="text"
                    id="exampleText"
                    rows="3"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Textarea"
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "1rem" }}>
                <Col xs="12">
                  <Label>Summary</Label>
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    rows="3"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Textarea"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="d-flex justify-content-end">
              <Button
                color="warning"
                style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}
                onClick={raiseTicket}
              >
                Raise
              </Button>
              <Button
                color="info"
                outline
                style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}
                onClick={updateTicket}
              >
                Update
              </Button>
              <Button
                color="success"
                style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}
                onClick={resolvedTicket}
              >
                Resolved
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default TicketDetails;
