import React, { useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const DropdownMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>☰ Menu</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setOpen(false);
                // Handle Profile navigation
              }}
            >
              <Text style={styles.menuText}>{colorScheme == 'dark' && 'Disable Dark Mode' || 'Enable Dark Mode' }</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setOpen(false);
                // Handle Profile navigation
              }}
            >
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setOpen(false);
                router.push(`/settings/1`);
              }}
            >
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 0 : 40,
    right: 0,
    zIndex: 1000,
    margin: 8,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 120,
  },
  menuItem: {
    padding: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DropdownMenu;