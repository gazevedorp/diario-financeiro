import React, {
    useState,
    useEffect
} from 'react';
import { View, Button, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Alert, Modal, StyleSheet } from 'react-native';

import { useDataState } from '../../Store/data';

import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        margin: 20,
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 7
    },
    button: {
        margin: 5,
        width: 200,
    }
});


export default function Home({ navigation }) {
    const { categories, data, setCategorySelected, removeCategory } = useDataState();

    const [monthsName] = useState([
        { id: 0, month: "Janeiro" },
        { id: 1, month: "Fevereiro" },
        { id: 2, month: "Março" },
        { id: 3, month: "Abril" },
        { id: 4, month: "Maio" },
        { id: 5, month: "Junho" },
        { id: 6, month: "Julho" },
        { id: 7, month: "Agosto" },
        { id: 8, month: "Setembro" },
        { id: 9, month: "Outubro" },
        { id: 10, month: "Novembro" },
        { id: 11, month: "Dezembro" },
    ]);
    const [modal, setModal] = useState(false)
    const [month, setMonth] = useState([])
    const [dataTemp, setDataTemp] = useState([])

    const totalValue = data.filter(item => item.month === month.month && item.year === month.year).reduce((total, valor) => total + parseFloat(valor.value), 0);

    const getInitialDate = () => {
        console.log("entrou")

        data.map(item => {
            const temp = dataTemp.filter(itemData =>
                itemData.month === item.month &&
                itemData.year === item.year
            )
            console.log(temp.length == 0)
            if (temp.length === 0) {
                setDataTemp(oldArray => [...oldArray, { month: item.month, year: item.year }])
            }
            setMonth({ month: new Date().getMonth(), year: new Date().getFullYear() })
        })

        console.log("saiu")
    }

    useEffect(() => {
        if (data.length > 0) {
            getInitialDate();
        }
    }, [data])

    const onDeletePress = async (id) => {
        Alert.alert(
            '',
            'Tem certeza que deseja remover essa categoria e todos os seus registros?',
            [
                { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
                {
                    text: 'Sim', onPress: () => removeCategory(id)
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={{ flex: 1, width: "100%", padding: 20, paddingBottom: 0 }}>
            <View style={{ paddingBottom: 10, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {data.length > 0 &&
                    <Picker
                        style={{ backgroundColor: "white", width: "100%" }}
                        selectedValue={month}

                        onValueChange={(itemValue) =>
                            setMonth(itemValue)}
                    >
                        <Picker.Item
                            key={{ month: new Date().getMonth(), year: new Date().getFullYear() }}
                            label={`${monthsName.filter(itemMonth => itemMonth.id === new Date().getMonth()).map(itemMonth => { return itemMonth.month })}/${new Date().getFullYear()}`}
                            value={{ month: new Date().getMonth(), year: new Date().getFullYear() }} />
                        {
                            dataTemp.filter(item2 =>
                                item2.month !== new Date().getMonth() && item2.yean !== new Date().getFullYear()
                            ).sort(function (a, b) { return a.month - b.month }).sort(function (a, b) { return a.year - b.year }).map(item2 => {
                                return (
                                    <Picker.Item key={item2} label={`${monthsName.filter(itemMonth => itemMonth.id === item2.month).map(itemMonth => { return itemMonth.month })}/${item2.year}`} value={item2} />
                                )
                            }

                            )}
                    </Picker>
                }
            </View>

            <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
                {categories.map(item => {
                    var valueTemp = data.filter(itemData => itemData.month === month.month && itemData.year === month.year && itemData.category === item).reduce((total, valor) => total + parseFloat(valor.value), 0);
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (valueTemp !== 0) {
                                    setCategorySelected(item);
                                    navigation.navigate("RegisterDetails", { month });
                                }
                            }}
                            onLongPress={() => {
                                onDeletePress(item);
                            }}
                            style={{ padding: 20, backgroundColor: "white", marginTop: 10 }} key={item}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item}</Text>
                            <Text style={{ fontSize: 16 }}>Subtotal: R$ {valueTemp.toFixed(2)}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <View style={{ width: "100%", marginTop: 20, marginBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ width: "80%", height: 60, padding: 20, backgroundColor: "white", elevation: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Total: R$ {totalValue.toFixed(2)} </Text>
                </View>
                <View style={{ width: "20%", paddingLeft: 10 }}>
                    <TouchableOpacity
                        onPress={() => setModal(true)}
                        style={{ width: 60, height: 60, justifyContent: "center", alignItems: "center", borderColor: "#cc6333", borderWidth: 2, backgroundColor: "#ffffff" }}>
                        <Text style={{ fontSize: 26, color: "#cc6333" }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
            >
                <TouchableWithoutFeedback onPress={() => setModal(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modal}>
                            <View style={styles.button}>
                                <Button
                                    onPress={() => {
                                        setModal(false);
                                        navigation.navigate("CreateRegister");
                                    }}
                                    title="Adicionar registro"
                                    color="#cc6333"
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    onPress={() => {
                                        setModal(false);
                                        navigation.navigate("CreateCategory")
                                    }}
                                    title="Adicionar categoria"
                                    color="#cc6333"
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
};
