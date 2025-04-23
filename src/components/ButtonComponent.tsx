import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import {colors} from '../theme/color';

interface ButtonComponentProps extends TouchableOpacityProps {
  title: string;
  primary?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  primary = true,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        primary ? styles.primaryButton : styles.secondaryButton,
        style,
      ]}
      {...props}>
      <Text style={primary ? styles.primaryText : styles.secondaryText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primaryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ButtonComponent;
