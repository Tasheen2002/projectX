import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import TaskComponent from '../components/TaskComponent';
import {useTask} from '../hooks/useTask';
import {colors} from '../theme/color';
import {Task} from '../store/taskSlice';

type TaskScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Tasks'>;
};

const TaskScreen: React.FC<TaskScreenProps> = ({navigation}) => {
  const {tasks} = useTask();

  const handleTaskPress = (taskId: string) => {
    navigation.navigate('TaskDetail', {taskId});
  };

  const renderTask = ({item}: {item: Task}) => (
    <TaskComponent task={item} onPress={handleTaskPress} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateTask')}>
        <View style={styles.addButtonInner}>
          <View style={styles.addButtonIcon} />
          <View style={[styles.addButtonIcon, styles.vertical]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  listContent: {
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonInner: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  addButtonIcon: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 4,
    height: 24,
    borderRadius: 2,
    top: 0,
    left: 10,
  },
  vertical: {
    transform: [{rotate: '90deg'}],
  },
});

export default TaskScreen;
