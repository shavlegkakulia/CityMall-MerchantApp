import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const LogoutButton = (props: any) => {
    return (
        <TouchableOpacity style={styles.logoutBtn} onPress={props.onPress}>
            <Text style={styles.btnTitle}>გამოსვლა</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    logoutBtn: {
        backgroundColor: '#E50B09',
        marginRight: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnTitle: {
        color: '#FFFFFF',
        padding: 10,
        textAlign: 'center'
    }
})



export default LogoutButton;