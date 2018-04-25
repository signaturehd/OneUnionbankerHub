import React, { Component } from 'react'
import { render } from "react-dom";
import './table.css'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class Table extends Component {
  constructor() {
    super();
    this.state = {
      /*data: makeData()*/
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Title",
              columns: [
                {
                  Header: "Title",
                  accessor: "title"
                },
                {
                  Header: "Description",
                  id: "description",
                  accessor: d => d.description
                }
              ]
            },
            {
              Header: "Link",
              columns: [
                {
                  Header: "Play Podcast",
                  accessor: "link"
                },

              ]
            },

          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />

      </div>
    );
  }
}

export default (Table)
