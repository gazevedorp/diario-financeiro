import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useDataState } from './Store/data';

import Home from './Screens/Home';
import CreateRegister from './Screens/CreateRegister';
import CreateCategory from './Screens/CreateCategory';
import RegisterDetails from './Screens/RegisterDetails';

const Stack = createStackNavigator();

export default function Routes() {
    const { categorySelected } = useDataState();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerTitleAlign: 'center',
                        title: 'Diário Financeiro',
                        headerTitleStyle: { fontSize: 16 },
                        headerStyle: {
                            elevation: 0,
                            shadowColor: 'transparent',
                        },
                    }}
                />
                <Stack.Screen
                    name="CreateRegister"
                    component={CreateRegister}
                    options={{
                        headerTitleAlign: 'center',
                        title: 'Cadastro de registros',
                        headerTitleStyle: { fontSize: 16 },
                        headerStyle: {
                            elevation: 0,
                            shadowColor: 'transparent',
                        },
                    }}
                />
                <Stack.Screen
                    name="CreateCategory"
                    component={CreateCategory}
                    options={{
                        headerTitleAlign: 'center',
                        title: 'Cadastro de categorias',
                        headerTitleStyle: { fontSize: 16 },
                        headerStyle: {
                            elevation: 0,
                            shadowColor: 'transparent',
                        },
                    }}
                />
                <Stack.Screen
                    name="RegisterDetails"
                    component={RegisterDetails}
                    options={{
                        headerTitleAlign: 'center',
                        title: categorySelected,
                        headerTitleStyle: { fontSize: 16 },
                        headerStyle: {
                            elevation: 0,
                            shadowColor: 'transparent',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}