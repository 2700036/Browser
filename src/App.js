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
      const updatedBrowsers = [...browsers];
      updatedBrowsers[activeBrowser] = payload;
      return { 
        ...state, browsers: updatedBrowsers
      } 
    case 'CLOSE':
      const oldBrowsers = [...browsers];
      const newBrowsers = browsers.filter((el,i)=> i !== payload);      
      const oldUrl = oldBrowsers[activeBrowser];      
      const newActiveBrowser = activeBrowser > newBrowsers.length - 1
      ? newBrowsers.length - 1 
      : (activeBrowser > 0 ? newBrowsers.findIndex(el => el === oldUrl) : 0 )
      return { 
        ...state,
        browsers: newBrowsers,
        activeBrowser : newActiveBrowser
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
      'https://codepen.io',
      'https://scotch.io'
    ],
    activeBrowser: 0
  });
  
  const chooseBrowser = (payload) => dispatch({type: 'CHOOSE', payload});
  const addBrowser = () => dispatch({type: 'ADD'});
  const updateBrowser = (payload) => dispatch({type: 'UPDATE', payload});
  const closeBrowser = (payload) => dispatch({type: 'CLOSE', payload});

  const url = browsers[activeBrowser];  
  return (
    <div className="app">
      <div className="browser">
        <Tabs browsers={browsers} 
        active={activeBrowser}
        choose={chooseBrowser}
        add={addBrowser}
        close={closeBrowser}
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
