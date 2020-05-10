import React from "react";

import classes from "./Contact.module.css";

import {
  formGroup as FormGroup,
  input as Input,
  spinner as Spinner
} from "../components/UI";
import utils from "../utils";
import Button from "../components/Button/Button";

import axios from "../axios";

class Contact extends React.Component {
  state = {
    contactForm: {
      name: {
        type: "input",
        value: "",
        preset: {
          label: "Name",
          type: "text",
          placeholder: "John Smith"
        },
        validation: {
          valid: false,
          required: true
        }
      },
      email: {
        type: "input",
        value: "",
        preset: {
          label: "Email",
          type: "text",
          placeholder: "johnsmith@domain.com"
        },
        validation: {
          valid: false,
          required: true,
          isEmail: {
            valid: false,
            errorMessage: "Invalid email format"
          }
        }
      },
      sex: {
        type: "select",
        value: "",
        preset: {
          label: "Sex",
          type: "text",
          placeholder: "",
          options: [
            { value: "male", display: "Male" },
            { value: "female", display: "Female" }
          ]
        },
        validation: {
          valid: false,
          required: true
        }
      },
      maritalStatus: {
        type: "radio",
        value: "",
        preset: {
          label: "Marital Status",
          type: "radio",
          options: [
            { value: "single", label: "Single" },
            { value: "divorced", label: "Divorced" },
            { value: "married", label: "Married" }
          ]
        },
        validation: {
          valid: false,
          required: true
        }
      },
      message: {
        type: "textarea",
        value: "",
        preset: {
          label: "Message",
          type: "text",
          placeholder: "Max of 200 characters"
        },
        validation: {
          valid: false,
          required: true,
          minLen: 5,
          maxLen: 10
        }
      }
    },
    formIsValid: false,
    loading: false
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isEmail) {
      isValid = utils.validateEmail(value) && isValid;
    }

    return isValid;
  };

  changeHandler = (e, elem) => {
    let contactForm = { ...this.state.contactForm }; // clone a copy of the contactForm state

    let inputElem = { ...contactForm[elem] }; // clone a copy of the targeted input element from the contactForm

    /**
     * update the value of the input with the values keyed in by the user
     * validate the value entered by the user
     */
    inputElem.value = e.target.value;
    inputElem.validation.valid = this.checkValidity(
      inputElem.value,
      inputElem.validation
    );

    inputElem.touched = true;

    contactForm[elem] = inputElem;

    let formIsValid = true;

    for (let elem in contactForm) {
      formIsValid = contactForm[elem].validation.valid && formIsValid;
    }

    this.setState({ contactForm, formIsValid }); // update the contactForm state with the new data
  };

  handleSubmit = e => {
    alert(this.state);
    e.preventDefault();

    this.setState({ loading: true });
    let formData = {};

    for (let key in this.state.contactForm) {
      formData[key] = this.state.contactForm[key].value;
    }

    axios
      .post("/customer.json", formData)
      .then(() => {
        this.setState({ loading: false });
        let copiedContactForm = Object.assign({}, this.state.contactForm);
        for (let key in copiedContactForm) {
          copiedContactForm[key].value = "";
        }

        this.setState({ contactForm: copiedContactForm });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    let formElem = [];
    for (let key in this.state.contactForm) {
      formElem.push({
        id: key,
        properties: this.state.contactForm[key]
      });
    }
    return (
      <div className={classes.Container}>
        <div className={classes.Content}>
          <h3>Contact Form</h3>
          <form onSubmit={this.handleSubmit}>
            {formElem.map(elem => {
              return (
                <FormGroup key={elem.id}>
                  <Input
                    touched={elem.properties.touched}
                    changed={e => this.changeHandler(e, elem.id)}
                    value={elem.properties.value}
                    empty={!(elem.properties.value.length > 0)}
                    validation={elem.properties.validation}
                    type={elem.properties.type}
                    preset={elem.properties.preset}
                    errorMessage={this.errorMsg}
                  />
                </FormGroup>
              );
            })}
            <Button
              disabled={!this.state.formIsValid}
              type="button"
              clicked={this.handleSubmit}
            >
              {this.state.loading ? <Spinner /> : "Send"}
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
