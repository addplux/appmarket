import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, Linking } from 'react-native';
import { Star, TrendingUp, Download, Shield, ChevronLeft, Globe, Clock, ExternalLink } from 'lucide-react-native';
import api from '../api';

export default function DetailsScreen({ route, navigation }) {
    const { id } = route.params;
    const [listing, setListing] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await api.get(`listings/${id}/`);
                setListing(response.data);
            } catch (err) {
                console.error('Error fetching listing details:', err);
                setError('Failed to load details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#7c3aed" />
            </View>
        );
    }

    if (!listing) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.errorText}>{error || 'Listing not found'}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retryButton}>
                    <Text style={styles.retryText}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
                    <ChevronLeft size={24} color="#f8fafc" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Opportunity</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                    <View style={styles.imageWrapper}>
                        {listing.image ? (
                            <Image source={{ uri: listing.image }} style={styles.heroImage} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Globe size={60} color="#1e293b" />
                            </View>
                        )}
                        {listing.logo && (
                            <View style={styles.logoOverlay}>
                                <Image source={{ uri: listing.logo }} style={styles.logoImage} />
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.badgeRow}>
                        <View style={styles.verifiedBadge}>
                            <Shield size={12} color="#7c3aed" fill="#7c3aed10" />
                            <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                        <Text style={styles.dateText}>
                            {new Date(listing.created_at).toLocaleDateString()}
                        </Text>
                    </View>

                    <Text style={styles.title}>{listing.title}</Text>
                    <Text style={styles.developer}>By {listing.owner}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Target Investment / Price</Text>
                        <Text style={styles.priceValue}>
                            {listing.price && parseFloat(listing.price) > 0 ? `$${listing.price}` : 'TBA / Contact'}
                        </Text>
                    </View>

                    <View style={styles.actionRow}>
                        {listing.external_link ? (
                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={() => Linking.openURL(listing.external_link)}
                            >
                                <ExternalLink size={20} color="#fff" />
                                <Text style={styles.primaryButtonText}>Visit Project</Text>
                            </TouchableOpacity>
                        ) : null}
                        <TouchableOpacity
                            style={listing.external_link ? styles.secondaryButton : styles.primaryButton}
                            onPress={() => navigation.navigate('Invest', { listingId: listing.id, listingTitle: listing.title })}
                        >
                            <TrendingUp size={20} color="#fff" />
                            <Text style={listing.external_link ? styles.secondaryButtonText : styles.primaryButtonText}>Invest Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {listing.screenshots && listing.screenshots.length > 0 && (
                    <View style={styles.gallerySection}>
                        <Text style={styles.sectionTitle}>Showcase</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery} snapToInterval={312} decelerationRate="fast">
                            {listing.screenshots.map((shot, i) => (
                                <View key={i} style={styles.screenshotItem}>
                                    <Image source={{ uri: shot.image }} style={styles.screenshotImage} />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{listing.description}</Text>
                </View>

                {listing.how_it_works ? (
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
                ) : null}

                {listing.features ? (
                    <View style={[styles.section, { marginBottom: 60 }]}>
                        <Text style={styles.sectionTitle}>Key Features</Text>
                        <View style={styles.featuresGrid}>
                            {listing.features.split('\n').map((feature, i) => (
                                <View key={i} style={styles.featureItem}>
                                    <View style={styles.featureDot} />
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 60,
    },
    navButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    navTitle: {
        color: '#f8fafc',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroSection: {
        width: '100%',
        padding: 16,
    },
    imageWrapper: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#0f172a',
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoOverlay: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#fff',
        padding: 6,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    logoImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    infoSection: {
        padding: 20,
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7c3aed15',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 99,
        gap: 6,
    },
    verifiedText: {
        color: '#a78bfa',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    dateText: {
        color: '#64748b',
        fontSize: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#f8fafc',
        letterSpacing: -0.5,
    },
    developer: {
        fontSize: 18,
        color: '#7c3aed',
        fontWeight: '700',
        marginTop: 4,
    },
    priceContainer: {
        marginTop: 24,
        backgroundColor: '#0f172a',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    priceLabel: {
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    priceValue: {
        color: '#f8fafc',
        fontSize: 24,
        fontWeight: 'bold',
    },
    actionRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#7c3aed',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 20,
        gap: 10,
        elevation: 8,
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 16,
    },
    secondaryButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#334155',
        backgroundColor: '#0f172a',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 20,
        gap: 10,
    },
    secondaryButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 16,
    },
    descriptionText: {
        color: '#94a3b8',
        fontSize: 16,
        lineHeight: 26,
    },
    gallerySection: {
        marginBottom: 40,
    },
    gallery: {
        paddingLeft: 20,
    },
    screenshotItem: {
        width: 300,
        aspectRatio: 16 / 9,
        backgroundColor: '#0f172a',
        borderRadius: 24,
        marginRight: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    screenshotImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    howItWorksBox: {
        backgroundColor: '#0f172a',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 16,
    },
    stepBadge: {
        width: 32,
        height: 32,
        borderRadius: 12,
        backgroundColor: '#7c3aed15',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#7c3aed30',
    },
    stepBadgeText: {
        color: '#a78bfa',
        fontWeight: 'bold',
        fontSize: 14,
    },
    stepText: {
        color: '#cbd5e1',
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
    },
    featuresGrid: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1e293b',
        gap: 12,
    },
    featureDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#7c3aed',
    },
    featureText: {
        color: '#f8fafc',
        fontSize: 15,
        fontWeight: '500',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 16,
        marginBottom: 20,
    },
    retryButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#7c3aed',
        borderRadius: 12,
    },
    retryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
