import React, { useEffect, useState } from 'react';


function addHttps (url){
  if (!url.startsWith('http') || !url.startsWith('https')){
    return `https://${url}`
  }
  return url;
}

export default function AddressBar({url, updateBrowser}) {
  const [value, setValue] = useState(url || '')
  useEffect(()=>{
    setValue(url)
  }, [url])  
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    updateBrowser(addHttps(value))
  }
  return (
    <div className="address-bar">
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange} type="text" name="url" />
      </form>
    </div>
  );
}
