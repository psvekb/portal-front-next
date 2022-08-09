import pnList from "./pnList.js";
import {
  UPS_EFFICIENCY,
  KILO,
  BATTERY_INFO_START_INDEX,
  BATTERY_INFO_END_INDEX,
  BATTERY_POWER_START_INDEX,
  BATTERY_POWER_END_INDEX,
} from "./consts";
// const UPS_EFFICIENCY = 0.94; // КПД ИБП
// const KILO = 1000;

// get from API in future
// const {
//   upsFamily,
//   upsFullPower,
//   loadPowerFactor,
//   redundancy,
//   actualLoadPercentage,
//   batteryRuntime,
//   batteryTypeAndPlacement,
//   ingressProtection,
// } = {
//   upsFamily: "E3M",
//   upsFullPower: 100, //kVA
//   loadPowerFactor: 0.8,
//   redundancy: "N",
//   actualLoadPercentage: 100, // %
//   batteryRuntime: 10, //min
//   batteryTypeAndPlacement: "racks",
//   ingressProtection: "IP20",
// };

//put from API to client in future
// const { isxNumber } = { isxNumber: "ISX001000001-001" };

// const outputArray = ["U3MUPS100KH", "BC1100", "HF12-135W-X"];
// // console.log("output Array: ", outputArray);

const getBatteryPowertable = (pnList) => {
  const pnListArrayStrings = pnList.split(`\n`);
  const pnListArray = pnListArrayStrings.map((string) => string.split(";"));
  const batteryInfoStartIndex = BATTERY_INFO_START_INDEX;
  const batteryInfoEndIndex = BATTERY_INFO_END_INDEX;
  const batteryPowerStartIndex = BATTERY_POWER_START_INDEX;
  const batteryPowerEndIndex = BATTERY_POWER_END_INDEX;

  return pnListArray
    .slice(batteryInfoStartIndex, batteryInfoEndIndex)
    .map((row) => row.slice(batteryPowerStartIndex, batteryPowerEndIndex));
};

const getMinimumBatteryLength = (
  batteryPower,
  powerFromBattery,
  batteryRuntime
) => {
  let [batteryPrice, Rslope, Scal, Expo, Cap, Volt] = batteryPower;
  for (let strings = 1; strings <= 4; strings++) {
    for (let blockInString = 36; blockInString <= 50; blockInString += 2) {
      let powerFromBlock =
        (powerFromBattery / UPS_EFFICIENCY / blockInString / strings) * KILO; //
      let time = //Peukert's law - формула Пекерта
        (
          60 *
          Scal *
          (((Cap * Volt) / powerFromBlock) ** Expo - Rslope)
        ).toFixed(2);
      if (time >= batteryRuntime) {
        // console.log(
        //   `string x bat : ${strings}x${blockInString} == time ${time} price ${(
        //     batteryPrice *
        //     strings *
        //     blockInString
        //   ).toFixed(0)} USD`
        // );

        return [strings, blockInString, batteryPrice * strings * blockInString];
      }
    }
  }

  return false;
};

const getBatteryVariantsTable = (
  batteryPowerTable,
  powerFromBattery,
  batteryRuntime
) => {
  let batteryCalculatedLengthPriceTable = [];
  for (let i = 0; i < batteryPowerTable.length; i++) {
    let batteryPower = batteryPowerTable[i];
    let search = getMinimumBatteryLength(
      batteryPower,
      powerFromBattery,
      batteryRuntime
    );
    if (search) {
      batteryCalculatedLengthPriceTable.push([i, ...search]);
    }
  }
  batteryCalculatedLengthPriceTable.sort((a, b) => a[3] - b[3]);
  return batteryCalculatedLengthPriceTable;
};

// const batteryPowerTable = getBatteryPowertable(pnList);

// const powerFromBattery =
//   upsFullPower * loadPowerFactor * (actualLoadPercentage / 100);

// console.log(getBatteryVariantsTable(batteryPowerTable, powerFromBattery));

export { getBatteryPowertable, getBatteryVariantsTable };
