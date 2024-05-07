import { useContext, useState, useEffect } from "react";
import {
  ChevronDown,
  MoreVertical,
  Edit,
  FileText,
  Archive,
  Trash,
  Eye,
} from "react-feather";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Flatpickr from 'react-flatpickr'

import "@styles/react/libs/charts/apex-charts.scss";
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { getTickets } from '@src/redux/reducers/ticket'
import { getCategories, getPriority } from '@src/redux/reducers/master'
import { useDispatch, useSelector } from 'react-redux'

const basicColumns = [
  {
    name: "",
    allowOverflow: true,
    maxWidth: "100px",
    cell: (row) => {
      return (
        <div className="d-flex">
          <Link to={{ pathname: `/ticket-details/${row.uuid}` }}>
            <Eye style={{ cursor: "pointer" }} size={15} />
          </Link>
        </div>
      );
    },
  },
  {
    name: "No. Tiket",
    selector: "ticket_number",
    minWidth: "200px",
  },
  {
    name: "Customer Name",
    selector: "customer_name",
    sortable: true,
    minWidth: "200px",
  },
  {
    name: "Customer Email",
    selector: "customer_email",
    minWidth: "200px",
  },
  {
    name: "Category",
    selector: "category_id",
    sortable: true,
    cell: (row) => {
      return row.category.name !== "" ? row.category.name : "-";
    },
  },
  {
    name: "Priority",
    selector: "priority_id",
    sortable: true,
    cell: (row) => {
      return row.priority.name !== "" ? row.priority.name : "-";
    },
  },
  {
    name: "Agent",
    selector: "user_id",
    sortable: true,
    cell: (row) => {
      return row.user?.username !== "" ? row.user?.username?.toUpperCase() : "-";
    },
  },
  {
    name: "Status",
    selector: "status_id",
    sortable: true,
    cell: (row) => {
      return row.status.name !== "" ? row.status.name : "-";
    },
  },
  {
    name: "Created At",
    selector: "created_at",
    sortable: true,
    minWidth: "200px",
  },
];

const TicketList = () => {
  const dispatch = useDispatch()
  const storeTicket = useSelector(state => state.ticket)

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(new Date().setDate(1))
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() + 1))

  useEffect(() => {
    dispatch(getTickets({payload:{
      startDate,
      endDate
    }}))
    dispatch(getCategories({}))
    dispatch(getPriority({}))
  }, [dispatch, storeTicket?.data?.length])

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = storeTicket?.data?.filter((item) => {
        const startsWith =
          item.ticket_number.toString().indexOf(value) > -1 ||
          item.customer_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.customer_email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.category?.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.priority?.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.user?.username.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status?.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.created_at.toString().toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.ticket_number.toString().indexOf(value) > -1 ||
          item.customer_name.toLowerCase().includes(value.toLowerCase()) ||
          item.customer_email.toLowerCase().includes(value.toLowerCase()) ||
          item.category?.name.toLowerCase().includes(value.toLowerCase()) ||
          item.priority?.name.toLowerCase().includes(value.toLowerCase()) ||
          item.user?.username.toLowerCase().includes(value.toLowerCase()) ||
          item.status?.name.toLowerCase().includes(value.toLowerCase()) ||
          item.created_at.toString().toLowerCase().includes(value.toLowerCase());

        console.log(startsWith)
        console.log(includes)

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else if (startsWith){
          return startsWith;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        <Col xs="12">
          <Card>
            <CardBody>
              <Row>
                <Col xs="12">
                  <Row className="justify-content-end mx-0">
                    <Col
                      className="d-flex align-items-center justify-content-start mt-1"
                      md="6"
                      sm="12"
                    >
                      <Row>
                        <Col lg='5' sm='12'>
                          <Label for='start-date'>Tanggal Mulai</Label>
                          <Flatpickr className='form-control' style={{ backgroundColor: '#fff' }} value={startDate} onChange={date => setStartDate(date)} id='start-date' />
                        </Col>
                        <Col lg='2' sm='12'>
                          <div style={{ alignItems: 'center', alignContent: 'center', textAlign: 'center' }}>
                            <p style={{ fontSize: '30px', marginTop: '2rem' }}><b>-</b></p>
                          </div>
                        </Col>
                        <Col lg='5' sm='12'>
                          <Label for='end-date'>Tanggal Berakhir</Label>
                          <Flatpickr className='form-control' style={{ backgroundColor: '#fff' }} value={endDate} onChange={date => setEndDate(date)} id='end-date' />
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      className="d-flex align-items-center justify-content-end mt-1"
                      md="6"
                      sm="12"
                    >
                      <Label className="mr-1" for="search-input">
                        Search
                      </Label>
                      <Input
                        className="dataTable-filter mb-50"
                        type="text"
                        bsSize="sm"
                        id="search-input"
                        value={searchValue}
                        onChange={handleFilter}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs="12">
                  <DataTable
                    noHeader
                    pagination
                    data={searchValue.length ? filteredData : storeTicket?.data}
                    columns={basicColumns}
                    className="react-dataTable"
                    sortIcon={<ChevronDown size={10} />}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TicketList;
