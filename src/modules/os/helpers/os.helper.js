import { MHz_IN_GHz, GHz_POSTFIX, CLOCK_RATE_DECIMAL_PLACES } from '../constants/os.constants.js';

const speedMHzToGHz = (speed) => (speed / MHz_IN_GHz).toFixed(CLOCK_RATE_DECIMAL_PLACES);
export const mapCPUsInfoToMessage = ({ model, speed }) => ({ model, clockRate: `${speedMHzToGHz(speed)} ${GHz_POSTFIX}` });