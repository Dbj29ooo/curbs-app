import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { Check, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';
import { designTypes } from '@/mocks/data';

export default function ServicesScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.headerText}>
        We offer a variety of curb designs to match your home's style and landscape needs.
      </Text>

      {designTypes.map((design, index) => (
        <View key={design.id} style={styles.card}>
          <Image
            source={design.image}
            style={styles.cardImage}
            contentFit="cover"
          />
          <View style={styles.cardBody}>
            <View style={styles.cardNumberBadge}>
              <Text style={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</Text>
            </View>
            <Text style={styles.cardTitle}>{design.title}</Text>
            <Text style={styles.cardDescription}>{design.description}</Text>
            <View style={styles.featuresList}>
              {design.features.map((feature, i) => (
                <View key={i} style={styles.featureRow}>
                  <View style={styles.checkCircle}>
                    <Check size={12} color={Colors.white} />
                  </View>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <Pressable
              style={({ pressed }) => [styles.cardCTA, pressed && { opacity: 0.85 }]}
              onPress={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/(tabs)/book');
              }}
            >
              <Text style={styles.cardCTAText}>Get Quote</Text>
              <ArrowRight size={16} color={Colors.accent} />
            </Pressable>
          </View>
        </View>
      ))}

      <View style={styles.customBanner}>
        <Text style={styles.customTitle}>Don't See What You Need?</Text>
        <Text style={styles.customDesc}>
          We create fully custom designs. Contact us to discuss your vision.
        </Text>
        <Pressable
          style={({ pressed }) => [styles.customBtn, pressed && { opacity: 0.85 }]}
          onPress={() => router.push('/contact')}
        >
          <Text style={styles.customBtnText}>Contact Us</Text>
        </Pressable>
      </View>
    </Animated.ScrollView>
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
  headerText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 20,
  },
  cardNumberBadge: {
    backgroundColor: Colors.cardAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: Colors.accent,
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
    marginBottom: 16,
  },
  featuresList: {
    gap: 8,
    marginBottom: 18,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  cardCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  cardCTAText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.accent,
  },
  customBanner: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginTop: 8,
  },
  customTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  customDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 18,
  },
  customBtn: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  customBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600' as const,
  },
});
