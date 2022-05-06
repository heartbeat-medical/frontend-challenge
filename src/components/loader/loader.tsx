import React from "react";
import "./loader.css";
type props = {
  isLoading: boolean;
};
export default function LoadingSpinner({ isLoading }: props) {
  return <>{isLoading && <div className="loading-spinner"></div>}</>;
}
