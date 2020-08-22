import React,{Component} from 'react';
import axios from "axios";
import Input from '../UI/Input/Input';
import classes from './AddANews.css'

class AddArticle extends Component {
    constructor(props) {
        super(props);
   this.state  ={
                controls:{
            userId:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'User Id'
                },
                value:'',

            },
            titel:{
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
            activeDateFrom:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Active DateFrom'
                },
                value:'',

            },           

        },
        allCat: [],
        cat: ""
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
    componentDidMount(){
        axios.get('http://localhost:5000/categories')
        .then(response=>{
            this.setState({allCat:response.data})
        })
    }
    submitHandler = e => {
        e.preventDefault();
        const url = 'http://localhost:5000/news';
        const userId=this.state.controls.userId.value
        const cat=this.state.cat
        const titel=this.state.controls.titel.value
        const description=this.state.controls.description.value
        const activeDateFrom=this.state.controls.activeDateFrom.value
            axios
              .post(url,{userId,cat,titel,description,activeDateFrom})
               .then(response=>{
                   console.log(response);
               }) 
      };
      handleSelect = e => {
        this.setState({ cat: e.target.value });
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
                <h1>AddNews</h1>
                {form}
                <select
                onChange={this.handleSelect}
                className={classes.select}>
                <option disabled selected hidden className={classes.opt}>
                  Category
                </option>
                {this.state.allCat.map(option => {
                  return <option className={classes.opt} value={option.title}>{option.title}</option>;
                })}      
                </select>
                <br/>
                     <button className={classes.Order} >Add</button>
                <br/>
                <br/>
                <br/>
                </form>
            </div>
            </div>
        )
    }

}

export default AddArticle;
