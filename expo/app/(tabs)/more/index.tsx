import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Phone,
  MapPin,
  MessageCircle,
  Star,
  Mail,
  ChevronRight,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import Colors from '@/constants/colors';

interface MenuItem {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  route: string;
  color: string;
}

const menuItems: MenuItem[] = [
  {
    icon: Phone,
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    route: '/contact',
    color: '#4A90D9',
  },
  {
    icon: MapPin,
    title: 'Service Areas',
    subtitle: 'See where we operate',
    route: '/service-areas',
    color: '#E67E22',
  },
  {
    icon: MessageCircle,
    title: 'Testimonials',
    subtitle: 'Hear from our happy clients',
    route: '/testimonials',
    color: '#27AE60',
  },
  {
    icon: Star,
    title: 'Reviews',
    subtitle: 'Read verified customer reviews',
    route: '/reviews',
    color: Colors.star,
  },
  {
    icon: Mail,
    title: 'Newsletter',
    subtitle: 'Subscribe for tips and offers',
    route: '/newsletter',
    color: '#8E44AD',
  },
];

export default function MoreScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerDesc}>
          Find everything you need — from contact info to customer reviews.
        </Text>
      </View>

      {menuItems.map((item, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
          onPress={() => {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push(item.route as never);
          }}
          testID={`more-${item.title.toLowerCase().replace(/\s/g, '-')}`}
        >
          <View style={[styles.menuIconWrap, { backgroundColor: item.color + '15' }]}>
            <item.icon size={22} color={item.color} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          </View>
          <ChevronRight size={20} color={Colors.textMuted} />
        </Pressable>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>CurbCraft Design Co.</Text>
        <Text style={styles.footerSub}>Transforming landscapes since 2010</Text>
      </View>
    </ScrollView>
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
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.accent,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerDesc: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  menuItemPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  menuIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  footerSub: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
  },
});
