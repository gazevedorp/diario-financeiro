import React, {
    useState
} from 'react';
import { View, Button, Text, TextInput, Alert, TouchableOpacity } from 'react-native';

import { useDataState } from '../../Store/data';
import ptBR from 'date-fns/locale/pt-BR';
import format from 'date-fns/format';
import { addHours, parseISO } from 'date-fns';

import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'

export default function CreateRegister({ navigation }) {
    const { categories, addData } = useDataState();

    const [category, setCategory] = useState("");
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [modal, setModal] = useState(false)
    const [date, setDate] = useState(new Date);
    const [color, setColor] = useState("#000000");

    var id = (Date.now() + Math.random()).toString(36);

    const handleSubmit = async () => {

        const monthTemp = date.getMonth();
        const yearTemp = date.getFullYear();

        if (value && category && description) {
            await addData({ id, date: date.toISOString(), month: monthTemp, year: yearTemp, description, category, value });
            navigation.navigate("Home");
        }
        else {
            Alert.alert("Preencha todos os campos!")
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "100%", padding: 20 }}>
                <TextInput
                    style={{ backgroundColor: "white", marginVertical: 20, paddingHorizontal: 15 }}
                    placeholder="Descrição"
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                />
                <Picker
                    style={{ backgroundColor: "white", marginBottom: 20 }}
                    selectedValue={category}
                    onValueChange={(itemValue) =>
                        setCategory(itemValue)}
                >
                    <Picker.Item key={0} label={"Categoria"} value={""} />
                    {categories.map(item =>
                        <Picker.Item key={item} label={item} value={item} />
                    )}
                </Picker>
                <View style={{ marginBottom: 20 }}>
                    <TouchableOpacity
                        title="Selecionar data"
                        color="#ffffff"
                        onPress={() => setModal(true)}
                        style={{ padding: 15, backgroundColor: "#ffffff" }}
                    >
                        <Text style={{ color: color }}>{format(date, "eeee, dd/MM/YYY - HH:mm", { locale: ptBR })}</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={{ backgroundColor: "white", marginBottom: 20, paddingHorizontal: 15 }}
                    placeholder="Valor"
                    keyboardType='numeric'
                    onChangeText={(text) => setValue(text)}
                    value={value}
                />
                <View style={{ marginVertical: 10 }}>
                    <Button
                        onPress={handleSubmit}
                        title="Cadastrar"
                        color="#cc6333"
                    />
                </View>
                <Button
                    onPress={() => {
                        setDescription("");
                        setValue("");
                        setCategory("");
                        setDate(new Date);
                        setColor("#000000")
                    }}
                    title="Limpar"
                    color="gray"
                />
            </View>
            <DatePicker
                modal
                title="Selecione data e horário"
                textColor="#cc6333"
                open={modal}
                date={date}
                locale='pt-br'
                onConfirm={(date) => {
                    setModal(false)
                    setDate(date)
                    setColor("#cc6333")
                }}
                onCancel={() => {
                    setModal(false)
                }}
                confirmText="Confirmar"
                cancelText="Cancelar"
            />
        </View>
    )
};