import React, { Component } from "react";
import { AppRegistry, TextInput, View, Text, Button } from "react-native";
import TextBox from "./textbox";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Bob",
      lastName: "Barton",
      city: "",
      state: "",
      zipCode: null
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleChangeNumbers = (name, value) => {
    this.setState({
      [name]: value.replace(/[^0-9]/g, "")
    });
  };

  render() {
    return (
      <View>
        <TextBox
          text="First Name"
          name="firstName"
          value={this.state.firstName}
          handleChange={this.handleChange}
        />
        <TextBox
          text="Last Name"
          name="lastName"
          value={this.state.lastName}
          handleChange={this.handleChange}
        />
        <TextBox
          text="City"
          name="city"
          value={this.state.city}
          handleChange={this.handleChange}
        />
        <TextBox
          text="State"
          name="state"
          value={this.state.state}
          handleChange={this.handleChange}
        />
        <TextBox
          text="ZIP Code"
          name="zipCode"
          value={this.state.zipCode}
          handleChange={this.handleChangeNumbers}
        />
        <Button onPress={e => console.log(this.state)} title="State" />
      </View>
    );
  }
}
