import React, {
    useState
} from 'react';
import { View, Button, Text, TextInput, Alert } from 'react-native';

import { useDataState } from '../../Store/data';

import { Picker } from '@react-native-picker/picker';

export default function CreateCategory({ navigation }) {
    const { categories, addCategory } = useDataState();

    const [category, setCategory] = useState("");

    const handleSubmit = async () => {
        if (category) {
            const temp = categories.filter(item => item.category === category);
            console.log(temp)
            if (temp.length === 0) {
                await addCategory(category);
                navigation.navigate("Home");
            }
            else {
                Alert.alert("Categoria já cadastrada!");
                setCategory("");
            }
        }
        else {
            Alert.alert("Preencha todos os campos!");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "100%", padding: 20 }}>
                <TextInput
                    style={{ backgroundColor: "white", marginVertical: 20, paddingHorizontal: 15 }}
                    placeholder="Nome"
                    onChangeText={(text) => setCategory(text)}
                    value={category}
                />
                <View style={{ marginVertical: 10 }}>
                    <Button
                        onPress={handleSubmit}
                        title="Cadastrar"
                        color="#cc6333"
                    />
                </View>
                <Button
                    onPress={() => { setCategory("") }}
                    title="Limpar"
                    color="gray"
                />
            </View>
        </View>
    )
};