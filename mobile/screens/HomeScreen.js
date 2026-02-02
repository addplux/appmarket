import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { Rocket, Hotel, School, ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
    const categories = [
        { name: 'Apps', icon: Rocket, color: '#a78bfa', slug: 'app_creator' },
        { name: 'Hotels', icon: Hotel, color: '#f472b6', slug: 'hospitality' },
        { name: 'Uni', icon: School, color: '#22d3ee', slug: 'university' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <View style={styles.heroTextContainer}>
                        <View style={styles.badge}>
                            <Zap size={12} color="#a78bfa" fill="#a78bfa30" />
                            <Text style={styles.badgeText}>BETA ACCESS</Text>
                        </View>
                        <Text style={styles.heroTitle}>
                            Global <Text style={styles.violetText}>Emerging</Text> Marketplace
                        </Text>
                        <Text style={styles.heroSubtitle}>
                            Discover and invest in the next generation of digital and physical assets.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.heroButton}
                        onPress={() => navigation.navigate('Explore')}
                    >
                        <Text style={styles.heroButtonText}>Start Exploring</Text>
                        <ArrowRight size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Strategic Categories</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoryGrid}>
                        {categories.map((cat, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.categoryCard}
                                onPress={() => navigation.navigate('Explore', { category: cat.slug })}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                                    <cat.icon size={26} color={cat.color} />
                                </View>
                                <Text style={styles.categoryName}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.trustSection}>
                    <View style={styles.trustCard}>
                        <ShieldCheck size={32} color="#4ade80" />
                        <View style={styles.trustInfo}>
                            <Text style={styles.trustTitle}>Verified Opportunities</Text>
                            <Text style={styles.trustText}>All listings are hand-picked and verified for quality.</Text>
                        </View>
                    </View>
                    <View style={styles.trustCard}>
                        <TrendingUp size={32} color="#a78bfa" />
                        <View style={styles.trustInfo}>
                            <Text style={styles.trustTitle}>Direct ROI Tracking</Text>
                            <Text style={styles.trustText}>Monitor your interests and leads directly from your app.</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Ready to scale?</Text>
                    <TouchableOpacity style={styles.footerLink}>
                        <Text style={styles.footerLinkText}>Join as Creator</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
    },
    hero: {
        padding: 24,
        paddingTop: 40,
        backgroundColor: '#0f172a',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#1e293b',
    },
    heroTextContainer: {
        alignItems: 'flex-start',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#a78bfa10',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 99,
        gap: 6,
        marginBottom: 16,
    },
    badgeText: {
        color: '#a78bfa',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    heroTitle: {
        fontSize: 40,
        fontWeight: '900',
        color: '#f8fafc',
        lineHeight: 48,
        letterSpacing: -1,
    },
    violetText: {
        color: '#a78bfa',
    },
    heroSubtitle: {
        fontSize: 18,
        color: '#94a3b8',
        marginTop: 16,
        marginBottom: 32,
        lineHeight: 28,
    },
    heroButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7c3aed',
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 20,
        gap: 12,
        elevation: 10,
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    heroButtonText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 16,
    },
    section: {
        padding: 24,
        paddingTop: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#f8fafc',
    },
    seeAll: {
        color: '#a78bfa',
        fontWeight: '600',
        fontSize: 14,
    },
    categoryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryCard: {
        alignItems: 'center',
        width: '30%',
        backgroundColor: '#0f172a',
        padding: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    categoryName: {
        color: '#f8fafc',
        fontSize: 14,
        fontWeight: '700',
    },
    trustSection: {
        padding: 24,
        gap: 16,
    },
    trustCard: {
        flexDirection: 'row',
        backgroundColor: '#0f172a50',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#1e293b',
        alignItems: 'center',
        gap: 16,
    },
    trustInfo: {
        flex: 1,
    },
    trustTitle: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    trustText: {
        color: '#64748b',
        fontSize: 13,
        lineHeight: 18,
    },
    footer: {
        padding: 40,
        alignItems: 'center',
        gap: 12,
    },
    footerText: {
        color: '#94a3b8',
        fontSize: 14,
    },
    footerLink: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#1e293b',
        borderRadius: 99,
    },
    footerLinkText: {
        color: '#f8fafc',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
