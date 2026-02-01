import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

const MOCK_DATA = [
    { id: '1', title: 'EcoTrack', description: 'Ultimate carbon footprint tracker.', category: 'App' },
    { id: '2', title: 'Azure Heights', description: 'Luxury lodge in the nature.', category: 'Hotel' },
    { id: '3', title: 'Nova University', description: 'Tech specialized education.', category: 'Education' },
];

export default function ExploreScreen({ navigation }) {
    const [search, setSearch] = useState('');

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { id: item.id })}
        >
            <View style={styles.imagePlaceholder} />
            <View style={styles.cardContent}>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#94a3b8" />
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor="#94a3b8"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            <FlatList
                data={MOCK_DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
    },
    header: {
        padding: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    searchInput: {
        flex: 1,
        height: 48,
        color: '#f8fafc',
        marginLeft: 8,
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#0f172a',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    imagePlaceholder: {
        height: 150,
        backgroundColor: '#1e293b',
    },
    cardContent: {
        padding: 16,
    },
    cardCategory: {
        color: '#7c3aed',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    cardTitle: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDescription: {
        color: '#94a3b8',
        fontSize: 14,
    },
});
