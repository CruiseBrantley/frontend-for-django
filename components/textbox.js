import React from "react";
import { TextInput, View, Text } from "react-native";

const Textbox = props => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text>{props.text}:</Text>
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
        onChangeText={text => props.handleChange(props.name, text)}
        placeholder={props.text}
        value={props.value}
      />
    </View>
  );
};

export default Textbox;
