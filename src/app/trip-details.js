
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTrip } from '../context/TripContext';

export default function TripDetails() {
  const { trip, loading } = useTrip();

  const formatDate = (date) => {
    if (!date) return 'Not set';

    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Loading trip details...</Text>
      </View>
    );
  }

  if (!trip.destination) {
    return (
      <View style={styles.center}>
        <Ionicons
          name="airplane-outline"
          size={55}
          color="#159A68"
        />

        <Text style={styles.emptyTitle}>No Trip Found</Text>

        <Text style={styles.emptyText}>
          Create and save a trip first.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)/trips')}
        >
          <Text style={styles.buttonText}>Plan a Trip</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={23} color="#123B35" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerLabel}>YOUR ADVENTURE</Text>
        <Text style={styles.destination}>
          🏝️ {trip.destination}
        </Text>
        <Text style={styles.headerSubtitle}>
          Your travel details at a glance
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Travel Information</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={22} color="#159A68" />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Start Date</Text>
            <Text style={styles.infoValue}>
              {formatDate(trip.startDate)}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={22} color="#159A68" />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>End Date</Text>
            <Text style={styles.infoValue}>
              {formatDate(trip.endDate)}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="car-outline" size={22} color="#159A68" />
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Transportation</Text>
            <Text style={styles.infoValue}>
              {trip.transport || 'Not set'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Itinerary</Text>

        {trip.itinerary?.length > 0 ? (
          trip.itinerary.map((item, index) => (
            <View style={styles.listRow} key={item.id || index}>
              <View style={styles.number}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>

              <View style={styles.listInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>
                  <Ionicons name="time-outline" size={13} color="#71837C" />
                  {' '}{item.time}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No activities added.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Packing List</Text>

        {trip.packingList?.length > 0 ? (
          trip.packingList.map((item, index) => (
            <View style={styles.packingRow} key={item.id || index}>
              <Ionicons
                name={item.checked ? 'checkbox' : 'square-outline'}
                size={22}
                color={item.checked ? '#159A68' : '#8A9A94'}
              />

              <Text
                style={[
                  styles.itemName,
                  item.checked && styles.checkedText,
                ]}
              >
                {item.name}
              </Text>

              <Text style={styles.statusText}>
                {item.checked ? 'Packed' : 'Not packed'}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No packing items added.</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/trips')}
      >
        <Ionicons name="create-outline" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Edit Trip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E8',
  },
  content: {
    paddingTop: 55,
    paddingBottom: 35,
  },
  center: {
    flex: 1,
    backgroundColor: '#FFF9E8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  backText: {
    color: '#123B35',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#159A68',
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 20,
    marginBottom: 20,
  },
  headerLabel: {
    color: '#DDF5EA',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  destination: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#123B35',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 13,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    color: '#8A9A94',
    fontSize: 13,
  },
  infoValue: {
    color: '#123B35',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 3,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2EF',
  },
  number: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#DDF5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: '#159A68',
    fontWeight: 'bold',
  },
  listInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: '#123B35',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  itemSubtitle: {
    color: '#71837C',
    fontSize: 13,
    marginTop: 4,
  },
  packingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2EF',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#8A9A94',
  },
  statusText: {
    color: '#8A9A94',
    fontSize: 11,
  },
  emptyTitle: {
    color: '#123B35',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
  },
  emptyText: {
    color: '#8A9A94',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#159A68',
    marginHorizontal: 20,
    marginTop: 8,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
