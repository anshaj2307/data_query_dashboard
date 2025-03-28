import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import type { RootState } from '../store/store';

export default function ResultsDisplay() {
  const { results, isLoading, error } = useSelector((state: RootState) => state.query);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg text-red-600">
        {error}
      </div>
    );
  }

  if (!results) {
    return null;
  }

  const data = results.labels.map((label: string, index: number) => ({
    name: label,
    value: results.data[index]
  }));

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{results.title}</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}