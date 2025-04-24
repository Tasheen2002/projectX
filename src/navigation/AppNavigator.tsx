import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import TaskScreen from '../screens/TaskScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {colors} from '../theme/color';
import {TouchableOpacity, Image} from 'react-native';

export type RootStackParamList = {
  Welcome: undefined;
  Tasks: undefined;
  CreateTask: undefined;
  EditTask: {taskId: string};
  TaskDetail: {taskId: string};
  Profile: undefined;
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
        options={({navigation}) => ({
          title: 'My Tasks',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={require('../assets/icons/user.png')}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          ),
        })}
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
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
