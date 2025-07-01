import { useState } from 'react';
import { LanguageProvider } from './components/language/LanguageProvider';

function App() {
  console.log('Step 1: App component started');
  
  try {
    const [testState] = useState('test');
    console.log('Step 2: useState working', testState);
    
    console.log('Step 3: About to render with LanguageProvider');
    
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-blue-500 p-4 overflow-auto">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">AfriWallet Debug</h1>
            <p className="text-gray-600 text-lg mb-4">Step 4: Component rendering successfully!</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-100 rounded-lg">
                <h2 className="text-lg font-semibold text-green-800 mb-2">✓ All Systems Working</h2>
                <ul className="space-y-1 text-green-700">
                  <li>• React hooks working</li>
                  <li>• LanguageProvider loading</li>
                  <li>• Tailwind CSS working</li>
                  <li>• Component rendering complete</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-100 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Debug Information</h2>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• Viewport: {window.innerWidth}x{window.innerHeight}</li>
                  <li>• User Agent: {navigator.userAgent.substring(0, 50)}...</li>
                  <li>• Language: {navigator.language}</li>
                  <li>• Time: {new Date().toLocaleTimeString()}</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-100 rounded-lg">
                <h2 className="text-lg font-semibold text-purple-800 mb-2">Ready for Development</h2>
                <p className="text-purple-700">
                  Your AfriWallet application is now ready! Switch to App.tsx, AppSimple.tsx, or AppMinimal.tsx 
                  in main.tsx to start working with the full application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LanguageProvider>
    );
  } catch (error) {
    console.error('Error in App component:', error);
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Error</h1>
          <p className="text-red-600">Something went wrong: {String(error)}</p>
        </div>
      </div>
    );
  }
}

export default App;
