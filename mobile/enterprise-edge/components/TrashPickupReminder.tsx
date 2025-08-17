import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Calendar, Truck, Clock, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react-native';

interface TrashPickupReminderProps {
  containerStyle?: any;
}

export default function TrashPickupReminder({ containerStyle }: TrashPickupReminderProps) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Sample pickup schedule data
  const getNextPickupDate = () => {
    const today = new Date();
    const nextPickup = new Date(today);
    
    // Find next Monday or Thursday (example schedule)
    const dayOfWeek = today.getDay();
    let daysUntilNext;
    
    if (dayOfWeek <= 1) { // Sunday or Monday
      daysUntilNext = 1 - dayOfWeek;
    } else if (dayOfWeek <= 4) { // Tuesday to Thursday
      daysUntilNext = 4 - dayOfWeek;
    } else { // Friday or Saturday
      daysUntilNext = 8 - dayOfWeek;
    }
    
    nextPickup.setDate(today.getDate() + daysUntilNext);
    return nextPickup;
  };

  const getPickupSchedule = (month: number, year: number) => {
    const schedule = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      
      // Schedule pickups on Mondays (1) and Thursdays (4)
      if (dayOfWeek === 1 || dayOfWeek === 4) {
        const type = dayOfWeek === 1 ? 'General Waste' : 'Recycling';
        schedule.push({
          date: day,
          type,
          time: dayOfWeek === 1 ? '7:00 AM' : '8:00 AM',
          color: dayOfWeek === 1 ? '#F59E0B' : '#10B981',
        });
      }
    }
    
    return schedule;
  };

  const nextPickup = getNextPickupDate();
  const daysUntilPickup = Math.ceil((nextPickup.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isToday = daysUntilPickup === 0;
  const isTomorrow = daysUntilPickup === 1;

  const formatPickupDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getPickupType = (date: Date) => {
    return date.getDay() === 1 ? 'General Waste' : 'Recycling';
  };

  const getUrgencyStyle = () => {
    return { backgroundColor: '#6eafe7ff', borderColor: '#0074D9' };
  };

  const getUrgencyText = () => {
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    return `In ${daysUntilPickup} days`;
  };

  const handleCalendarOpen = () => {
    setIsCalendarVisible(true);
  };

  const handleCalendarClose = () => {
    setIsCalendarVisible(false);
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedMonth);
    if (direction === 'prev') {
      newDate.setMonth(selectedMonth.getMonth() - 1);
    } else {
      newDate.setMonth(selectedMonth.getMonth() + 1);
    }
    setSelectedMonth(newDate);
  };

  const monthSchedule = getPickupSchedule(selectedMonth.getMonth(), selectedMonth.getFullYear());
  const monthName = selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <>
      <View style={[styles.container, getUrgencyStyle(), containerStyle]}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Truck size={24} color="#71806bff" />
          </View>
          <TouchableOpacity 
            style={styles.calendarButton}
            onPress={handleCalendarOpen}
          >
            <Calendar size={20} color="#71806bff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Next Trash Pickup</Text>
          <Text style={styles.date}>{formatPickupDate(nextPickup)}</Text>
          <Text style={styles.type}>{getPickupType(nextPickup)}</Text>
          
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Clock size={16} color="#B3D9FF" />
              <Text style={styles.detailText}>7:00 AM</Text>
            </View>
            <View style={styles.detailItem}>
              <MapPin size={16} color="#B3D9FF" />
              <Text style={styles.detailText}>Curbside</Text>
            </View>
          </View>

          <View style={styles.urgencyBadge}>
            <Text style={styles.urgencyText}>{getUrgencyText()}</Text>
          </View>
        </View>
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={isCalendarVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCalendarClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCalendarClose}
            >
              <X size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Pickup Schedule</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.monthNavigation}>
            <TouchableOpacity 
              style={styles.monthButton}
              onPress={() => changeMonth('prev')}
            >
              <ChevronLeft size={24} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>{monthName}</Text>
            <TouchableOpacity 
              style={styles.monthButton}
              onPress={() => changeMonth('next')}
            >
              <ChevronRight size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scheduleList}>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.legendText}>General Waste</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendText}>Recycling</Text>
              </View>
            </View>

            {monthSchedule.map((pickup, index) => {
              const pickupDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), pickup.date);
              const isUpcoming = pickupDate >= new Date();
              
              return (
                <View key={index} style={[styles.scheduleItem, !isUpcoming && styles.pastItem]}>
                  <View style={styles.scheduleDate}>
                    <Text style={[styles.scheduleDateNumber, !isUpcoming && styles.pastText]}>
                      {pickup.date}
                    </Text>
                    <Text style={[styles.scheduleDateDay, !isUpcoming && styles.pastText]}>
                      {pickupDate.toLocaleDateString('en-US', { weekday: 'short' })}
                    </Text>
                  </View>
                  
                  <View style={styles.scheduleDetails}>
                    <View style={styles.scheduleInfo}>
                      <Text style={[styles.scheduleType, !isUpcoming && styles.pastText]}>
                        {pickup.type}
                      </Text>
                      <Text style={[styles.scheduleTime, !isUpcoming && styles.pastText]}>
                        {pickup.time}
                      </Text>
                    </View>
                    <View style={[styles.typeIndicator, { backgroundColor: pickup.color }]} />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#E6F3FF',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#B3D9FF',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#B3D9FF',
  },
  urgencyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0074D9',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  monthButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  scheduleList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
    borderRadius: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pastItem: {
    opacity: 0.6,
  },
  scheduleDate: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 48,
  },
  scheduleDateNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  scheduleDateDay: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  scheduleDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  typeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pastText: {
    color: '#9CA3AF',
  },
});