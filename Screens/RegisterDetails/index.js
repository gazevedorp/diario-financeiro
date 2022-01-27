import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { useDataState } from '../../Store/data';
import { format } from 'date-fns';
import { parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

export default function registerDetails({ route, navigation }) {
    const { data, categorySelected, removeData } = useDataState();

    useEffect(() => {
        const temp = data.filter(item => item.month === route.params.month.month && item.year === route.params.month.year && item.category === categorySelected);
        console.log(data)
        if (temp.length === 0) {
            navigation.navigate("Home");
        }
    }, [data])

    function formatDate(value) {
        var temp = new Date(value);
        var temp2 = temp.getMonth();
        return JSON.stringify(temp2)
    }

    function formatShowDate(value) {
        const temp = parseISO(value)
        const temp2 = format(temp, "eeee, dd/MM/YYY - HH:mm", { locale: ptBR })
        return temp2
    }

    useEffect(() => {
        console.log(data)
    }, [])

    const onDeletePress = async (id) => {
        Alert.alert(
            '',
            'Tem certeza que deseja remover esse registro?',
            [
                { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
                {
                    text: 'Sim', onPress: () => removeData(id)
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={{ flexGrow: 1, padding: 20, justifyContent: "center" }}>
                {data.filter(item => item.month === route.params.month.month && item.year === route.params.month.year && item.category === categorySelected).map(item => {
                    const date = formatShowDate(item.date)
                    return (
                        <TouchableOpacity
                            onLongPress={() => onDeletePress(item.id)}
                            style={{ padding: 20, backgroundColor: "white", marginTop: 10 }} key={item.date}>
                            <Text style={{ fontSize: 16 }}>{item.description}</Text>
                            <Text style={{ fontSize: 16 }}>{date}</Text>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>R$ {parseFloat(item.value).toFixed(2)}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
};