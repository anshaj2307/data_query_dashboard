import React from 'react';
import { History, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuery } from '../store/querySlice';
import type { RootState } from '../store/store';

export default function QueryHistory() {
  const dispatch = useDispatch();
  const { queryHistory } = useSelector((state: RootState) => state.query);

  if (queryHistory.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex items-center gap-2 mb-4">
        <History size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700">Recent Queries</h2>
      </div>
      <div className="space-y-2">
        {queryHistory.map((query, index) => (
          <button
            key={index}
            className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between group"
            onClick={() => dispatch(setCurrentQuery(query))}
          >
            <span className="text-gray-700">{query}</span>
            <ArrowRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}