import React from "react";
import PagesWrapper from "./src/components/PagesWrapper";
import "./src/styles/global.css";

export const wrapPageElement = ({ element }) => {
  return <PagesWrapper element={element} />;
};