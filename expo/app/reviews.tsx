import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Stack } from 'expo-router';
import { Star, BadgeCheck } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { reviews } from '@/mocks/data';

function RatingBreakdown() {
  const total = reviews.length;
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    counts[r.rating - 1]++;
  });

  return (
    <View style={styles.ratingCard}>
      <View style={styles.ratingLeft}>
        <Text style={styles.ratingBig}>{avgRating.toFixed(1)}</Text>
        <View style={styles.ratingStars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              color={i < Math.round(avgRating) ? Colors.star : Colors.borderLight}
              fill={i < Math.round(avgRating) ? Colors.star : 'transparent'}
            />
          ))}
        </View>
        <Text style={styles.ratingCount}>{total} reviews</Text>
      </View>
      <View style={styles.ratingBars}>
        {[5, 4, 3, 2, 1].map((n) => {
          const count = counts[n - 1];
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <View key={n} style={styles.barRow}>
              <Text style={styles.barLabel}>{n}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${pct}%` }]} />
              </View>
              <Text style={styles.barCount}>{count}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ReviewsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Reviews' }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <RatingBreakdown />

        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewInitial}>
                <Text style={styles.reviewInitialText}>{review.name[0]}</Text>
              </View>
              <View style={styles.reviewHeaderInfo}>
                <View style={styles.reviewNameRow}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  {review.verified && (
                    <BadgeCheck size={16} color={Colors.success} />
                  )}
                </View>
                <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
              </View>
            </View>
            <View style={styles.reviewStars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  color={i < review.rating ? Colors.star : Colors.borderLight}
                  fill={i < review.rating ? Colors.star : 'transparent'}
                />
              ))}
            </View>
            <Text style={styles.reviewTitle}>{review.title}</Text>
            <Text style={styles.reviewText}>{review.text}</Text>
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
  ratingCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 22,
    marginBottom: 24,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  ratingLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: Colors.borderLight,
    minWidth: 90,
  },
  ratingBig: {
    fontSize: 40,
    fontWeight: '800' as const,
    color: Colors.text,
    lineHeight: 44,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 4,
    marginBottom: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500' as const,
  },
  ratingBars: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
    gap: 5,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textMuted,
    width: 14,
    textAlign: 'center',
  },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderLight,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.star,
  },
  barCount: {
    fontSize: 12,
    color: Colors.textMuted,
    width: 16,
    textAlign: 'right',
  },
  reviewCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reviewInitialText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  reviewHeaderInfo: {
    flex: 1,
  },
  reviewNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  reviewDate: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 1,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 8,
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
});
