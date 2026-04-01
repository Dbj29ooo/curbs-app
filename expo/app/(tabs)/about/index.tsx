import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Award, Shield, Clock, Heart } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { teamMembers } from '@/mocks/data';

const values = [
  { icon: Award, title: 'Craftsmanship', desc: 'Every curb is hand-finished with meticulous attention to detail.' },
  { icon: Shield, title: 'Durability', desc: 'We use premium materials backed by our 25-year warranty.' },
  { icon: Clock, title: 'Punctuality', desc: 'On time, every time. We respect your schedule.' },
  { icon: Heart, title: 'Passion', desc: 'We genuinely love transforming properties and it shows.' },
];

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <View style={styles.heroCard}>
        <Image
          source="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=400&fit=crop"
          style={styles.heroImage}
          contentFit="cover"
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Our Story</Text>
          <Text style={styles.heroSubtitle}>Crafting curbs since 2010</Text>
        </View>
      </View>

      <View style={styles.storySection}>
        <Text style={styles.storyText}>
          CurbCraft Design was born from a simple belief: that every home deserves beautiful, lasting landscape borders. Founded in 2010 by Michael Carter, a landscape architect with a passion for precision, we started as a small team in Austin, Texas.
        </Text>
        <Text style={styles.storyText}>
          Over the past 15 years, we've grown into one of the most trusted curb design companies in the Southwest, completing over 2,500 projects across five states. Our success is built on a foundation of quality materials, skilled craftsmanship, and genuine care for every client's vision.
        </Text>
        <Text style={styles.storyText}>
          Today, our team of experienced installers brings the same dedication and artistry to every project — whether it's a simple mower edge or an elaborate flagstone border for a luxury property.
        </Text>
      </View>

      <View style={styles.valuesSection}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        <View style={styles.valuesGrid}>
          {values.map((v, i) => (
            <View key={i} style={styles.valueCard}>
              <View style={styles.valueIconWrap}>
                <v.icon size={22} color={Colors.accent} />
              </View>
              <Text style={styles.valueTitle}>{v.title}</Text>
              <Text style={styles.valueDesc}>{v.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.teamSection}>
        <Text style={styles.sectionTitle}>Meet the Team</Text>
        {teamMembers.map((member) => (
          <View key={member.id} style={styles.teamCard}>
            <Image
              source={member.image}
              style={styles.teamImage}
              contentFit="cover"
            />
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
              <Text style={styles.teamBio}>{member.bio}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Let's Work Together</Text>
        <Text style={styles.ctaDesc}>
          Ready to bring your curb vision to life? We'd love to hear from you.
        </Text>
        <Pressable
          style={({ pressed }) => [styles.ctaBtn, pressed && { opacity: 0.85 }]}
          onPress={() => router.push('/contact')}
        >
          <Text style={styles.ctaBtnText}>Get in Touch</Text>
        </Pressable>
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
    paddingBottom: 40,
  },
  heroCard: {
    height: 200,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 30, 25, 0.5)',
  },
  heroTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800' as const,
    color: Colors.white,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500' as const,
  },
  storySection: {
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 14,
  },
  storyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  valuesSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  valueCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  valueIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  valueTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  valueDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  teamSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  teamCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  teamImage: {
    width: 100,
    height: 120,
  },
  teamInfo: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  teamRole: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.accent,
    marginBottom: 6,
  },
  teamBio: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  ctaSection: {
    marginHorizontal: 20,
    marginTop: 32,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.white,
    marginBottom: 8,
  },
  ctaDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 18,
  },
  ctaBtn: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  ctaBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600' as const,
  },
});
