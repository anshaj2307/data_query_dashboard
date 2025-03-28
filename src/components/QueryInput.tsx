import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, addToHistory, setLoading, setResults } from '../store/querySlice';
import type { RootState } from '../store/store';

const mockApiCall = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [4000, 3000, 2000, 2780, 1890, 2390],
    type: 'line',
    title: 'Monthly Revenue Trends'
  };
};

export default function QueryInput() {
  const dispatch = useDispatch();
  const { currentQuery, suggestions } = useSelector((state: RootState) => state.query);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;

    dispatch(setLoading(true));
    try {
      const results = await mockApiCall(currentQuery);
      dispatch(setResults(results));
      dispatch(addToHistory(currentQuery));
    } catch (error) {
      console.error('Error processing query:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={currentQuery}
            onChange={(e) => dispatch(setCurrentQuery(e.target.value))}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Ask any question about your data..."
            className="w-full pl-12 pr-12 py-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      {showSuggestions && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => {
                dispatch(setCurrentQuery(suggestion));
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}