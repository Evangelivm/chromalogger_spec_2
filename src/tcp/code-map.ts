// export const codeMap = {
//   '0108': 'DEPTH',
//   '0110': 'HOLE_DEPTH',
//   '0112': 'BLOCK_HEIGHT',
//   '0113': 'ROP',
//   '0114': 'HOOKLOAD',
//   '0145': 'SLIPS',
//   '0144': 'ON_BOTTOM',
//   '0120': 'RPM',
//   '0130': 'FLOW',
//   '0121': 'SPP',
//   '0123': 'SPM1',
//   '0124': 'SPM2',
//   '0116': 'WOB',
//   '0118': 'TORQ',
//   '0713': 'INC',
//   '0714': 'AZM',
//   '0715': 'AZMC',
//   '0722': 'GTOT',
//   '0723': 'BTOT',
//   '0724': 'DIP',
//   '0717': 'TF',
//   '0823': 'GAM',
//   '1212': 'methaneC1',
//   '1213': 'ethaneC2',
//   '1214': 'propaneC3',
//   '1215': 'isoButaneC4I',
//   '1216': 'norButaneC4N',
//   '1217': 'isoPentaneC5I',
//   '1218': 'norPentaneC5N',
//   '1219': 'neoPentaneC5E',
//   '1220': 'isoHexaneC6I',
//   '1221': 'norHexaneC6N',
//   '1222': 'carbonDioxide',
//   '1223': 'acetylene',
//   '1224': 'spare112',
//   '1225': 'spare212',
//   '1226': 'spare312',
//   '1227': 'spare412',
//   '1228': 'spare512',
// };

// export const codeMap = {
//   '0108': { db_name: 'DEPTH', wits_name: 'Depth', unit: 'm' },
//   '0110': { db_name: 'HOLE_DEPTH', wits_name: 'Hole_Depth' },
//   '0112': { db_name: 'BLOCK_HEIGHT', wits_name: 'Block_Height' },
//   '0113': { db_name: 'ROP', wits_name: 'Rate_of_Penetration', unit: 'min/m' },
//   '0114': { db_name: 'HOOKLOAD', wits_name: 'Hook_Load', unit: 'kg' },
//   '0145': { db_name: 'SLIPS', wits_name: 'Slips' },
//   '0144': { db_name: 'ON_BOTTOM', wits_name: 'On_Bottom' },
//   '0120': { db_name: 'RPM', wits_name: 'RPM', unit: 'rpm' },
//   '0130': { db_name: 'FLOW', wits_name: 'Flow' },
//   '0121': { db_name: 'SPP', wits_name: 'SPP' },
//   '0123': { db_name: 'SPM1', wits_name: 'SPM1' },
//   '0124': { db_name: 'SPM2', wits_name: 'SPM2' },
//   '0116': { db_name: 'WOB', wits_name: 'WOB' },
//   '0118': { db_name: 'TORQ', wits_name: 'TORQ', unit: 'N.m' },
//   '0713': { db_name: 'INC', wits_name: 'INC' },
//   '0714': { db_name: 'AZM', wits_name: 'AZM' },
//   '0715': { db_name: 'AZMC', wits_name: 'AZMC' },
//   '0722': { db_name: 'GTOT', wits_name: 'GTOT' },
//   '0723': { db_name: 'BTOT', wits_name: 'BTOT' },
//   '0724': { db_name: 'DIP', wits_name: 'DIP' },
//   '0717': { db_name: 'TF', wits_name: 'TF' },
//   '0823': { db_name: 'GAM', wits_name: 'GAM' },
// };

export const codeMap = {
  /* Depth Related */
  '0108': { db_name: 'BIT_MEAS_DEPTH', wits_name: 'BIT_MEAS_DEPTH', unit: 'm' },
  '0110': {
    db_name: 'TOTAL_MEAS_DEPTH',
    wits_name: 'TOTAL_MEAS_DEPTH',
    unit: 'm',
  },
  '0138': { db_name: 'LAG_DEPTH', wits_name: 'LAG_DEPTH', unit: 'm' },

  /* Drilling Parameters */
  '0113': { db_name: 'ROP', wits_name: 'ROP', unit: 'm' },
  '0116': { db_name: 'WOB', wits_name: 'WOB', unit: 'm' },
  '0118': { db_name: 'TORQUE', wits_name: 'TORQUE', unit: 'm' },
  '0120': { db_name: 'RPM', wits_name: 'RPM', unit: 'm' },

  /* Pump Parameters */
  '0121': { db_name: 'PUMP_PRESSURE', wits_name: 'PUMP_PRESSURE', unit: 'm' },
  '0123': {
    db_name: 'PUMP_STROKE_RATE_1',
    wits_name: 'PUMP_STROKE_RATE_1',
    unit: 'm',
  },
  '0124': {
    db_name: 'PUMP_STROKE_RATE_2',
    wits_name: 'PUMP_STROKE_RATE_2',
    unit: 'm',
  },
  '0125': {
    db_name: 'PUMP_STROKE_RATE_3',
    wits_name: 'PUMP_STROKE_RATE_3',
    unit: 'm',
  },
  '0137': {
    db_name: 'TOTAL_PUMP_STROKES',
    wits_name: 'TOTAL_PUMP_STROKES',
    unit: 'm',
  },

  /* Mud Parameters */
  '0129': { db_name: 'MUD_FLOW_OUT', wits_name: 'MUD_FLOW_OUT', unit: 'm' },
  '0130': { db_name: 'MUD_FLOW_IN', wits_name: 'MUD_FLOW_IN', unit: 'm' },
  '0131': {
    db_name: 'MUD_DENSITY_OUT',
    wits_name: 'MUD_DENSITY_OUT',
    unit: 'm',
  },
  '0133': { db_name: 'MUD_TEMP_OUT', wits_name: 'MUD_TEMP_OUT', unit: 'm' },
  '0135': { db_name: 'MUD_COND_OUT', wits_name: 'MUD_COND_OUT', unit: 'm' },

  /* Mechanical */
  '0112': { db_name: 'BLOCK_POSITION', wits_name: 'BLOCK_POSITION', unit: 'm' },
  '0114': { db_name: 'HOOKLOAD', wits_name: 'HOOKLOAD', unit: 'm' },

  /* Tanks */
  '1115': {
    db_name: 'VOLUMEN_TANK_RETORNO',
    wits_name: 'VOLUMEN_TANK_RETORNO',
    unit: 'm',
  },
  '1116': {
    db_name: 'VOLUMEN_TANK_INTERMEDIO',
    wits_name: 'VOLUMEN_TANK_INTERMEDIO',
    unit: 'm',
  },
  '1117': {
    db_name: 'VOLUMEN_TANK_SUCCION',
    wits_name: 'VOLUMEN_TANK_SUCCION',
    unit: 'm',
  },
  '0127': {
    db_name: 'VOLUMEN_TANK_VIAJE',
    wits_name: 'VOLUMEN_TANK_VIAJE',
    unit: 'm',
  },
  '0141': {
    db_name: 'VOLUMEN_TANK_RESERVA',
    wits_name: 'VOLUMEN_TANK_RESERVA',
    unit: 'm',
  },

  /* Gas Measurements */
  '0140': { db_name: 'TOTAL_GAS', wits_name: 'TOTAL_GAS', unit: 'm' },
  '1212': { db_name: 'METHANE_C1', wits_name: 'METHANE_C1', unit: 'm' },
  '1213': { db_name: 'ETHANE_C2', wits_name: 'ETHANE_C2', unit: 'm' },
  '1214': { db_name: 'PROPANE_C3', wits_name: 'PROPANE_C3', unit: 'm' },
  '1215': { db_name: 'ISOBUTANE_C4I', wits_name: 'ISOBUTANE_C4I', unit: 'm' },
  '1216': { db_name: 'NOR_BUTANE_C4N', wits_name: 'NOR_BUTANE_C4N', unit: 'm' },
  '1217': {
    db_name: 'ISO_PENTANE_C5I',
    wits_name: 'ISO_PENTANE_C5I',
    unit: 'm',
  },
  '1218': { db_name: 'NOR_PENTANE', wits_name: 'NOR_PENTANE', unit: 'm' },
  '1424': { db_name: 'H2S', wits_name: 'H2S', unit: 'm' },
  '1222': { db_name: 'CARBON_DIOXIDE', wits_name: 'CARBON_DIOXIDE', unit: 'm' },
};
