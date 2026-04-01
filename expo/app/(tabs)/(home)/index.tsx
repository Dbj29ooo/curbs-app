import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowRight, Star, MapPin, Sparkles } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';
import { designTypes, testimonials } from '@/mocks/data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const heroScale = useRef(new Animated.Value(1.1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(heroScale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, heroScale]);

  const handlePress = useCallback((route: string) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as never);
  }, [router]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.heroSection}>
          <Animated.View style={[styles.heroImageWrapper, { transform: [{ scale: heroScale }] }]}>
            <Image
              source="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop"
              style={styles.heroImage}
              contentFit="cover"
            />
          </Animated.View>
          <View style={styles.heroOverlay} />
          <Animated.View
            style={[
              styles.heroContent,
              {
                paddingTop: insets.top + 20,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.heroBadge}>
              <Sparkles size={14} color={Colors.accent} />
              <Text style={styles.heroBadgeText}>Premium Curb Design</Text>
            </View>
            <Text style={styles.heroTitle}>
              Elevate Your{'\n'}Curb Appeal
            </Text>
            <Text style={styles.heroSubtitle}>
              Custom concrete curbing that transforms{'\n'}ordinary landscapes into stunning exteriors
            </Text>
            <Pressable
              style={({ pressed }) => [styles.heroCTA, pressed && styles.ctaPressed]}
              onPress={() => handlePress('/(tabs)/book')}
              testID="hero-cta"
            >
              <Text style={styles.heroCTAText}>Get Free Estimate</Text>
              <ArrowRight size={18} color={Colors.white} />
            </Pressable>
          </Animated.View>
        </View>

        <View style={styles.statsBar}>
          {[
            { value: '2,500+', label: 'Projects' },
            { value: '15+', label: 'Years' },
            { value: '4.9', label: 'Rating' },
          ].map((stat, index) => (
            <View key={index} style={[styles.statItem, index < 2 && styles.statDivider]}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Designs</Text>
            <Pressable onPress={() => handlePress('/(tabs)/services')}>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.designScroll}
          >
            {designTypes.slice(0, 4).map((design) => (
              <Pressable
                key={design.id}
                style={({ pressed }) => [styles.designCard, pressed && styles.cardPressed]}
                onPress={() => handlePress('/(tabs)/services')}
              >
                <Image
                  source={design.image}
                  style={styles.designImage}
                  contentFit="cover"
                />
                <View style={styles.designCardContent}>
                  <Text style={styles.designCardTitle}>{design.title}</Text>
                  <Text style={styles.designCardDesc} numberOfLines={2}>
                    {design.description}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.ctaBanner}>
          <View style={styles.ctaBannerInner}>
            <Text style={styles.ctaBannerTitle}>Ready to Transform{'\n'}Your Property?</Text>
            <Text style={styles.ctaBannerDesc}>
              Schedule a free consultation and get a personalized design plan.
            </Text>
            <Pressable
              style={({ pressed }) => [styles.ctaBannerBtn, pressed && { opacity: 0.85 }]}
              onPress={() => handlePress('/(tabs)/book')}
            >
              <Text style={styles.ctaBannerBtnText}>Book Now</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Client Love</Text>
            <Pressable onPress={() => handlePress('/testimonials')}>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          {testimonials.slice(0, 2).map((t) => (
            <View key={t.id} style={styles.testimonialCard}>
              <View style={styles.testimonialHeader}>
                <Image source={t.avatar} style={styles.testimonialAvatar} contentFit="cover" />
                <View style={styles.testimonialInfo}>
                  <Text style={styles.testimonialName}>{t.name}</Text>
                  <View style={styles.testimonialLocation}>
                    <MapPin size={12} color={Colors.textMuted} />
                    <Text style={styles.testimonialLocationText}>{t.location}</Text>
                  </View>
                </View>
                <View style={styles.starsRow}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} color={Colors.star} fill={Colors.star} />
                  ))}
                </View>
              </View>
              <Text style={styles.testimonialText}>"{t.text}"</Text>
            </View>
          ))}
        </View>

        <View style={styles.newsletterSection}>
          <Text style={styles.newsletterTitle}>Stay Inspired</Text>
          <Text style={styles.newsletterDesc}>
            Get design ideas, seasonal tips, and exclusive offers delivered to your inbox.
          </Text>
          <Pressable
            style={({ pressed }) => [styles.newsletterBtn, pressed && { opacity: 0.85 }]}
            onPress={() => handlePress('/newsletter')}
          >
            <Text style={styles.newsletterBtnText}>Subscribe to Newsletter</Text>
          </Pressable>
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
  heroSection: {
    height: 420,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImageWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 30, 25, 0.55)',
  },
  heroContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
    gap: 6,
  },
  heroBadgeText: {
    color: Colors.accentLight,
    fontSize: 12,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '800' as const,
    color: Colors.white,
    lineHeight: 44,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
    marginBottom: 24,
  },
  heroCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  ctaPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  heroCTAText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700' as const,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: -24,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: Colors.borderLight,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800' as const,
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '500' as const,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.accent,
  },
  designScroll: {
    paddingRight: 20,
    gap: 14,
  },
  designCard: {
    width: SCREEN_WIDTH * 0.6,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  designImage: {
    width: '100%',
    height: 140,
  },
  designCardContent: {
    padding: 14,
  },
  designCardTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  designCardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  ctaBanner: {
    marginHorizontal: 20,
    marginTop: 32,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.primary,
  },
  ctaBannerInner: {
    padding: 28,
  },
  ctaBannerTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.white,
    lineHeight: 30,
    marginBottom: 8,
  },
  ctaBannerDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 20,
    marginBottom: 20,
  },
  ctaBannerBtn: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  ctaBannerBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700' as const,
  },
  testimonialCard: {
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
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  testimonialInfo: {
    flex: 1,
    marginLeft: 10,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  testimonialLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  testimonialLocationText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
    fontStyle: 'italic',
  },
  newsletterSection: {
    marginHorizontal: 20,
    marginTop: 32,
    backgroundColor: Colors.cardAlt,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },
  newsletterTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  newsletterDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 18,
  },
  newsletterBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  newsletterBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600' as const,
  },
});
