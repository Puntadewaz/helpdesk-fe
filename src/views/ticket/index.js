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

import "@styles/react/libs/charts/apex-charts.scss";

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
    maxWidth: "110px",
  },
  {
    name: "Customer Name",
    selector: "customer_name",
    sortable: true,
  },
  {
    name: "Customer Email",
    selector: "customer_email",
  },
  {
    name: "Category",
    selector: "category",
    sortable: true,
    cell: (row) => {
      return row.category.name;
    },
  },
  {
    name: "Priority",
    selector: "priority_name",
    sortable: true,
    cell: (row) => {
      return row.priority.name;
    },
  },
  {
    name: "Created At",
    selector: "created_at",
    sortable: true,
  },
];

const TicketList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState([]);

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch(
          "https://helpdesk-be-i5qwuwknwq-as.a.run.app/v1/tickets"
        );
        if (!res.ok) throw new Error("Something went wrong with fetching data");

        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    const status = {
      1: { title: "Current", color: "light-primary" },
      2: { title: "Professional", color: "light-success" },
      3: { title: "Rejected", color: "light-danger" },
      4: { title: "Resigned", color: "light-warning" },
      5: { title: "Applied", color: "light-info" },
    };

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title
            .toLowerCase()
            .startsWith(value.toLowerCase());

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
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
                    data={searchValue.length ? filteredData : data}
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
