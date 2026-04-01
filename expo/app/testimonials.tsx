import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Star, MapPin, Quote } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { testimonials } from '@/mocks/data';

export default function TestimonialsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Testimonials' }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>What Our Clients Say</Text>
          <Text style={styles.headerDesc}>
            Real stories from homeowners who trusted us with their curb design.
          </Text>
        </View>

        {testimonials.map((t) => (
          <View key={t.id} style={styles.card}>
            <View style={styles.quoteWrap}>
              <Quote size={24} color={Colors.accentLight} />
            </View>
            <Text style={styles.testimonialText}>{t.text}</Text>
            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  color={i < t.rating ? Colors.star : Colors.borderLight}
                  fill={i < t.rating ? Colors.star : 'transparent'}
                />
              ))}
            </View>
            <View style={styles.authorRow}>
              <Image source={t.avatar} style={styles.avatar} contentFit="cover" />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{t.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={12} color={Colors.textMuted} />
                  <Text style={styles.locationText}>{t.location}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
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
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 6,
  },
  headerDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quoteWrap: {
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 14,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
});
