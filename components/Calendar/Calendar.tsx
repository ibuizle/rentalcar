"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./Calendar.module.css";

type CalendarProps = {
  value: string;
  onChange: (value: string) => void;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  for (let i = startDay - 1; i >= 0; i -= 1) {
    days.push({
      day: daysInPrevMonth - i,
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      day,
      date: new Date(year, month, day),
      isCurrentMonth: true,
    });
  }

  const nextMonthDays = 42 - days.length;

  for (let day = 1; day <= nextMonthDays; day += 1) {
    days.push({
      day,
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
    });
  }

  return days;
}

export default function Calendar({ value, onChange }: CalendarProps) {
  const selectedDate = value ? new Date(value) : null;
  const initialDate = selectedDate || new Date();

  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  const calendarRef = useRef<HTMLDivElement>(null);

  const days = getCalendarDays(currentYear, currentMonth);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function goToPreviousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
      return;
    }

    setCurrentMonth((prev) => prev - 1);
  }

  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
      return;
    }

    setCurrentMonth((prev) => prev + 1);
  }

  function selectDate(date: Date) {
    onChange(formatDate(date));
    setIsOpen(false);
  }

  return (
    <div className={styles.calendarWrapper} ref={calendarRef}>
      <button
        type="button"
        className={styles.dateButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value || "Booking date"}
      </button>

      {isOpen && (
        <div className={styles.calendar}>
          <div className={styles.header}>
            <button
              type="button"
              className={styles.arrowButton}
              onClick={goToPreviousMonth}
              aria-label="Previous month"
            >
              <FiChevronLeft />
            </button>

            <p className={styles.monthTitle}>
              {MONTHS[currentMonth]} {currentYear}
            </p>

            <button
              type="button"
              className={styles.arrowButton}
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              <FiChevronRight />
            </button>
          </div>

          <div className={styles.weekDays}>
            {WEEK_DAYS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className={styles.daysGrid}>
            {days.map(({ day, date, isCurrentMonth }) => {
              const dateValue = formatDate(date);
              const isSelected = value === dateValue;

              return (
                <button
                  key={dateValue}
                  type="button"
                  className={`${styles.dayButton} ${
                    !isCurrentMonth ? styles.otherMonth : ""
                  } ${isSelected ? styles.selectedDay : ""}`}
                  onClick={() => selectDate(date)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}