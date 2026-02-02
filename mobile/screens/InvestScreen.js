import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { Send, DollarSign, ChevronLeft, AlertCircle, CheckCircle2 } from 'lucide-react-native';
import api from '../api';

export default function InvestScreen({ route, navigation }) {
    const { listingId, listingTitle } = route.params || {};
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (!amount || !message) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await api.post('interests/', {
                listing: listingId,
                message: `Investment Amount: $${amount}. ${message}`,
            });
            setIsSuccess(true);
            setTimeout(() => {
                navigation.navigate('Home');
            }, 3000);
        } catch (err) {
            console.error('Error sending interest:', err);
            setError(err.response?.data?.message || 'Failed to send interest request');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <SafeAreaView style={[styles.container, styles.center]}>
                <View style={styles.successIcon}>
                    <CheckCircle2 size={60} color="#22c55e" />
                </View>
                <Text style={styles.successTitle}>Interest Expressed!</Text>
                <Text style={styles.successSubtitle}>
                    Your interest in "{listingTitle || 'the project'}" has been sent. The owner will be notified immediately.
                </Text>
                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.homeButtonText}>Back to Dashboard</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navButton}>
                    <ChevronLeft size={24} color="#f8fafc" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Express Interest</Text>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Secure Your Spot</Text>
                    <Text style={styles.subtitle}>
                        {listingTitle ? `You are expressing interest in ${listingTitle}.` : 'Enter your investment details below to start a partnership with the project owner.'}
                    </Text>

                    {error && (
                        <View style={styles.errorBox}>
                            <AlertCircle size={20} color="#ef4444" />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Proposed Investment / Offer ($)</Text>
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
                            <Text style={styles.label}>Introduction & Proposal</Text>
                            <TextInput
                                placeholder="Introduce yourself and explain why you're interested..."
                                placeholderTextColor="#475569"
                                style={[styles.input, styles.textArea]}
                                multiline
                                numberOfLines={6}
                                value={message}
                                onChangeText={setMessage}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, isSubmitting && styles.buttonDisabled]}
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Send size={20} color="#fff" />
                                    <Text style={styles.buttonText}>Send Request</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.disclaimer}>
                            By sending this request, you agree to share your contact details with the listing owner.
                        </Text>
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
    scroll: {
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#f8fafc',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        marginBottom: 32,
        lineHeight: 24,
    },
    form: {
        gap: 24,
    },
    inputGroup: {
        gap: 12,
    },
    label: {
        color: '#e2e8f0',
        fontSize: 14,
        fontWeight: '700',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    input: {
        flex: 1,
        height: 56,
        color: '#f8fafc',
        marginLeft: 12,
        fontSize: 16,
    },
    textArea: {
        height: 180,
        paddingTop: 16,
        textAlignVertical: 'top',
        backgroundColor: '#0f172a',
        borderRadius: 20,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#1e293b',
        color: '#f8fafc',
    },
    button: {
        backgroundColor: '#7c3aed',
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        gap: 12,
        elevation: 8,
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    successIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#22c55e15',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#22c55e30',
    },
    successTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#f8fafc',
        marginBottom: 12,
        textAlign: 'center',
    },
    successSubtitle: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    homeButton: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        backgroundColor: '#0f172a',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1e293b',
    },
    homeButtonText: {
        color: '#f8fafc',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ef444410',
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
        gap: 12,
        borderWidth: 1,
        borderColor: '#ef444430',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    disclaimer: {
        color: '#475569',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        marginTop: 8,
    },
});
