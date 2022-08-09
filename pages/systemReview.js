import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";

export default function SystemReview() {
  const [appState, setAppState] = useAppContext();

  return (
    <div>
      <h1>System Review</h1>
      <h2>{JSON.stringify(appState)}</h2>
    </div>
  );
}
