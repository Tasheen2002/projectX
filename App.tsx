import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import TaskScreen from '../screens/TaskScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import {colors} from '../theme/color';

export type RootStackParamList = {
  Welcome: undefined;
  Tasks: undefined;
  CreateTask: undefined;
  EditTask: {taskId: string};
  TaskDetail: {taskId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tasks"
        component={TaskScreen}
        options={{title: 'My Tasks'}}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{title: 'Create New Task'}}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTaskScreen}
        options={{title: 'Edit Task'}}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{title: 'Task Details'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
