import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Search,DeleteOutlineTwoTone} from "@material-ui/icons/";


export class EditNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "ID",
          field: "id",
          filterPlaceholder: "ID",
          editable: true
        },
        {
          title: "USER ID",
          field: "userId",
          filterPlaceholder: "User Id",
          editable: true
        },
        {
          title: " Titel",
          field: "titel",
          filterPlaceholder: "Titel"
        },
        {
          title: "Description",
          field: "description",
          filterPlaceholder: "Description",
        },
        {
          title: "Active Date From",
          field: "activeDateFrom",
          filterPlaceholder: "Active Date From",
        }
        
      ],
      Allusers: [],

    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/news")
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
          title="All News"
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
                            `http://localhost:5000/news/`+rowData.id
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
                      `http://localhost:5000/news/`+newData.id,
                      {
                        userId: newData.userId,
                        cat: newData.cat,
                        titel: newData.titel,
                        description: newData.description,
                        activeDateFrom: newData.activeDateFrom,                   
                      
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
export default EditNews;
