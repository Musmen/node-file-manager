import { MHz_IN_GHz, GHz_POSTFIX } from '../constants/os.constants.js';

const speedMHzToGHz = (speed) => (speed / MHz_IN_GHz).toFixed(2);
export const mapCPUsInfoToMessage = ({ model, speed }) => ({ model, clockRate: `${speedMHzToGHz(speed)} ${GHz_POSTFIX}` });