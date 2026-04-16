import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Linking,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import { Stack } from 'expo-router';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';

export default function ContactScreen() {
  const { width } = useWindowDimensions();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);
  const layout = useMemo(() => {
    const contentMaxWidth = Math.min(width - 24, 960);

    return {
      contentMaxWidth,
      contentPadding: width >= 900 ? 28 : 20,
    };
  }, [width]);

  const handleSend = useCallback(() => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Missing Fields', 'Please fill in your name, email, and message.');
      return;
    }
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSent(true);
  }, [name, email, message]);

  const handleCall = useCallback(() => {
    void Linking.openURL('tel:+15551234567');
  }, []);

  const handleEmail = useCallback(() => {
    void Linking.openURL('mailto:hello@curbcraftdesign.com');
  }, []);

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '(555) 123-4567', onPress: handleCall },
    { icon: Mail, label: 'Email', value: 'hello@curbcraftdesign.com', onPress: handleEmail },
    { icon: MapPin, label: 'Headquarters', value: 'Austin, Texas', onPress: undefined },
    { icon: Clock, label: 'Hours', value: 'Mon-Sat: 7AM - 6PM', onPress: undefined },
  ];

  if (sent) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Contact Us' }} />
        <View style={styles.sentContainer}>
          <View style={styles.sentIconWrap}>
            <Send size={40} color={Colors.accent} />
          </View>
          <Text style={styles.sentTitle}>Message Sent!</Text>
          <Text style={styles.sentDesc}>
            Thank you for reaching out. We typically respond within 1-2 business hours.
          </Text>
          <Pressable
            style={({ pressed }) => [styles.sentBtn, pressed && { opacity: 0.85 }]}
            onPress={() => {
              setSent(false);
              setName('');
              setEmail('');
              setSubject('');
              setMessage('');
            }}
          >
            <Text style={styles.sentBtnText}>Send Another Message</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ title: 'Contact Us' }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            maxWidth: layout.contentMaxWidth,
            width: '100%',
            alignSelf: 'center',
            paddingHorizontal: layout.contentPadding,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.intro}>
          Have a question or ready to start? We would love to hear from you.
        </Text>

        <View style={styles.contactCards}>
          {contactInfo.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.contactCard,
                item.onPress != null && pressed && { opacity: 0.85 },
              ]}
              onPress={item.onPress}
              disabled={item.onPress == null}
            >
              <View style={styles.contactIconWrap}>
                <item.icon size={20} color={Colors.accent} />
              </View>
              <View style={styles.contactCardText}>
                <Text style={styles.contactLabel}>{item.label}</Text>
                <Text style={styles.contactValue}>{item.value}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.formTitle}>Send a Message</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Your Name *"
            placeholderTextColor={Colors.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email Address *"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            placeholderTextColor={Colors.textMuted}
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your message... *"
            placeholderTextColor={Colors.textMuted}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.sendBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
          onPress={handleSend}
          testID="send-contact"
        >
          <MessageSquare size={18} color={Colors.white} />
          <Text style={styles.sendBtnText}>Send Message</Text>
        </Pressable>
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
    paddingBottom: 40,
  },
  intro: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  contactCards: {
    gap: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  contactIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  contactCardText: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.textMuted,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 28,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: Colors.text,
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 14,
  },
  sendBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700' as const,
  },
  sentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  sentIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  sentTitle: {
    fontSize: 26,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 10,
  },
  sentDesc: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  sentBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  sentBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600' as const,
  },
});
