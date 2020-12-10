import React, { useReducer, useState } from 'react';
import Tabs from './components/Tabs';
import AddressBar from './components/AddressBar';
import './App.css';


function reducer (state, {type, payload}) {
  const {browsers, activeBrowser} = state;
  switch (type) {
    case 'CHOOSE':
      return { 
        ...state, activeBrowser: payload 
      }      
    case 'ADD':
      return { 
        ...state, 
        browsers: [...browsers, ''],
        activeBrowser: browsers.length
      }
    case 'UPDATE':
      const newBrowsers = [...browsers];
      newBrowsers[activeBrowser] = payload;
      return { 
        ...state, browsers: newBrowsers
      } 
    case 'CLOSE':
      return { 
        ...state, ...payload 
      }  
    default:
      return state
    }
}

export default function App() {
  const [{browsers, activeBrowser}, dispatch] = useReducer(reducer, {
    browsers: [
      'https://chrome.google.com',
      'https://biryukov.netlify.app',
    ],
    activeBrowser: 0
  });
  
  const chooseBrowser = (payload) => dispatch({type: 'CHOOSE', payload});
  const addBrowser = () => dispatch({type: 'ADD'});
  const updateBrowser = (payload) => dispatch({type: 'UPDATE', payload});

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
