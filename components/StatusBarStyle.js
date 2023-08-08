import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";

const StatusBarStyle = ({ children }) => {
  const [statusBarStyle, setStatusBarStyle] = useState("default");

  useEffect(() => {
    setStatusBarStyle("dark-content");
  }, []);

  return (
    <>
      <StatusBar barStyle={statusBarStyle} />
      {children}
    </>
  );
};

export default StatusBarStyle;
