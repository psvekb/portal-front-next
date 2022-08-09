import React, { useState } from "react";
import { useRouter } from "next/router";
import { AppWrapper, useAppContext } from "../context/AppContext";

export default function SystemRequirement() {
  const router = useRouter();
  const [appState, setAppState] = useAppContext();
  const [upsFamily, setUpsFamily] = useState("E3M");
  const [upsFullPower, setUpsFullPower] = useState("100");
  const [loadPowerFactor, setUpsPowerFactor] = useState("1");
  const [batteryRuntime, setRequestedTime] = useState("5");

  function handleSubmit(event) {
    event.preventDefault();

    setAppState({
      ...appState,
      upsFamily: upsFamily,
      upsFullPower: +upsFullPower,
      loadPowerFactor: +loadPowerFactor,
      batteryRuntime: +batteryRuntime,
    });

    router.push("/systemReview");
  }

  function handleSetUpsFamily(event) {
    console.log("ups select", event.target.value);
    setUpsFamily(event.target.value);
  }
  function handleSetUpsFullPower(event) {
    console.log("ups power select", event.target.value);
    setUpsFullPower(event.target.value);
  }
  function handleSetPowerFactor(event) {
    console.log("ups power select", event.target.value);
    setUpsPowerFactor(event.target.value);
  }
  function handleSetRequestedTime(event) {
    console.log("ups power select", event.target.value);
    setRequestedTime(event.target.value);
  }

  return (
    <div>
      <h1> UPS System requrement</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <h2>UPS</h2>
        <div>
          Select UPS Family{" "}
          <select onChange={handleSetUpsFamily}>
            <option value="E3M"> E3M </option>
            <option value="E3L"> E3L </option>
          </select>
          {" " + upsFamily + "   "}
        </div>
        <div>
          Set full power in kVA
          <input
            type="text"
            onChange={handleSetUpsFullPower}
            required
            size="5"
            value={upsFullPower}
          />
          {" kVA " + upsFullPower}
        </div>
        <div>
          {" "}
          {/* make  chekbox*/}
          Set power factor
          <input
            type="text"
            onChange={handleSetPowerFactor}
            required
            size="3"
            value={loadPowerFactor}
          />
          {" [0.6 .. 1.0] " + loadPowerFactor}
        </div>
        <div>
          Redundancy
          <input type="text" onChange={() => 0} disabled />
          {" N " + 0}
        </div>
        <div>
          Voltage
          <input type="text" onChange={() => 0} disabled />
          {"3:3 400 V:400 V " + 0}
        </div>
        <div>
          System Bypass
          <input type="checkbox" onChange={() => 0} disabled />
          {"None "}
        </div>
        <div>
          Network Card
          <input type="checkbox" onChange={() => 0} disabled />
          {"None "}
          Dry Contact Card
          <input type="checkbox" onChange={() => 0} disabled />
          {"None "}
          Parallel Card
          <input type="checkbox" onChange={() => 0} disabled />
          {"None "}
        </div>
        <hr />
        <h2>Battery</h2>
        <div>
          Set actual load percentage
          <input
            type="text"
            onChange={() => 0}
            disabled
            value={"100"}
            size="5"
          />
          {" 100% "}
          what is actual load {upsFullPower * loadPowerFactor} kW
        </div>
        <div>
          Set requsted time in minutes
          <input
            type="text"
            onChange={handleSetRequestedTime}
            required
            size="5"
            value={batteryRuntime}
          />
          {" min " + batteryRuntime}
        </div>
        <hr />
        <h2>Environment</h2>
        <div>
          Ingress Protection{" "}
          <input
            type="text"
            onChange={() => 0}
            disabled
            size="5"
            value="IP20"
          />
        </div>
        <hr />
        <div>
          <button /*onClick={handleSubmit}*/>Submit</button>
        </div>
      </form>
    </div>
  );
}
