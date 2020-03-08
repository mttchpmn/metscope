const aerodromeLookup = require("./aerodromeLookup");

const ISA_QNH = 1013; // hPa
const ISA_TEMP = 15; // Degrees C

const parseMetar = metar => {
  const aerodromeRegex = /(NZ[A-Z]{2})/;
  const aerodrome = metar.match(aerodromeRegex)[0];
  const aerodromeElevation = aerodromeLookup[aerodrome].elevation;

  const qnhRegex = /(Q\d{4})/;
  const qnhString = metar.match(qnhRegex)[0];
  const qnh = parseInt(qnhString.substr(1));

  const tempRegex = /(\d{2}\/\d{2})/;
  const tempString = metar.match(tempRegex)[0];
  let [temp, dp] = tempString.split("/");
  temp = parseInt(temp);
  dp = parseInt(dp);

  return { aerodromeElevation, qnh, temp, dp };
};

const computePressureAltitude = (elevation, qnh) => {
  const pressureHeightOffset = (ISA_QNH - qnh) * 30; // 30ft per hPa difference
  const pressureAltitude = elevation + pressureHeightOffset;

  return pressureAltitude;
};

const computeDensityAltitude = (pressureAltitude, temp) => {
  const isaEquivalentTemperature = Math.round(
    ISA_TEMP - (aerodromeElevation / 1000) * 1.98
  );
  const tempHeightOffset = (isaEquivalentTemperature - temp) * 120;
  const densityAltitude = pressureAltitude - tempHeightOffset;

  return densityAltitude;
};

module.exports = metar => {
  const { aerodromeElevation, qnh, temp, dp } = parseMetar(metar);
  const presAlt = computePressureAltitude(aerodromeElevation, qnh);
  const densAlt = computeDensityAltitude(presAlt, temp);

  return densAlt;
};
