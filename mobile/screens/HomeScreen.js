import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Rocket, Hotel, School, ArrowRight } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
    const categories = [
        { name: 'Apps', icon: Rocket, color: '#8b5cf6' },
        { name: 'Hotels', icon: Hotel, color: '#ec4899' },
        { name: 'Education', icon: School, color: '#06b6d4' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.hero}>
                    <Text style={styles.heroTitle}>Discover the Future of <Text style={styles.violetText}>Emerging</Text> Apps</Text>
                    <Text style={styles.heroSubtitle}>The premier marketplace for apps, hospitality and education.</Text>

                    <TouchableOpacity
                        style={styles.heroButton}
                        onPress={() => navigation.navigate('Explore')}
                    >
                        <Text style={styles.heroButtonText}>Browse Marketplace</Text>
                        <ArrowRight size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <View style={styles.categoryGrid}>
                        {categories.map((cat, i) => (
                            <TouchableOpacity key={i} style={styles.categoryCard}>
                                <View style={[styles.iconContainer, { backgroundColor: cat.color + '20' }]}>
                                    <cat.icon size={24} color={cat.color} />
                                </View>
                                <Text style={styles.categoryName}>{cat.name}</Text>
                            </TouchableOpacity>
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
    hero: {
        padding: 24,
        paddingTop: 48,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#f8fafc',
        textAlign: 'center',
        lineHeight: 42,
    },
    violetText: {
        color: '#a78bfa',
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 32,
    },
    heroButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7c3aed',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 99,
        gap: 8,
    },
    heroButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    section: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 20,
    },
    categoryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryCard: {
        alignItems: 'center',
        width: '30%',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    categoryName: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '600',
    },
});
