import { useScreenSize } from 'react-haiku';
import React from 'react';


export const UseScreenSizeDemo = () => {
  const screenSize = useScreenSize();

  return (
    <div className="demo-container-center">
      <h1>Current Screen Size: {screenSize.toString()}</h1>
      <p>Is the screen size medium ? {screenSize.equals("md") ? "Yes" : "No"}</p>
      <p>Is the screen size less than large ? {screenSize.lessThan("lg") ? "Yes" : "No"}</p>
      <p>Is the screen size greater than small ? {screenSize.greaterThan("sm") ? "Yes" : "No"}</p>
    </div>
  );
}