
import React, { useState, useRef, useEffect } from 'react';
import { AgeResult } from './types';
import { calculateAgeDetails } from './utils/ageCalculator';
import { DateInput } from './components/DateInput';
import { ResultCard } from './components/ResultCard';
import { SunIcon, MoonIcon, CalendarIcon, ClockIcon, HeartIcon, CakeIcon } from './components/icons';

const App: React.FC = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const calculateBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-slate-900');
      document.body.classList.remove('bg-slate-50');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-slate-50');
      document.body.classList.remove('bg-slate-900');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleCalculate = () => {
    setError(null);
    setAgeResult(null);

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      setError('Please fill in all fields.');
      return;
    }

    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900) {
      setError('Please enter a valid date.');
      return;
    }
    
    const date = new Date(yearNum, monthNum - 1, dayNum);
    if (date.getFullYear() !== yearNum || date.getMonth() + 1 !== monthNum || date.getDate() !== dayNum) {
        setError('The date entered is invalid (e.g., Feb 30).');
        return;
    }
    
    if (date > new Date()) {
      setError('Date of birth cannot be in the future.');
      return;
    }

    const result = calculateAgeDetails(dayNum, monthNum, yearNum);
    setAgeResult(result);
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 transition-colors duration-300">
      <main className="w-full max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6 opacity-0 animate-fade-in-down">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Age Calculator</h1>
            <p className="text-slate-500 dark:text-slate-400">Enter your date of birth</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-yellow-300 transition-transform active:scale-90"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </header>

        <div className="bg-white dark:bg-slate-800/60 rounded-2xl shadow-lg p-6 backdrop-blur-sm opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="mb-4">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Date of Birth</span>
            <div className="flex items-center justify-between mt-2 gap-2 sm:gap-4">
              <DateInput label="Day" value={day} onChange={e => setDay(e.target.value)} placeholder="DD" maxLength={2} onComplete={() => monthRef.current?.focus()} />
              <span className="text-2xl text-slate-400 dark:text-slate-500">/</span>
              <DateInput label="Month" value={month} onChange={e => setMonth(e.target.value)} placeholder="MM" maxLength={2} ref={monthRef} onComplete={() => yearRef.current?.focus()} />
              <span className="text-2xl text-slate-400 dark:text-slate-500">/</span>
              <DateInput label="Year" value={year} onChange={e => setYear(e.target.value)} placeholder="YYYY" maxLength={4} ref={yearRef} onComplete={() => calculateBtnRef.current?.focus()} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <button
            ref={calculateBtnRef}
            onClick={handleCalculate}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-300 shadow-md transition-transform active:scale-95"
          >
            <CalendarIcon className="w-5 h-5" />
            Calculate Age
          </button>
        </div>

        {ageResult && (
          <div className="mt-8">
            <div className="bg-white dark:bg-slate-800/60 rounded-2xl shadow-lg p-6 text-center opacity-0 animate-pop-in" style={{ animationDelay: '100ms' }}>
              <span className="text-7xl font-bold text-slate-900 dark:text-white">{ageResult.years}</span>
              <p className="text-xl font-medium text-slate-700 dark:text-slate-300 mt-1">Years Old</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{`${ageResult.months} months and ${ageResult.days} days`}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <ResultCard icon={<CalendarIcon/>} value={ageResult.totalDays.toLocaleString()} label="Total Days" className="from-pink-500 to-rose-500 opacity-0 animate-pop-in" style={{ animationDelay: '200ms' }} />
              <ResultCard icon={<ClockIcon/>} value={ageResult.totalWeeks.toLocaleString()} label="Total Weeks" className="from-cyan-400 to-blue-500 opacity-0 animate-pop-in" style={{ animationDelay: '300ms' }} />
              <ResultCard icon={<HeartIcon/>} value={ageResult.totalHours.toLocaleString()} label="Total Hours" className="from-emerald-400 to-teal-500 opacity-0 animate-pop-in" style={{ animationDelay: '400ms' }} />
              <ResultCard icon={<CakeIcon/>} value={ageResult.daysUntilNextBirthday.toLocaleString()} label="Days Next Birthday" className="from-amber-400 to-orange-500 opacity-0 animate-pop-in" style={{ animationDelay: '500ms' }} />
            </div>
            
            <p className="text-center text-slate-500 dark:text-slate-400 mt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              Next birthday on {ageResult.nextBirthdayDate}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
