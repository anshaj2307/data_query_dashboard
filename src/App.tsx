import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import QueryInput from './components/QueryInput';
import QueryHistory from './components/QueryHistory';
import ResultsDisplay from './components/ResultsDisplay';
import { BrainCircuit } from 'lucide-react';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <BrainCircuit size={32} className="text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Gen AI Analytics</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <QueryInput />
          <ResultsDisplay />
          <QueryHistory />
        </main>
      </div>
    </Provider>
  );
}

export default App;