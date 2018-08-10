import React, { Component } from "react";
import {
  AppRegistry,
  TextInput,
  View,
  Text,
  Button,
  ScrollView
} from "react-native";
import TextBox from "./textbox";
import axios from "axios";
import { TOKEN } from "../env.json";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      zipCode: null,
      received: null,
      success: false,
      list: []
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
    axios
      .get("https://hello-django-project.herokuapp.com/api/notes/", {
        headers: { Authorization: TOKEN }
      })
      .then(function(response) {
        // self.setState({
        //   firstName: response.data[0].firstName,
        //   lastName: response.data[0].lastName,
        //   city: response.data[0].city,
        //   state: response.data[0].state,
        //   zipCode: String(response.data[0].zipCode),
        //   received: true
        // });
        self.setState({ list: response.data });
        // console.log(response.data);
        self.setState({ received: true });
      })
      .catch(function(error) {
        self.setState({ received: false });
        console.log(error);
        console.log("The above is Error text");
      });
  };

  addInfo = () => {
    const { firstName, lastName, city, state, zipCode } = this.state;
    axios
      .post(
        "https://hello-django-project.herokuapp.com/api/notes/",
        { firstName, lastName, city, state, zipCode },
        {
          headers: { Authorization: TOKEN }
        }
      )
      .then(response => {
        if (response) {
          console.log(response.data);
          this.componentDidMount();
          this.setState({
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            zip: null,
            success: true
          });
        } else this.setState({ received: false });
      });
  };

  render() {
    return this.state.received === null ? (
      <Text>Loading...</Text>
    ) : this.state.received === false ? (
      <Text>Something went wrong</Text>
    ) : (
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 80
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            {this.state.list.map((e, index) => {
              return (
                <View
                  key={index}
                  style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}
                >
                  <Text>{e.firstName}, </Text>
                  <Text>{e.lastName}, </Text>
                  <Text>{e.city}, </Text>
                  <Text>{e.state}, </Text>
                  <Text>{e.zipCode}</Text>
                </View>
              );
            })}

            {this.state.success ? (
              <Text style={{ margin: 40 }}>Successfully Created!</Text>
            ) : null}
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
          <Button onPress={e => this.addInfo()} title="Create Contact" />
        </View>
      </ScrollView>
    );
  }
}
