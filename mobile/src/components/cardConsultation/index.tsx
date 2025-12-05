import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Clock, Package } from "lucide-react-native";

export type appointmentType = "Primeira Consulta" | "Vacinação" | "Retorno" | "Check-up";
export type animalType = "pig" | "cow" | "horse" | "sheep" | "cat" | "dog";

const colorMap: Record<appointmentType, { cardBg: string }> = {
  'Primeira Consulta': {
    cardBg: '#BFB5FF'
  },
  'Vacinação': {
    cardBg: '#AAE1FF'
  },
  'Retorno': {
    cardBg: '#FF6419'
  },
  'Check-up': {
    cardBg: '#9CFF95'
  }
};

interface appointmentProps {
  patientName: string;
  tutorName: string;
  date: string;
  time: string;
  vetName: string;
  appointmentType: appointmentType;
  animalImage: any;
  onClick?: () => void;
}

export function AppointmentCard({ 
  patientName, 
  tutorName, 
  date, 
  time, 
  vetName, 
  appointmentType, 
  animalImage,
  onClick 
}: appointmentProps) {
  const colors = colorMap[appointmentType];

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.container, { backgroundColor: colors.cardBg }]}
      activeOpacity={0.8}
    >
      <View style={styles.timeContainer}>
        <View style={styles.timeCard}>
          <Clock size={16} color="#000" />
          <Text style={styles.timeText}>{date}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{patientName}</Text>
          <Text style={styles.tutorName}> / {tutorName}</Text>
        </View>
        <Text style={styles.vetName}>{vetName}</Text>
      </View>

      <View style={styles.animalContainer}>
        <View style={styles.imageWrapper}>
          <Image 
            source={animalImage} 
            style={styles.animalImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{appointmentType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 358,
    height: 122,
  },
  timeContainer: {
    flexShrink: 0,
    marginRight: 12,
    marginLeft: 8,
    alignSelf: 'center',
  },
  timeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingTop: 12,
    paddingRight: 6,
    paddingBottom: 12,
    paddingLeft: 6,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 51,
    height: 90,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
    minWidth: 0,
  },
  patientInfo: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  patientName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  tutorName: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'normal',
  },
  vetName: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  animalContainer: {
    flexShrink: 0,
    marginLeft: 4,
    marginRight: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 64,
    height: 64,
    position: 'relative',
  },
  animalImage: {
    width: '100%',
    height: '100%',
  },
  typeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 4,
    width: 101,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 4,
  },
  typeText: {
    fontSize: 11,
    color: '#000',
  },
});