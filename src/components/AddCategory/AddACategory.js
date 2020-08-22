import React,{Component} from 'react';
import axios from "axios";
import Input from '../UI/Input/Input';
import classes from './AddANews.css'


class AddCategory extends Component {
    constructor(props) {
        super(props);
   this.state  ={
        selectedFile: [],
                controls:{
                    title:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Title'
                },
                value:'',

            },
            description:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Description'
                },
                value:'',

            },


        }
    }

}


    inputChangedHandler=(event, controlName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
            }
        };
        this.setState({controls:updatedControls});
    }
    submitHandler = e => {
        e.preventDefault();
        const url = 'http://localhost:5000/categories';
        const title=this.state.controls.title.value
        const description=this.state.controls.description.value

            axios
              .post(url,{title,description})
               .then(response=>{
                   console.log(response);
               }) 
      };
    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        const form=formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            
        ));
        return (
            <div className={classes.add} >
            <div className={classes.atricleback}>
                <form onSubmit={this.submitHandler} >
                <h1>Add Category</h1>
                {form}
                     <button className={classes.Order} >Add</button>

                </form>
            </div>
            </div>
        )
    }

}

export default AddCategory;
