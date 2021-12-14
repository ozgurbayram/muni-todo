import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import ThemeProvider from './src/providers/ThemeProvider';
import TodoProvider from './src/providers/TodoProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodoProvider>
        <Navigation/>
        </TodoProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}