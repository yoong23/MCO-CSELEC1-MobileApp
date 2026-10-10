import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const TripContext = createContext();

const STORAGE_KEY = '@travel_trip_v3';

const EMPTY_TRIP = {
  destination: '',
  startDate: null,
  endDate: null,
  transport: '',
  itinerary: [],
  packingList: [],
};

export function TripProvider({ children }) {
  const [trip, setTrip] = useState(EMPTY_TRIP);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrip();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveTrip();
    }
  }, [trip, loading]);

  const loadTrip = async () => {
    try {
      const savedTrip =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (savedTrip) {
        const parsedTrip = JSON.parse(savedTrip);

        setTrip({
          ...EMPTY_TRIP,
          ...parsedTrip,
          startDate: parsedTrip.startDate
            ? new Date(parsedTrip.startDate)
            : null,
          endDate: parsedTrip.endDate
            ? new Date(parsedTrip.endDate)
            : null,
          itinerary: parsedTrip.itinerary || [],
          packingList: parsedTrip.packingList || [],
        });
      }
    } catch (error) {
      console.log('Error loading trip:', error);
      setTrip(EMPTY_TRIP);
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(trip)
      );
    } catch (error) {
      console.log('Error saving trip:', error);
    }
  };

  const clearTrip = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);

      setTrip(EMPTY_TRIP);
    } catch (error) {
      console.log('Error clearing trip:', error);
    }
  };

  return (
    <TripContext.Provider
      value={{
        trip,
        setTrip,
        clearTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  return useContext(TripContext);
}