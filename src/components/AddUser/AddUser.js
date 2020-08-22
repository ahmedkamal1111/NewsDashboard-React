import React,{Component} from 'react';
import axios from "axios";
import Input from '../UI/Input/Input';
import classes from './AddUser.css'

class AddUser extends Component {

   state  ={
         controls:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'User Name'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false

            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'User Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true                },
                valid:false,
                touched:false

            },
            phone:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'User Phone'
                },
                value:'',
                validation:{
                    required:true,
                    isNumeric:true,
                },
                valid:false,
                touched:false

            },           


        },
        type: ['Supedadmin','data entry'],
        priv: ""

    }

    handleSelect = e => {
        this.setState({priv: e.target.value });
      }

      checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
    
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
    
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
    
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
    
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
    
        return isValid;
    }
inputChangedHandler=(event, controlName)=>{
    const updatedControls={
        ...this.state.controls,
        [controlName]:{
            ...this.state.controls[controlName],
            value: event.target.value,
            valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
            touched:true
        }
    };
    this.setState({controls:updatedControls});
}
    submitHandler = e => {
        e.preventDefault();
        const url = 'http://localhost:5000/admins';
        const name=this.state.controls.name.value
        const priv=this.state.priv
        const email=this.state.controls.email.value
        const phone=this.state.controls.phone.value

            axios
              .post(url,{name,priv,email,phone})
               .then(response=>{
                   console.log(response);
               })};


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
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            
        ));
        return (
            <div className={classes.add} >
            <div className={classes.atricleback}>
                <form onSubmit={this.submitHandler} >
                <h1>Add User</h1>
                {form}
                <select
                onChange={this.handleSelect}
                className={classes.select}>
                <option disabled selected hidden className={classes.opt}>
                  UserType
                </option>
                {this.state.type.map(option => {
                  return <option className={classes.opt} value={option}>{option}</option>;
                })}
              </select>
                <br/>
                     <button className={classes.Order}>Add</button>
                <br/>
                </form>
            </div>
            </div>
        )
    }

}

export default AddUser;
