import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Star, TrendingUp, Download, Shield, ChevronLeft } from 'lucide-react-native';

export default function DetailsScreen({ route, navigation }) {
    // In a real app, fetch by id
    const listing = {
        title: 'EcoTrack',
        description: 'EcoTrack is a revolutionary sustainability platform designed to help individuals and businesses measure, understand, and reduce their environmental impact.',
        how_it_works: '1. Connect your utility bills.\n2. We analyze patterns.\n3. Receive weekly reports.',
        rating: 4.8,
        reviews: 124,
        developer: 'DevTeam1',
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={24} color="#f8fafc" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>ET</Text>
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.title}>{listing.title}</Text>
                        <Text style={styles.developer}>{listing.developer}</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.stat}>
                                <Star size={16} color="#eab308" fill="#eab308" />
                                <Text style={styles.statText}>{listing.rating}</Text>
                            </View>
                            <View style={styles.stat}>
                                <TrendingUp size={16} color="#22c55e" />
                                <Text style={styles.statText}>12 Investors</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Download size={20} color="#fff" />
                        <Text style={styles.primaryButtonText}>Get App</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('Invest')}
                    >
                        <Shield size={20} color="#fff" />
                        <Text style={styles.secondaryButtonText}>Invest</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.gallerySection}>
                    <Text style={styles.sectionTitle}>Gallery</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
                        {[1, 2, 3].map(i => (
                            <View key={i} style={styles.screenshotPlaceholder}>
                                <Text style={styles.screenshotText}>Screenshot {i}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{listing.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How it works</Text>
                    <View style={styles.howItWorksBox}>
                        {listing.how_it_works.split('\n').map((step, i) => (
                            <View key={i} style={styles.stepRow}>
                                <View style={styles.stepBadge}>
                                    <Text style={styles.stepBadgeText}>{i + 1}</Text>
                                </View>
                                <Text style={styles.stepText}>{step.replace(/^\d\.\s/, '')}</Text>
                            </View>
                        ))}
                    </View>
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
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1e293b',
    },
    navTitle: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#020617',
    },
    headerInfo: {
        marginLeft: 16,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f8fafc',
    },
    developer: {
        fontSize: 16,
        color: '#7c3aed',
        fontWeight: '600',
        marginTop: 2,
    },
    statsRow: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 16,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '500',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    primaryButton: {
        flex: 1.5,
        backgroundColor: '#7c3aed',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 99,
        gap: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#334155',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 99,
        gap: 8,
    },
    secondaryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 16,
    },
    descriptionText: {
        color: '#94a3b8',
        fontSize: 16,
        lineHeight: 24,
    },
    gallerySection: {
        marginBottom: 32,
    },
    gallery: {
        marginLeft: -20,
        marginRight: -20,
        paddingLeft: 20,
    },
    screenshotPlaceholder: {
        width: 200,
        aspectRatio: 9 / 16,
        backgroundColor: '#0f172a',
        borderRadius: 16,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    screenshotText: {
        color: '#334155',
    },
    howItWorksBox: {
        backgroundColor: '#0f172a',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 12,
    },
    stepBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#7c3aed20',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepBadgeText: {
        color: '#a78bfa',
        fontWeight: 'bold',
        fontSize: 12,
    },
    stepText: {
        color: '#cbd5e1',
        flex: 1,
        lineHeight: 20,
    },
});
