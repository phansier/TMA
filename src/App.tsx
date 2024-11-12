import { ReactNode, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css'

interface MyComponentProps {
  children: ReactNode;
  className: String;
}

// Custom Card Components
const Card = ({ children, className = '' }: MyComponentProps, ) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children  }: MyComponentProps) => (
  <div className="px-6 py-4 border-b border-gray-200">
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }: MyComponentProps) => (
  <h2 className={`text-xl font-semibold ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children  }: MyComponentProps) => (
  <div className="px-6 py-4">
    {children}
  </div>
);

// Custom SVG Icons
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const CoffeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="2" x2="6" y2="4"/>
    <line x1="10" y1="2" x2="10" y2="4"/>
    <line x1="14" y1="2" x2="14" y2="4"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const CoffeeTrackerApp = () => {
  const [todayCount, setTodayCount] = useState(0);
  const [weeklyData, setWeeklyData] = useState([{ date:"", cups:0 }]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const initialData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        cups: Math.floor(Math.random() * 5)
      };
    }).reverse();
    setWeeklyData(initialData);
  }, []);

  const handleIncrement = () => {
    setTodayCount(prev => prev + 1);
    const newData = [...weeklyData];
    newData[newData.length - 1].cups = todayCount + 1;
    setWeeklyData(newData);
  };

  const handleDecrement = () => {
    if (todayCount > 0) {
      setTodayCount(prev => prev - 1);
      const newData = [...weeklyData];
      newData[newData.length - 1].cups = todayCount - 1;
      setWeeklyData(newData);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {/* Main Counter */}
      <Card className="w-full max-w-md mb-4">
        <CardHeader className="">
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <span className="text-blue-500"><CoffeeIcon /></span>
            Today's Coffee Count
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleDecrement}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={todayCount === 0}
            >
              <span className="text-blue-500"><MinusIcon /></span>
            </button>
            <span className="text-4xl font-bold text-blue-500">{todayCount}</span>
            <button
              onClick={handleIncrement}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="text-blue-500"><PlusIcon /></span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Toggle Button */}
      <button
        onClick={() => setShowStats(!showStats)}
        className="flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        {showStats ? "Hide Stats" : "Show Stats"}
        <ChartIcon />
      </button>

      {/* Weekly Stats */}
      {showStats && (
        <Card className="w-full max-w-md">
          <CardHeader className="">
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <span className="text-blue-500"><CalendarIcon /></span>
              Weekly Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="cups" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoffeeTrackerApp;