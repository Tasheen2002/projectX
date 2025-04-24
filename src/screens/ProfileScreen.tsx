import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../theme/color';
import {useTask} from '../hooks/useTask';

const ProfileScreen: React.FC = () => {
  const {completedTasks, pendingTasks} = useTask();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/user.png')} // Replace with your user image path
        style={styles.profileImage}
      />
      <Text style={styles.name}>Tasheen Darshika</Text>
      <Text style={styles.details}>Email: tasheendarshika@example.com</Text>
      <Text style={styles.details}>Tasks Completed: {completedTasks.length}</Text>
      <Text style={styles.details}>Tasks Pending: {pendingTasks.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 16,
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
});

export default ProfileScreen;
