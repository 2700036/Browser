import React, { useState } from 'react';
import Tabs from './components/Tabs';
import AddressBar from './components/AddressBar';
import './App.css';

export default function App() {
  const [browsers, setBrowsers] = useState([
    'https://chrome.google.com',
    'https://biryukov.netlify.app',
  ]);
  const [activeBrowser, setActiveBrowser] = useState(0)

  const chooseBrowser = (i) => {
    setActiveBrowser(i)
  }

  const addBrowser = () => {
    setBrowsers(browsers=>[...browsers, ''])
    setActiveBrowser(browsers.length)
  }
  const updateBrowser = (value) => {
    const newBrowsers = [...browsers];
    newBrowsers[activeBrowser] = value
    setBrowsers(newBrowsers)
  }

  const url = browsers[activeBrowser];
  
  return (
    <div className="app">
      <div className="browser">
        <Tabs browsers={browsers} 
        active={activeBrowser}
        choose={chooseBrowser}
        add={addBrowser}
        />

        <AddressBar url={url} updateBrowser={updateBrowser}/>

        <div className="viewport">
          {url ? 
          <iframe src={url} title="Stuff" /> : <>New Tab Page</>  
        }
          
        </div>
      </div>
    </div>
  );
}
