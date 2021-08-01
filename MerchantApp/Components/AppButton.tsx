import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";


export interface IAppButton {
    buttonTitle: string;
    isLoading: boolean;
    onPress: () => void;
    btnStyle: any,
    titleStylee: any
}

const AppButton = (props: IAppButton) => {
    return (
        <TouchableOpacity style={[props.btnStyle, { opacity: props.isLoading ? 0.4 : 1 }]} onPress={props.onPress}>
            {props.isLoading ? <ActivityIndicator animating={true} size="small" color="#FFFFFF" /> :
                <Text style={props.titleStylee}>{props.buttonTitle}</Text>
            }
        </TouchableOpacity>
    )
}

export default AppButton;