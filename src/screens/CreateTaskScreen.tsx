import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { useTask } from '../hooks/useTask';
import { Task } from '../store/taskSlice';

type CreateTaskScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateTask'>;
};

const CreateTaskScreen: React.FC<CreateTaskScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '', dueDate: '' });

  const { createTask } = useTask();

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { title: '', description: '', dueDate: '' };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!dueDate.trim()) {
      newErrors.dueDate = 'Due date is required';
      isValid = false;
    } else {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(dueDate)) {
        newErrors.dueDate = 'Invalid date format. Use MM/DD/YYYY';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateTask = () => {
    if (validateInputs()) {
      const [month, day, year] = dueDate.split('/');
      const dueDateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      const newTask: Omit<Task, 'id'> = {
        title,
        description,
        dueDate: dueDateObj.toISOString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      createTask(newTask);
      navigation.navigate('Tasks');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <InputComponent
          label="Task Title"
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          error={errors.title}
        />
        <InputComponent
          label="Description"
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={styles.textarea}
          error={errors.description}
        />
        <InputComponent
          label="Due Date"
          placeholder="MM/DD/YYYY"
          value={dueDate}
          onChangeText={setDueDate}
          error={errors.dueDate}
        />
        <View style={styles.buttonContainer}>
          <ButtonComponent title="Create Task" onPress={handleCreateTask} />
          <ButtonComponent 
            title="Cancel" 
            primary={false} 
            onPress={() => navigation.goBack()} 
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  form: {
    marginTop: 16,
  },
  textarea: {
    height: 120,
    paddingTop: 12,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default CreateTaskScreen;