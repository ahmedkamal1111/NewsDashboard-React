import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Search,DeleteOutlineTwoTone} from "@material-ui/icons/";


export class ShowCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "ID",
          field: "id",
          filterPlaceholder: "Id",
          editable: true
        },
        {
          title: " Title",
          field: "title",
          filterPlaceholder: "Title"
        },
        {
          title: "Description",
          field: "description",
          filterPlaceholder: "Description",
        }
        
      ],
      AllCategories: [],

    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/categories")
      .then(response => {
        this.setState({ AllCategories: response.data });
        console.log(this.state.AllCategories);
      });
      
  }


  render() {
    
    return (
      <main className="content">
        <MaterialTable
          columns={this.state.columns}
          data={this.state.AllCategories}
          icons={{ Filter: () => <Search /> }} // <== this solves it
          title="All Categories"
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
                            `http://localhost:5000/categories/`+rowData.id
                          )
                          .then(response => {
                            let data = this.state.AllCategories;
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
                    const data = this.state.AllCategories;
                    const index = data.indexOf(oldData);
                    data[index] = newData;
                    axios.put(
                      `http://localhost:5000/categories/`+newData.id,
                      {

                        
                          id: newData.id,
                          title: newData.title,
                          description: newData.description
                        
                   
                      
                      }
                    ).then(response=>{
                      let data = this.state.AllCategories;
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
export default ShowCategories;