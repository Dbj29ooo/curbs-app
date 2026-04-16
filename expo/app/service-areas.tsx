import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Stack } from 'expo-router';
import { MapPin, ChevronDown, ChevronUp, Building2 } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { serviceAreas } from '@/mocks/data';

export default function ServiceAreasScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Service Areas' }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.headerIconWrap}>
            <MapPin size={28} color={Colors.accent} />
          </View>
          <Text style={styles.headerTitle}>Where We Work</Text>
          <Text style={styles.headerDesc}>
            We proudly serve communities across 5 states. Tap a state to see available cities.
          </Text>
        </View>

        {serviceAreas.map((area) => {
          const isExpanded = expandedId === area.id;
          return (
            <View key={area.id} style={styles.areaCard}>
              <Pressable
                style={styles.areaHeader}
                onPress={() => setExpandedId(isExpanded ? null : area.id)}
              >
                <View style={styles.areaLeft}>
                  <View style={styles.stateDot} />
                  <Text style={styles.stateName}>{area.name}</Text>
                  <View style={styles.cityCount}>
                    <Text style={styles.cityCountText}>{area.cities.length} cities</Text>
                  </View>
                </View>
                {isExpanded ? (
                  <ChevronUp size={20} color={Colors.textMuted} />
                ) : (
                  <ChevronDown size={20} color={Colors.textMuted} />
                )}
              </Pressable>
              {isExpanded && (
                <View style={styles.citiesList}>
                  {area.cities.map((city, i) => (
                    <View key={i} style={styles.cityRow}>
                      <Building2 size={14} color={Colors.textMuted} />
                      <Text style={styles.cityName}>{city}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.notListed}>
          <Text style={styles.notListedTitle}>Don’t see your area?</Text>
          <Text style={styles.notListedDesc}>
            We’re expanding! Contact us to check if we serve your location or to request service in a new area.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  headerIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  headerDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  areaCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  areaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  areaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stateDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
  },
  stateName: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  cityCount: {
    backgroundColor: Colors.cardAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  cityCountText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.textMuted,
  },
  citiesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 12,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cityName: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  notListed: {
    backgroundColor: Colors.cardAlt,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 14,
  },
  notListedTitle: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 6,
  },
  notListedDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
