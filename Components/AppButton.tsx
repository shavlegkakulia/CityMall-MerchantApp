import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";


export interface IAppButton {
    buttonTitle: string;
    isLoading: boolean;
    onPress: () => void;
    btnStyle: any,
    titleStyle: any
}

const AppButton = (props: IAppButton) => {
    return (
        <TouchableOpacity style={[props.btnStyle, { opacity: props.isLoading ? 0.4 : 1 }]} onPress={props.onPress} disabled = {props.isLoading}>
            {props.isLoading ? <ActivityIndicator animating={true} size={40} color="#FFFFFF" /> :
                <Text style={props.titleStyle}>{props.buttonTitle}</Text>
            }
        </TouchableOpacity>
    )
}

export default AppButton;