import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/color';
import { Task } from '../store/taskSlice';

interface TaskComponentProps {
  task: Task;
  onPress: (taskId: string) => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(task.id)}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={[styles.statusBadge, 
            task.status === 'completed' ? styles.completedBadge : 
            task.status === 'in-progress' ? styles.inProgressBadge : styles.pendingBadge
          ]}>
            <Text style={styles.statusText}>{task.status}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
        <Text style={styles.dueDate}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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

export default TaskComponent;