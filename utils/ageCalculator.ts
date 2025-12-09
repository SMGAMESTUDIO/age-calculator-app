
import { AgeResult } from '../types';

export const calculateAgeDetails = (day: number, month: number, year: number): AgeResult => {
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }
  
  const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;

  let nextBirthday = new Date(today.getFullYear(), month - 1, day);
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const daysUntilNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const nextBirthdayDate = nextBirthday.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    daysUntilNextBirthday,
    nextBirthdayDate,
  };
};
