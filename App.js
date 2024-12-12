import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import MemoList from './src/screens/MemoList';
import MemoEdit from './src/screens/MemoEdit';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name='MemoList'
          component={MemoList}
          options={{
            title: 'メモ一覧',
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name='MemoEdit' component={MemoEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
