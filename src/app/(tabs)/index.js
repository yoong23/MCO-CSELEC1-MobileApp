import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';
import { useTrip } from '../../context/TripContext';

export default function Home() {
  const { trip } = useTrip();

  const hasTrip = trip.destination;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, Traveler!
        </Text>

        <Text style={styles.title}>
          Ready for your next adventure?
        </Text>
      </View>

      {/* NEXT TRIP */}
      <View style={styles.tripCard}>

        <Text style={styles.cardLabel}>
          NEXT TRIP
        </Text> 

        {hasTrip ? (
          <>
            {/* DESTINATION */}
            <Text style={styles.destination}>
              {trip.destination}
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Travel Dates
              </Text>

            <Text style={styles.infoText}>
              {trip.startDate
                ? trip.startDate.toLocaleDateString()
              : 'Not set'}
            {' - '}
            {trip.endDate
              ? trip.endDate.toLocaleDateString()
              : 'Not set'}
          </Text>
        </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Transportation
             </Text>

            <Text style={styles.infoText}>
              {trip.transport || 'Not set'}
            </Text>
          </View>

            {/* ITINERARY */}
            <View style={styles.sectionBox}>

              <Text style={styles.subTitle}>
                Itinerary
              </Text>

              {trip.itinerary && trip.itinerary.length > 0 ? (
                trip.itinerary.map((item) => (
                  <View
                    key={item.id}
                    style={styles.listItem}
                  >
                    <Text style={styles.bullet}>
                      •
                    </Text>

                    <Text style={styles.listText}>
                      {item.time} - {item.name}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>
                  No itinerary added yet.
                </Text>
              )}

            </View>

            {/* PACKING LIST */}
            <View style={styles.sectionBox}>

              <Text style={styles.subTitle}>
                Packing List
              </Text>

              {trip.packingList &&
              trip.packingList.length > 0 ? (
                trip.packingList.map((item) => (
                  <View
                    key={item.id}
                    style={styles.listItem}
                  >
                    <Text style={styles.bullet}>
                      {item.checked ? '✓' : '•'}
                    </Text>

                    <Text
                      style={[
                        styles.listText,
                        item.checked &&
                          styles.checkedItem,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>
                  No packing items added yet.
                </Text>
              )}

            </View>
          </>
        ) : (
          <>
            <Text style={styles.destination}>
              🏝️ Your next adventure
            </Text>

            <Text style={styles.emptyMessage}>
              Go to My Trips to plan your next adventure.
            </Text>
          </>
        )}

      </View>

      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.actions}>

        {/* MY TRIPS */}
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/trips')}
        >
          <Text style={styles.actionIcon}>
            🧳
          </Text>

          <Text style={styles.actionText}>
            My Trips
          </Text>
        </TouchableOpacity>

        {/* EXPLORE */}
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/explore')}
        >
          <Text style={styles.actionIcon}>
            🗺️
          </Text>

          <Text style={styles.actionText}>
            Explore
          </Text>
        </TouchableOpacity>

        {/* BUDGET */}
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/budget')}
        >
          <Text style={styles.actionIcon}>
            💰
          </Text>

          <Text style={styles.actionText}>
            Budget
          </Text>
        </TouchableOpacity>

      </View>

      {/* TRAVEL TIP */}
      <View style={styles.tipCard}>

        <Text style={styles.tipTitle}>
          🌴 Travel Tip
        </Text>

        <Text style={styles.tipText}>
          Pack only what you need and always keep
          important documents safe.
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF9E8',
  },

  header: {
    backgroundColor: '#159A68',
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  greeting: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 8,
  },

  tripCard: {
    backgroundColor: '#20C7C7',
    margin: 20,
    padding: 22,
    borderRadius: 22,
  },

  cardLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  destination: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 2,
  },

  infoRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    justifyContent: 'flex-start',
  },

  infoIcon: {
    fontSize: 22,
    marginRight: 12,
  },

  infoLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  infoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  sectionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 14,
    borderRadius: 14,
    marginTop: 8,
  },

  subTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  bullet: {
    color: '#FFFFFF',
    fontSize: 15,
    marginRight: 8,
  },

  listText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },

  checkedItem: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },

  emptyText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontStyle: 'italic',
  },

  emptyMessage: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 6,
  },

  date: {
    color: '#FFFFFF',
    marginTop: 6,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#173B35',
    marginHorizontal: 20,
    marginBottom: 12,
  },

  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  actionCard: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },

  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#173B35',
  },

  tipCard: {
    backgroundColor: '#FFD447',
    margin: 20,
    padding: 18,
    borderRadius: 18,
  },

  tipTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#173B35',
    marginBottom: 6,
  },

  tipText: {
    fontSize: 14,
    color: '#173B35',
    lineHeight: 21,
  },

});