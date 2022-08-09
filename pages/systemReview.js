import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import pnList from "../src/pnList.js";
import {
  getBatteryPowertable,
  getBatteryVariantsTable,
} from "../src/batteryCalc.js";
import {
  INDEX_E3M_START,
  INDEX_E3M_MOD_START,
  INDEX_E3L_START,
} from "../src/consts";

export default function SystemReview() {
  const [appState, setAppState] = useAppContext();
  const batteryPowerTable = getBatteryPowertable(pnList);
  const powerFromBattery = appState.upsFullPower * appState.loadPowerFactor; //*
  // (appState.actualLoadPercentage / 100);

  const batteryVariantsTable = getBatteryVariantsTable(
    batteryPowerTable,
    powerFromBattery,
    appState.batteryRuntime
  );
  // console.log(batteryVariantsTable);
  // console.log(selectUpsModel(appState));
  // showBattery(appState);

  return (
    <div>
      <h1>System Review</h1>
      <h4>{JSON.stringify(appState)}</h4>
      <h4>{JSON.stringify(selectUpsModel(appState))}</h4>
    </div>
  );
}

function selectUpsModel(appState) {
  const pnListArrayStrings = pnList.split(`\n`);
  const pnListArray = pnListArrayStrings.map((string) => string.split(";"));
  const power = appState.upsFullPower;
  const upsModel = [];
  const E3Mpower = [60, 80, 100, 120, 160, 200];
  const E3Lpower = [250, 300, 400, 500, 600];
  let upsModelIndex = 0;
  if (appState.upsFamily === "E3M") {
    upsModelIndex =
      E3Mpower.findIndex((element) => power <= element) + INDEX_E3M_START;
    console.log("upsModelIndex = ", upsModelIndex);
  } else if (appState.upsFamily === "E3L") {
    upsModelIndex =
      E3Lpower.findIndex((element) => power <= element) + INDEX_E3L_START;
    console.log("upsModelIndex = ", upsModelIndex);
  }

  return pnListArray[upsModelIndex];
}
