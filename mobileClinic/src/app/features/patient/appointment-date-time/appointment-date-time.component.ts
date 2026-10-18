import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-date-time',
  templateUrl: './appointment-date-time.component.html',
  styleUrls: ['./appointment-date-time.component.scss']
})
export class AppointmentDateTimeComponent implements OnInit {

  today: Date = new Date();

  minimumDate: Date = this.getTomorrow();

  displayedMonth: number;
  displayedYear: number;

  selectedDate: Date | null = null;
  selectedTime = '';

  calendarDays: (number | null)[] = [];

  availableTimes: string[] = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30'
  ];

  constructor(
    private router: Router
  ) {
    this.displayedMonth = this.minimumDate.getMonth();
    this.displayedYear = this.minimumDate.getFullYear();
  }

  ngOnInit(): void {
    this.generateCalendar();
  }


  // =====================================================
  // TOMORROW
  // =====================================================

  private getTomorrow(): Date {

    const tomorrow = new Date();

    tomorrow.setHours(0, 0, 0, 0);

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

    return tomorrow;
  }


  // =====================================================
  // MONTH NAME
  // =====================================================

  get monthName(): string {

    const date = new Date(
      this.displayedYear,
      this.displayedMonth,
      1
    );

    return date.toLocaleString(
      'en-US',
      {
        month: 'long'
      }
    );
  }


  // =====================================================
  // GENERATE CALENDAR
  // =====================================================

  generateCalendar(): void {

    this.calendarDays = [];

    const firstDay = new Date(
      this.displayedYear,
      this.displayedMonth,
      1
    );

    const daysInMonth = new Date(
      this.displayedYear,
      this.displayedMonth + 1,
      0
    ).getDate();


    /*
      JavaScript:
      Sunday = 0
      Monday = 1

      Our calendar starts Monday,
      so convert Sunday (0) to 6.
    */

    let startingDay = firstDay.getDay();

    startingDay =
      startingDay === 0
        ? 6
        : startingDay - 1;


    // Empty cells before first day

    for (
      let i = 0;
      i < startingDay;
      i++
    ) {

      this.calendarDays.push(null);

    }


    // Actual days

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {

      this.calendarDays.push(day);

    }

  }


  // =====================================================
  // CHECK IF DATE CAN BE SELECTED
  // =====================================================

  isDateSelectable(day: number): boolean {

    const date = new Date(
      this.displayedYear,
      this.displayedMonth,
      day
    );

    date.setHours(0, 0, 0, 0);

    return date >= this.minimumDate;
  }


  // =====================================================
  // CHECK SELECTED DAY
  // =====================================================

  isSelectedDay(day: number): boolean {

    if (!this.selectedDate) {
      return false;
    }

    return (
      this.selectedDate.getDate() === day &&
      this.selectedDate.getMonth() === this.displayedMonth &&
      this.selectedDate.getFullYear() === this.displayedYear
    );

  }


  // =====================================================
  // SELECT DATE
  // =====================================================

  selectDay(day: number | null): void {

    if (
      day === null ||
      !this.isDateSelectable(day)
    ) {
      return;
    }


    this.selectedDate = new Date(
      this.displayedYear,
      this.displayedMonth,
      day
    );

    this.selectedDate.setHours(
      0,
      0,
      0,
      0
    );


    // Reset previously selected time

    this.selectedTime = '';

  }


  // =====================================================
  // PREVIOUS MONTH
  // =====================================================

  previousMonth(): void {

    if (!this.canGoPrevious()) {
      return;
    }

    this.displayedMonth--;

    if (this.displayedMonth < 0) {

      this.displayedMonth = 11;

      this.displayedYear--;

    }

    this.generateCalendar();

  }


  // =====================================================
  // NEXT MONTH
  // =====================================================

  nextMonth(): void {

    this.displayedMonth++;

    if (this.displayedMonth > 11) {

      this.displayedMonth = 0;

      this.displayedYear++;

    }

    this.generateCalendar();

  }


  // =====================================================
  // PREVENT GOING BEFORE CURRENT MONTH
  // =====================================================

  canGoPrevious(): boolean {

    return !(
      this.displayedYear === this.minimumDate.getFullYear() &&
      this.displayedMonth === this.minimumDate.getMonth()
    );

  }


  // =====================================================
  // SELECT TIME
  // =====================================================

  selectTime(time: string): void {

    if (!this.selectedDate) {
      return;
    }

    this.selectedTime = time;

  }


  // =====================================================
  // FORMATTED DATE
  // =====================================================

  get formattedSelectedDate(): string {

    if (!this.selectedDate) {
      return '';
    }

    return this.selectedDate.toLocaleDateString(
      'en-US',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    );

  }


  // =====================================================
  // CONTINUE
  // =====================================================

  continue(): void {

    if (
      !this.selectedDate ||
      !this.selectedTime
    ) {
      return;
    }


    /*
      Later we will save these values
      in AppointmentService.
    */

    console.log(
      'Selected date:',
      this.selectedDate
    );

    console.log(
      'Selected time:',
      this.selectedTime
    );


    this.router.navigate([
      '/patient/appointment-review'
    ]);

  }

}