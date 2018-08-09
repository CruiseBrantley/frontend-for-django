import React, { Component } from "react";
import { AppRegistry, TextInput, View, Text, Button } from "react-native";
import TextBox from "./textbox";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "Bob",
      lastName: "Barton",
      city: "",
      state: "",
      zipCode: null,
      received: null
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

  componentDidMount = () => {
    let self = this;
    let TOKEN = process.env.TOKEN;
    console.log(process.env);
    axios
      .get("https://hello-django-project.herokuapp.com/api/notes/", {
        headers: { Authorization: TOKEN }
      })
      .then(function(response) {
        // self.setState({
        //   notes: response.data.notes,
        //   loggedIn: true,
        //   currentUser: response.data.name.username
        // });
        // console.log(response);
        self.setState({ received: true });
      })
      .catch(function(error) {
        self.setState({ received: false });
        console.log(error);
      });
  };

  render() {
    return this.state.received === null ? (
      <Text>Loading...</Text>
    ) : this.state.received === false ? (
      <Text>Something went wrong</Text>
    ) : (
      <View>
        <View style={{ flex: 0, alignItems: "flex-end" }}>
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
        </View>
        <Button onPress={e => console.log(this.state)} title="State" />
      </View>
    );
  }
}
