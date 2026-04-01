import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';

export default function NewsletterScreen() {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = useCallback(() => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSubscribed(true);
  }, [email]);

  if (subscribed) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Newsletter' }} />
        <View style={styles.successContainer}>
          <View style={styles.successIconWrap}>
            <CheckCircle2 size={56} color={Colors.success} />
          </View>
          <Text style={styles.successTitle}>You're In!</Text>
          <Text style={styles.successDesc}>
            Welcome to the CurbCraft community. You'll receive design inspiration, seasonal tips, and exclusive offers in your inbox.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ title: 'Newsletter' }} />
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Mail size={36} color={Colors.accent} />
        </View>

        <Text style={styles.title}>Stay in the Loop</Text>
        <Text style={styles.desc}>
          Join thousands of homeowners who get our monthly newsletter packed with:
        </Text>

        <View style={styles.benefits}>
          {[
            'Seasonal landscaping tips',
            'New design showcases',
            'Exclusive discount offers',
            'Before & after transformations',
          ].map((benefit, i) => (
            <View key={i} style={styles.benefitRow}>
              <Sparkles size={16} color={Colors.accent} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Mail size={18} color={Colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              testID="newsletter-email"
            />
          </View>
          <Pressable
            style={({ pressed }) => [styles.subscribeBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
            onPress={handleSubscribe}
            testID="newsletter-subscribe"
          >
            <Text style={styles.subscribeBtnText}>Subscribe</Text>
          </Pressable>
        </View>

        <Text style={styles.privacy}>
          We respect your privacy. Unsubscribe anytime.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 28,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  benefits: {
    gap: 12,
    marginBottom: 32,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 8,
  },
  benefitText: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  inputContainer: {
    gap: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text,
  },
  subscribeBtn: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  subscribeBtnText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700' as const,
  },
  privacy: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 14,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successIconWrap: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 30,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  successDesc: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
