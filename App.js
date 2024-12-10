import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./Components/SplashScreen";
import MainScreen from "./Components/MainScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 5 seconds
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 6000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSplashVisible ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
