import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Register.css';
import { updateObject, checkValidity } from '../../shared/utility';

class Register extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },      
            businessName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Business Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },      
            businessId: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Business ID'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            invoicingAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Invoicing address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }                      
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onRegister(this.state.controls.email.value, this.state.controls.businessName.value, this.state.controls.businessId.value, this.state.controls.invoicingAddress.value);
    }

    render() {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementtype={formElement.config.elementType}
                elementconfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldvalidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        return (
            <div className={classes.Register}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Register;