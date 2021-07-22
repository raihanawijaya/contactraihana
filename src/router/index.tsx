import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack"
import * as screen from '../screens'

const Router : FC = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="list_contact" component={screen.ListContact}
            options={{title: "List Contact"}}/>
           
            <Stack.Screen name="add_contact" component={screen.AddContact}
            options={{title: "Add Contact"}}/>

            <Stack.Screen name="update_contact" component={screen.UpdateContact}
            options={{title: "Update Contact"}}/>
        </Stack.Navigator>
    )
}

export default Router