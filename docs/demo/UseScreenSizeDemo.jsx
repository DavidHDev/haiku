import { useScreenSize } from 'react-haiku';
import React from 'react';


export const UseScreenSizeDemo = () => {
  const screenSize = useScreenSize();

  return (
    <div className="demo-container-center">
      <h1>Current Screen Size: {screenSize.toString()}</h1>
      <p>Is the screen size medium ? {screenSize.eq("md") ? "Yes" : "No"}</p>
      <p>Is the screen size less than large ? {screenSize.lt("lg") ? "Yes" : "No"}</p>
      <p>Is the screen size greater than small ? {screenSize.gt("sm") ? "Yes" : "No"}</p>
      <p>Is the screen size greater than or equal to small ? {screenSize.gte("sm") ? "Yes" : "No"}</p>
      <p>Is the screen size less than or equal to small ? {screenSize.lte("sm") ? "Yes" : "No"}</p>
    </div>
  );
}