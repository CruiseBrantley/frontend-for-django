import React, { Component } from "react";
import { AppRegistry, TextInput, View, Text } from "react-native";

export default class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = { text: null };
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>{this.props.text}:</Text>
        <TextInput
          style={{
            height: 40,
            width: 120,
            borderColor: "gray",
            borderWidth: 1,
            margin: 5,
            padding: 5
          }}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ text })}
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.props.value ? this.props.value : null}
        />
      </View>
    );
  }
}
