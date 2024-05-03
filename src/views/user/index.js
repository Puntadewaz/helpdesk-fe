import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  Input,
  Label,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { ChevronDown, Plus, Eye } from "react-feather";
import { Link } from "react-router-dom";

import "@styles/react/libs/charts/apex-charts.scss";

// let data;

// ** Get initial Data
// axios.get("/api/datatables/initial-data").then((response) => {
//   data = response.data;
// });

const basicColumns = [
  {
    name: "",
    allowOverflow: true,
    maxWidth: "100px",
    cell: (row) => {
      return (
        <div className="d-flex">
          <Link to={{ pathname: `/user-details/${row.uuid}` }}>
            <Eye style={{ cursor: "pointer" }} size={15} />
          </Link>
        </div>
      );
    },
  },
  {
    name: "ID",
    selector: "uuid",
    sortable: true,
    // maxWidth: '100px'
  },
  {
    name: "Name",
    selector: "username",
    sortable: true,
    // minWidth: '225px'
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
    // minWidth: '310px'
  },
  {
    name: "Role",
    selector: "role_id",
    sortable: true,
    cell: (row) => {
      switch (row.role_id) {
        case 0:
          return "Admin";
        case 1:
          return "Supervisor";
        case 2:
          return "Technical";
        case 3:
          return "Agent";
      }
    },
  },
];

const UserList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch(
          "https://helpdesk-be-i5qwuwknwq-as.a.run.app/v1/users"
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
                <Col xs="6">
                  <Link to={{ pathname: "/user-create" }}>
                    <Button color="primary" size="sm">
                      <Plus />
                      Create
                    </Button>
                  </Link>
                </Col>
                <Col xs="6">
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

export default UserList;
