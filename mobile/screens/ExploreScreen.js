import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { Search, Filter, Globe } from 'lucide-react-native';
import api from '../api';

export default function ExploreScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await api.get('listings/');
                // Filter only active listings
                const activeListings = response.data.filter(l => l.is_active && l.status === 'active');
                setListings(activeListings);
            } catch (err) {
                console.error('Error fetching listings:', err);
                setError('Failed to load opportunities');
            } finally {
                setIsLoading(false);
            }
        };

        fetchListings();
    }, []);

    const filteredListings = listings.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { id: item.id })}
        >
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Globe size={40} color="#1e293b" />
                    </View>
                )}
                {item.logo && (
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: item.logo }} style={styles.cardLogo} />
                    </View>
                )}
            </View>
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardCategory}>Opportunity</Text>
                    <Text style={styles.cardPrice}>
                        {item.price && parseFloat(item.price) > 0 ? `$${item.price}` : 'Free'}
                    </Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#7c3aed" />
                <Text style={styles.loadingText}>Scanning market...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#94a3b8" />
                    <TextInput
                        placeholder="Search listings..."
                        placeholderTextColor="#94a3b8"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            {error ? (
                <View style={styles.centered}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={() => setIsLoading(true)} style={styles.retryButton}>
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={filteredListings}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.centered}>
                            <Text style={styles.emptyText}>No opportunities found</Text>
                        </View>
                    }
                />
            )}
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
        padding: 20,
    },
    loadingText: {
        color: '#94a3b8',
        marginTop: 12,
        fontSize: 16,
    },
    header: {
        padding: 16,
        paddingTop: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    searchInput: {
        flex: 1,
        height: 56,
        color: '#f8fafc',
        marginLeft: 12,
        fontSize: 16,
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#0f172a',
        borderRadius: 24,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1e293b',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    imageContainer: {
        height: 180,
        backgroundColor: '#1e293b',
        relative: 'true',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0f172a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        padding: 4,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    cardLogo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    cardContent: {
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardCategory: {
        color: '#7c3aed',
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    cardPrice: {
        color: '#f8fafc',
        fontSize: 14,
        fontWeight: '800',
    },
    cardTitle: {
        color: '#f8fafc',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardDescription: {
        color: '#94a3b8',
        fontSize: 14,
        lineHeight: 20,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 16,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#7c3aed',
        borderRadius: 8,
    },
    retryText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    emptyText: {
        color: '#64748b',
        fontSize: 16,
    },
});
