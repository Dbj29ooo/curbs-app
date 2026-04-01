import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Calendar, Clock, User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';
import { designTypes } from '@/mocks/data';

export default function BookScreen() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [selectedDesign, setSelectedDesign] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const successAnim = useRef(new Animated.Value(0)).current;

  const timeSlots = ['Morning (8-11 AM)', 'Afternoon (12-3 PM)', 'Late Afternoon (3-6 PM)'];

  const handleSubmit = useCallback(() => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSubmitted(true);
    Animated.spring(successAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 60,
      friction: 8,
    }).start();
  }, [name, email, phone, address, successAnim]);

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setSelectedDesign('');
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
    setSubmitted(false);
    successAnim.setValue(0);
  }, [successAnim]);

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Animated.View
          style={[
            styles.successContent,
            {
              opacity: successAnim,
              transform: [{ scale: successAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }],
            },
          ]}
        >
          <View style={styles.successIcon}>
            <CheckCircle size={56} color={Colors.success} />
          </View>
          <Text style={styles.successTitle}>Booking Received!</Text>
          <Text style={styles.successDesc}>
            We'll review your request and contact you within 24 hours to confirm your appointment.
          </Text>
          <Pressable
            style={({ pressed }) => [styles.successBtn, pressed && { opacity: 0.85 }]}
            onPress={resetForm}
          >
            <Text style={styles.successBtnText}>Book Another Service</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.intro}>
          Fill out the form below to schedule a free on-site consultation.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Personal Information</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <User size={18} color={Colors.textMuted} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Full Name *"
              placeholderTextColor={Colors.textMuted}
              value={name}
              onChangeText={setName}
              testID="input-name"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Mail size={18} color={Colors.textMuted} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email Address *"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              testID="input-email"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Phone size={18} color={Colors.textMuted} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number *"
              placeholderTextColor={Colors.textMuted}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              testID="input-phone"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <MapPin size={18} color={Colors.textMuted} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Property Address *"
              placeholderTextColor={Colors.textMuted}
              value={address}
              onChangeText={setAddress}
              testID="input-address"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Design Preference</Text>
          <View style={styles.designGrid}>
            {designTypes.map((d) => (
              <Pressable
                key={d.id}
                style={[
                  styles.designChip,
                  selectedDesign === d.id && styles.designChipActive,
                ]}
                onPress={() => {
                  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedDesign(d.id);
                }}
              >
                <Text
                  style={[
                    styles.designChipText,
                    selectedDesign === d.id && styles.designChipTextActive,
                  ]}
                >
                  {d.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Preferred Schedule</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Calendar size={18} color={Colors.textMuted} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Preferred Date (e.g., April 15, 2026)"
              placeholderTextColor={Colors.textMuted}
              value={preferredDate}
              onChangeText={setPreferredDate}
            />
          </View>

          <Text style={styles.timeLabel}>Preferred Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((slot) => (
              <Pressable
                key={slot}
                style={[
                  styles.timeChip,
                  preferredTime === slot && styles.timeChipActive,
                ]}
                onPress={() => {
                  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setPreferredTime(slot);
                }}
              >
                <Clock size={14} color={preferredTime === slot ? Colors.white : Colors.textMuted} />
                <Text
                  style={[
                    styles.timeChipText,
                    preferredTime === slot && styles.timeChipTextActive,
                  ]}
                >
                  {slot}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Additional Notes</Text>
          <View style={[styles.inputGroup, styles.textAreaGroup]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us about your project, measurements, or special requests..."
              placeholderTextColor={Colors.textMuted}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
          onPress={handleSubmit}
          testID="submit-booking"
        >
          <Text style={styles.submitBtnText}>Submit Booking Request</Text>
        </Pressable>

        <Text style={styles.disclaimer}>
          By submitting, you agree to be contacted about your inquiry. Free estimates with no obligation.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
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
  intro: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
    overflow: 'hidden',
  },
  inputIcon: {
    paddingLeft: 14,
    paddingRight: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 15,
    color: Colors.text,
  },
  textAreaGroup: {
    alignItems: 'flex-start',
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  designGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  designChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  designChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  designChipText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  designChipTextActive: {
    color: Colors.white,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 8,
  },
  timeGrid: {
    gap: 8,
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  timeChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeChipText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.text,
  },
  timeChipTextActive: {
    color: Colors.white,
  },
  submitBtn: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700' as const,
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 17,
  },
  successContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successContent: {
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  successDesc: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  successBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  successBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600' as const,
  },
});
