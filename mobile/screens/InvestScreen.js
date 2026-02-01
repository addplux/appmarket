import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Send, DollarSign } from 'lucide-react-native';

export default function InvestScreen() {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setAmount('');
            setMessage('');
        }, 3000);
    };

    if (submitted) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
                <View style={styles.successIcon}>
                    <Send size={40} color="#22c55e" />
                </View>
                <Text style={styles.successTitle}>Proposal Sent!</Text>
                <Text style={styles.successSubtitle}>The developer will be in touch with you soon regarding your investment interest.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Text style={styles.title}>Invest in Innovation</Text>
                    <Text style={styles.subtitle}>Enter your investment details below to start a partnership with a project owner.</Text>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Investment Amount ($)</Text>
                            <View style={styles.inputWrapper}>
                                <DollarSign size={20} color="#94a3b8" />
                                <TextInput
                                    placeholder="e.g. 5000"
                                    placeholderTextColor="#475569"
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={amount}
                                    onChangeText={setAmount}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Your Message</Text>
                            <TextInput
                                placeholder="Tell the developer about your interest..."
                                placeholderTextColor="#475569"
                                style={[styles.input, styles.textArea]}
                                multiline
                                numberOfLines={6}
                                value={message}
                                onChangeText={setMessage}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Submit Proposal</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
    },
    scroll: {
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        marginBottom: 32,
        lineHeight: 22,
    },
    form: {
        gap: 24,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: '#e2e8f0',
        fontSize: 14,
        fontWeight: '600',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    input: {
        flex: 1,
        height: 52,
        color: '#f8fafc',
        marginLeft: 8,
        fontSize: 16,
    },
    textArea: {
        height: 150,
        paddingTop: 12,
        textAlignVertical: 'top',
        backgroundColor: '#0f172a',
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#1e293b',
        color: '#f8fafc',
    },
    button: {
        backgroundColor: '#7c3aed',
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#22c55e20',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 12,
    },
    successSubtitle: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 24,
    },
});
