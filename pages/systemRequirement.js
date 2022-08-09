import React, { useState } from "react";
import { useRouter } from "next/router";

export default function SystemRequirement() {
  const [count, setCount] = useState(0);
  const [upsFamily, setUpsFamily] = useState("E3M");
  const [upsFullPower, setUpsFullPower] = useState("0");
  const [upsPowerFactor, setUpsPowerFactor] = useState("1");
  const [requestedTime, setRequestedTime] = useState("5");
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    setCount(count + 1);
    console.log("summit pressed ", count);
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
            value={upsPowerFactor}
          />
          {" [0.6 .. 1.0] " + upsPowerFactor}
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
          what is actual load {upsFullPower * upsPowerFactor} kW
        </div>
        <div>
          Set requsted time in minutes
          <input
            type="text"
            onChange={handleSetRequestedTime}
            required
            size="5"
            value={requestedTime}
          />
          {" min " + requestedTime}
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
