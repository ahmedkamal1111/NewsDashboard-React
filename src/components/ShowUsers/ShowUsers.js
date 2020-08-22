import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Search,DeleteOutlineTwoTone} from "@material-ui/icons/";


export class ShowUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "USER ID",
          field: "id",
          filterPlaceholder: "Id",
          editable: true
        },
        {
          title: " Name",
          field: "name",
          filterPlaceholder: "Name"
        },
        {
          title: "Email",
          field: "email",
          filterPlaceholder: "Email",
        },
        {
          title: "Type",
          field: "priv",
          filterPlaceholder: "Type",
        }
        
      ],
      Allusers: [],

    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/admins")
      .then(response => {
        this.setState({ Allusers: response.data });
        console.log(this.state.Allusers);
      });
      
  }


  render() {
    
    return (
      <main className="content">
        <MaterialTable
          columns={this.state.columns}
          data={this.state.Allusers}
          icons={{ Filter: () => <Search /> }} // <== this solves it
          title="All Users"
          // localization={{
          //   pagination:{
          //     labelDisplayedRows: `${1}-${15} of ${this.props.data.length}`
          //   }
          // }}

          options={{
            pageSize: 10,
            pageSizeOptions: [5, 10, 15, 20],
            paginationType: "stepped",
            // selection: true,

            detailPanelProps: rowData => ({
              disabled: rowData.id !== this.state.selectedRow + 1,
              color: "primary"
            }),
            filtering: true,
            headerStyle: {
              backgroundColor: "#ccc",
              color: "#000",
              paddingLeft: 15
            },
            rowStyle: rowData => ({
              backgroundColor:
                this.state.selected &&
                this.state.selectedRow === rowData.tableData.id
                  ? "#EEE"
                  : "#FFF",
              transition: "background .2s ease-in"
            }),

            actionsColumnIndex: 8
          }}
          actions={[
            {
              //delete partially
              icon: () => <DeleteOutlineTwoTone color={"action"} />,
              tooltip: "Delete this User",
              onClick: (event, rowData) => {
                     axios
                          .delete(
                            `http://localhost:5000/admins/`+rowData.id
                          )
                          .then(response => {
                            let data = this.state.Allusers;
                            const index = data.indexOf(rowData);
                            data.splice(index, 1);
                            this.setState({ data });
                          });
                         }
            }
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.Allusers;
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    axios.put(
                      `http://localhost:5000/admins/`+newData.id,
                      {

                        
                          id: newData.id,
                          name: newData.name,
                          email: newData.email
                        
                   
                      
                      }
                    ).then(response=>{
                      let data = this.state.Allusers;
                      this.setState({ data }, () => resolve());
                    })
                    // .then(response => console.log(response))/
                  }
                  resolve();
                }, 1000);
              })
          }}
        />
      </main>
    );
  }
}
export default ShowUsers;
