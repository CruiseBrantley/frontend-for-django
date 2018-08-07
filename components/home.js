import React, { Component } from "react";
import { AppRegistry, TextInput, View, Text } from "react-native";
import TextBox from "./textbox";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Bob",
      firstName: "Barton",
      lastName: "",
      city: "",
      state: "",
      zipCode: null
    };
  }

  render() {
    return (
      <View>
        <TextBox text="First Name" value={this.state.firstName} />
        <TextBox text="Last Name" value={this.state.lastName} />
      </View>
    );
  }
}
