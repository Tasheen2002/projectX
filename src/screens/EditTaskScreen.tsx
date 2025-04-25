import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {useTask} from '../hooks/useTask';
import {useSelector} from 'react-redux';
import {selectTaskById} from '../store/taskSlice';
import {RootState} from '../store/store';

type EditTaskScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditTask'>;
  route: RouteProp<RootStackParamList, 'EditTask'>;
};

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({navigation, route}) => {
  const {taskId} = route.params;
  const task = useSelector((state: RootState) => selectTaskById(state, taskId));
  const {editTask} = useTask();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    if (!task) {
      Alert.alert('Error', 'Task not found');
      navigation.goBack();
      return;
    }

    setTitle(task.title);
    setDescription(task.description);

    const date = new Date(task.dueDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    setDueDate(`${month}/${day}/${year}`);
    setStatus(task.status);
  }, [task, navigation]);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {title: '', description: '', dueDate: ''};

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

  const handleUpdateTask = () => {
    if (validateInputs() && task) {
      const [month, day, year] = dueDate.split('/');
      const dueDateObj = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
      );

      const updatedTask = {
        id: taskId,
        title,
        description,
        dueDate: dueDateObj.toISOString(),
        status,
        createdAt: task.createdAt,
      };

      editTask(updatedTask);
      navigation.navigate('TaskDetail', {taskId});
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
          <ButtonComponent title="Update Task" onPress={handleUpdateTask} />
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

export default EditTaskScreen;
