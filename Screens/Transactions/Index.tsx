import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Index = ({navigation}:any ) => {
    return (
        <View style={{paddingHorizontal: 5}}>
            <TouchableOpacity style={style.btnTrans} onPress={() => navigation.navigate('TransactionHistory')}>
                <Text style={style.btnText}>ტრანზაქციების ისტორია</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btnVouch} onPress={() => navigation.navigate('VoucherHistory')}>
                <Text style={style.btnText}>ვაუჩერების ისტორია</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Index;

const style = StyleSheet.create({
    btnTrans: {
        width: '100%',
        height: '100%',
        maxHeight: 70,
        borderRadius: 10,
        backgroundColor: '#40ADEC',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },

    btnVouch: {
        width: '100%',
        height: '100%',
        maxHeight: 70,
        borderRadius: 10,
        backgroundColor: '#228B22',
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: 'white'
    }

})