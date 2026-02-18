import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type CustomerHomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: CustomerHomeScreenNavigationProp;
}

const CustomerHomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CTC Market</Text>
        <Text style={styles.slogan}>Fresh Produce, Feed Everyone</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Search for products or vendors</Text>
      </View>

      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text>Fresh Produce</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text>Bakery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text>Dairy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.events}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {/* Add event cards here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  slogan: {
    fontSize: 16,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  searchText: {
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  events: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CustomerHomeScreen;
