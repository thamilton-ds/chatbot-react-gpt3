import { useState } from 'react';

import './App.css';
import '@chatui/core/dist/index.css';

import ChatBoard from './Pages/CardBoard';
import Input from './Pages/Input';

function App() {
  const [apiKey, setApiKey] = useState();
  return (
    <div className="App">
      {apiKey ?
        <ChatBoard apiKey={apiKey} />:
        <Input setApiKey={setApiKey} />
      }
    </div>
  );
}

export default App;
