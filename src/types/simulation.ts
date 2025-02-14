export interface ISimulation {
  cityArea: number;
  outbreakSizePercent: number; // in percentage with respect to
  isStarted: boolean;
  isRunning: boolean;
  isFinished: boolean;
  population: number;
  nOfHouses: number;
  nOfOffices: number;
  nOfSchools: number;
  nOfDeath: number;
  nOfInfected: number;
  nOfInfectedSympt: number;
  nOfInfectedAsympt: number;
  nOfSusceptible: number;
  nOfExposed: number;
  nOfImmune: number;
  reset: boolean;
  isFastForwarding: boolean;
  startingDateTimeMs: number | null;
  currentStep: number;
  historyOfInfected: number[];
  historyOfSusceptible: number[];
  historyOfImmunized: number[];
  historyOfExposed: number[];
  historyOfDeaths: number[];
  maskUsagePercentage: number;
  lockDownPercentage: number;
}

export interface IWorldOptions {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
