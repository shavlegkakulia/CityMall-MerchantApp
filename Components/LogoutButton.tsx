import React from "react";
import { Image, TouchableOpacity } from "react-native";

const LogoutButton = (props: any) => (
    <TouchableOpacity onPress={props.onPress} >
        <Image style={{ width: 90, height: 40 }} source={require('../assets/images/Exit-Button.png')} />
    </TouchableOpacity>
);

export default LogoutButton;