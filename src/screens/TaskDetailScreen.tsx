import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import ButtonComponent from '../components/ButtonComponent';
import {useTask} from '../hooks/useTask';
import {colors} from '../theme/color';

type TaskDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>;
  route: RouteProp<RootStackParamList, 'TaskDetail'>;
};

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {taskId} = route.params;
  const {getTaskById, removeTask, editTask} = useTask();

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
        <ButtonComponent
          title="Go Back"
          onPress={() => navigation.navigate('Tasks')}
        />
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDeleteTask = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          removeTask(taskId);
          navigation.navigate('Tasks');
        },
        style: 'destructive',
      },
    ]);
  };

  const handleMarkAsCompleted = () => {
    editTask({
      ...task,
      status: 'completed',
    });
    // Force a re-render
    navigation.setParams({taskId: task.id});
  };

  const handleMarkInProgress = () => {
    editTask({
      ...task,
      status: 'in-progress',
    });
    // Force a re-render
    navigation.setParams({taskId: task.id});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <View
          style={[
            styles.statusBadge,
            task.status === 'completed'
              ? styles.completedBadge
              : task.status === 'in-progress'
              ? styles.inProgressBadge
              : styles.pendingBadge,
          ]}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Due Date</Text>
        <Text style={styles.date}>{formatDate(task.dueDate)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Created On</Text>
        <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {task.status === 'pending' && (
          <ButtonComponent
            title="Mark as In Progress"
            onPress={handleMarkInProgress}
            style={styles.inProgressButton}
          />
        )}
        {task.status !== 'completed' && (
          <ButtonComponent
            title="Mark as Completed"
            onPress={handleMarkAsCompleted}
            style={styles.completedButton}
          />
        )}
        <ButtonComponent
          title="Edit Task"
          onPress={() => navigation.navigate('EditTask', {taskId})}
          primary={false}
        />
        <ButtonComponent
          title="Delete Task"
          onPress={handleDeleteTask}
          style={styles.deleteButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  date: {
    fontSize: 16,
    color: colors.text,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  completedButton: {
    backgroundColor: colors.success,
  },
  inProgressButton: {
    backgroundColor: colors.info,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  completedBadge: {
    backgroundColor: colors.success + '20',
  },
  pendingBadge: {
    backgroundColor: colors.warning + '20',
  },
  inProgressBadge: {
    backgroundColor: colors.info + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
});

export default TaskDetailScreen;
