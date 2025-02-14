export interface IVirus {
  id: string; // UUID
  name: string;
  probabilityOfInfection: number;
  probabilityOfSymptoms: number;
  probabilityOfDeath: number;
  timeOfDiseaseDays: number;
  timeOfIncubationDays: number; // in steps
  probabilityOfImmunity: number;
}
