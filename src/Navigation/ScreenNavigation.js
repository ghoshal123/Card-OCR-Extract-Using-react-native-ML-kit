import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/pages/Homepage';
import InstructionPage from '../screen/pages/InstructionPage';
import CameraScreen from '../screen/pages/Camera';
import PanScreen from '../screen/pages/PanScreen';
import PanCustomerDetails from '../screen/pages/PanDetails';


const Stack = createNativeStackNavigator();

const ScreenNavigation = () => {
    return (

        <Stack.Navigator>
            <Stack.Screen
                name="Instructions"
                component={InstructionPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CameraScreen"
                component={CameraScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PanScreen"
                component={PanScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PanDetails"
                component={PanCustomerDetails}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>
    );
};

export default ScreenNavigation;
