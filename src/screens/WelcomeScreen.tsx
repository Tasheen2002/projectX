import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import ButtonComponent from '../components/ButtonComponent';
import {colors} from '../theme/color';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/placeholder.jpeg')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Task Manager</Text>
        <Text style={styles.subtitle}>
          Stay organized and manage your tasks efficiently
        </Text>
      </View>
      <View style={styles.footer}>
        <ButtonComponent
          title="Get Started"
          onPress={() => navigation.navigate('Tasks')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    width: '100%',
  },
});

export default WelcomeScreen;
