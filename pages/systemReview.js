import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import pnList from "../src/pnList.js";
import {
  getBatteryPowertable,
  getBatteryVariantsTable,
} from "../src/script.js";

export default function SystemReview() {
  const [appState, setAppState] = useAppContext();
  const batteryPowerTable = getBatteryPowertable(pnList);
  const powerFromBattery = appState.upsFullPower * appState.loadPowerFactor; //*
  // (appState.actualLoadPercentage / 100);

  console.log({ getBatteryPowertable }, { getBatteryVariantsTable });

  const batteryVariantsTable = getBatteryVariantsTable(
    batteryPowerTable,
    powerFromBattery
  );
  console.log(batteryVariantsTable);
  // showBattery(appState);
  return (
    <div>
      <h1>System Review</h1>
      <h4>{JSON.stringify(appState)}</h4>
    </div>
  );
}

function showBattery(appState) {}
