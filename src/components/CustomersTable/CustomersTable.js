import React, { Component } from "react";
import ReactTable from "react-table";
import Moment from "react-moment";
import Axios from 'axios';
import "react-table/react-table.css";
import "./CustomersTable.css";

const columns = [
  {
    Header: "Id",
    accessor: "id",
    show: false
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: row => (
      <span>
        <span
          style={{
            color:
              (row.value === "prospective" && "#ffbf00") ||
              (row.value === "current" && "#57d500") ||
              "#ff2e00",
            transition: "all .3s ease"
          }}
        >
          &#x25cf;
        </span>{" "}
        {(row.value === "prospective" && "Prospective") ||
          (row.value === "current" && "Current") ||
          "Non-active"}
      </span>
    )
  },
  {
    Header: "Creation Date",
    accessor: "creationDate",
    Cell: row => (
      <span>
        <Moment format="YYYY-MM-DD HH:mm">
          {row.value}
        </Moment>
      </span>
    )
  },
  {
    Header: "Name",
    id: "name",
    accessor: d => d.generalInfo.name,
  },
  {
    Header: "Email",
    id: "email",
    accessor: d => d.generalInfo.email
  },
  {
    Header: "Phone",
    id: "phone",
    accessor: d => d.generalInfo.phone
  },
  {
    Header: "Notes",
    id: "notes",
    accessor: d => d.notes.length
  }
];

class CustomersTable extends Component {
  state = {
    loading: false,
    data: [],
    pages: -1
  };

  componentDidMount() {
    this.setState({ loading: true });
    Axios.get("http://localhost:8000/").then(res => {
      if (res.status === 200 && res.data.length) {
        this.setState({
          data: res.data,
          loading: false
        });
      }
    });
  }

  handleRowClick = (param) => {
    this.props.history.push(`/customer/${param}`);
  }

  getTrProps = (state, rowInfo, column, instance) => {
    if (rowInfo) {
      return {
        style: {
          cursor: "pointer"
        },
        onClick: e => {

          this.handleRowClick(rowInfo.original._id);
        }
      };
    }
    return {};
  };
  render() {
    return (
      <div className="CustomersTable">
        {this.state.data.length && (
          <ReactTable
            columns={columns}
            data={this.state.data}
            pages={this.state.pages}
            loading={this.state.loading}
            className="-striped -highlight"
            defaultPageSize={5}
            minRows="0"
            filterable
            filterAll={true}
            getTrProps={this.getTrProps}
          />)}
      </div>
    );
  }
}

export default CustomersTable;
