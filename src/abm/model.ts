// @ts-nocheck
import Model from "https://code.agentscript.org/src/Model.js";
import { IVirus } from "../types/virus";
import { IWorldOptions } from "../types/simulation";
import store from "../store/store";
import {
  setNumberOfInfected,
  setNumberOfInfectedAsympt,
  setNumberOfInfectedSympt,
  increaseCurrentStep,
  increaseNumberOfDeath,
  setPopulation,
  setNumberOfSusceptible,
  setNumberOfExposed,
  setNumberOfImmune,
  sendToHistory,
  setStartingDateTimeMs,
} from "../store/slices/simulationSlice";
import { getRandomArbitrary } from "./utils";
import { MINUTES_PER_STEP, ONE_DAY_IN_STEPS } from "../const";

/**
* We will set the population amounts based on the city size.
* Given world x and y -> x*y = AREA of our city
* Number of schools => AREA * 0.1
*
*
* The simulation will start on a random day, at 8.00 a.m, hence all the
* individuals will be at their own house.

Each individual could be of three breeds: adult, young or elderly. Each
of them could be susceptible, infected (symptomatic or not) or recovered (SIR model). Each of
them has different probabilities with respect to different events:
- Adults can be infected with a probability that is proportional to the VIRAL_LOAD
  of the patch where the adult go through. They have a certain probability to die by the virus.
- Elderly can be infected with a probability that is scaled (increased) wrt adults. The same 
  is for the death prob.
- Children can be infected with a probability that is scaled (increased) wrt
  adults but a death prob that is decreased.



*/
// @ts-nocheck
export default class EpidemyModel extends Model {
  outbreakSizePercentage: number = 0;
  population: number = 0;
  nOfHouses: number = 0;
  nOfOffices: number = 0;
  nOfSchools: number = 0;
  cityArea: number = 0;
  startingDateTime: Date = new Date();
  virus: IVirus;
  currentStep: number = 0;
  currentNumberOfDeaths: number = 0;
  maskUsagePercentage: number = 0;
  lockdownPercentage: number = 0;

  reduxStore = store;

  constructor(
    worldOptions: IWorldOptions,
    virus: IVirus,
    outbreakSizePercentage: number,
    /**
     * Percentage of individuals that use mask.
     * Consider that the mask is useful in reducing the GIVE of an infection,
     * but it is not a defense against it.
     */
    maskUsagePercentage: number,
    /**
     * Percentage of SYMPTOMATIC individuals that
     * will stay home in the morning.
     */
    lockDownPercentage: number
  ) {
    super(worldOptions);
    this.virus = virus;
    this.outbreakSizePercentage = outbreakSizePercentage;
    this.maskUsagePercentage = maskUsagePercentage;
    this.lockdownPercentage = lockDownPercentage;
  }

  setup() {
    this.startingDateTime = new Date();
    this.startingDateTime.setHours(8, 0, 0, 0);
    this.reduxStore.dispatch(
      setStartingDateTimeMs(this.startingDateTime.getTime())
    );
    this.patchBreeds("road house school office");
    this.turtleBreeds("young adult elderly");
    this.setupPopulation();
    this.setupPatches();
    this.setupTurtles();

    this.currentStep = 0;
    this.currentNumberOfDeaths = 0;
  }

  setupPopulation() {
    const { minX, maxX, minY, maxY } = this.world;
    this.cityArea = Math.abs(minX - maxX) * Math.abs(minY - maxY);
    this.nOfHouses = Math.floor(this.cityArea * 0.05);
    this.population = this.nOfHouses * 4;
  }

  setupPatches() {
    this.patches.ask((patch: any) => {
      patch.setBreed(this.road);
      patch.viralLoad = 0;
    });

    const nOfSchools = Math.floor(this.cityArea * 0.004);
    this.road.nOf(nOfSchools).ask((p) => {
      p.setBreed(this.school);
      p.nOfAssignedYoung = 0;
    });
    this.nOfSchools = nOfSchools;

    const nOfHouses = Math.floor(this.cityArea * 0.05);
    this.road.nOf(nOfHouses).ask((p) => {
      p.setBreed(this.house);
    });
    this.nOfHouses = nOfHouses;

    const nOfOffices = Math.floor(this.cityArea * 0.007);
    this.road.nOf(nOfOffices).ask((p: any) => {
      p.setBreed(this.office);
      p.nOfAssignedAdults = 0;
    });
    this.nOfOffices = nOfOffices;
  }

  setupTurtles() {
    this.house.ask((patch) => {
      patch.sprout(2, this.turtles, (t) => {
        t.setBreed(this.adult);
        t.age = getRandomArbitrary(30, 50);
        t.assignedHouse = patch.id;
        t.assignedOffice = null;
      });
      patch.sprout(1, this.turtles, (t) => {
        t.age = getRandomArbitrary(10, 18);
        t.setBreed(this.young);
        t.assignedHouse = patch.id;
      });
      patch.sprout(1, this.turtles, (t) => {
        t.setBreed(this.elderly);
        t.age = getRandomArbitrary(65, 100);
        t.assignedHouse = patch.id;
      });
    });

    this.turtles.ask((t) => {
      t.status = "susceptible";
      t.infectionDuration = 0;
      t.willUseMask = Math.random() < this.maskUsagePercentage;
      t.hasLockdown = Math.random() < this.lockdownPercentage;
    });
    /**
     * The outbreak is composed of asymptomatic patients
     * that could not prevent to go out and spreading the virus
     */
    const numberOfTurtles = this.turtles.length;

    this.turtles.nOf(numberOfTurtles * this.outbreakSizePercentage).ask((t) => {
      t.status = "infected-asy";
      t.infectionDuration = 0;
    });
  }

  //
  // The step function is like a "run forever" block. It gets
  // executed over and over again.
  //

  moveYoungs() {
    /**
     * The childrens will go out from home at 8.00 am, returning at 2.00 p.m from school
     */
    const currentDate = new Date(this.startingDateTime);
    currentDate.setMinutes(currentDate.getMinutes() + this.currentStep * 10);

    this.young.ask((t) => {
      if (!t.canMove) {
        return;
      }
      // If it is symptomatic, we know that we should not go out!!
      if (currentDate.getHours() == 8) {
        t.shouldGoToSchool = true;
        t.shouldGoHome = false;
      }

      if (currentDate.getHours() == 18) {
        t.shouldGoToSchool = false;
        t.shouldGoHome = true;
      }

      if (t.shouldGoToSchool) {
        if (t.assignedSchool == null) {
          let isSchoolAssigned = false;
          while (!isSchoolAssigned) {
            const randomSchool = this.school.oneOf();
            const MAX_N_OF_YOUNGS_PER_SCHOOL = Math.ceil(
              this.young.length / this.nOfSchools
            );
            if (randomSchool.nOfAssignedYoung >= MAX_N_OF_YOUNGS_PER_SCHOOL) {
              continue;
            }
            randomSchool.nOfAssignedYoung += 1;
            t.assignedSchool = randomSchool.id;
            isSchoolAssigned = true;
          }
        }
        t.face(this.school.find((o) => o.id == t.assignedSchool));
        t.forward(1);
        if (t.patchAt(0, 0).breed.name == "school") {
          t.shouldGoToSchool = false;
        }
      }

      if (t.shouldGoHome) {
        t.face(this.house.find((o) => o.id == t.assignedHouse));
        if (
          t.patchAt(0, 0).breed.name == "house" &&
          t.patchAt(0, 0).id == t.assignedHouse
        ) {
          t.shouldGoHome = false;
        } else {
          t.forward(1);
        }
      }
    });
  }

  moveAdults() {
    /**
     * The adults will go out from home at 8.00 am, returning at 6.00 p.m
     */
    const currentDate = new Date(this.startingDateTime);
    currentDate.setMinutes(currentDate.getMinutes() + this.currentStep * 10);

    this.adult.ask((t) => {
      if (!t.canMove) {
        return;
      }
      // If it is symptomatic, we know that we should not go out!!
      if (currentDate.getHours() == 8) {
        t.shouldGoToOffice = true;
        t.shouldGoHome = false;
      }

      if (currentDate.getHours() == 18) {
        t.shouldGoToOffice = false;
        t.shouldGoHome = true;
      }

      if (t.shouldGoToOffice) {
        if (t.assignedOffice == null) {
          let isOfficeAssigned = false;
          while (!isOfficeAssigned) {
            const randomOffice = this.office.oneOf();
            const MAX_N_OF_ADULTS_PER_OFFICE = Math.ceil(
              this.adult.length / this.nOfOffices
            );
            if (randomOffice.nOfAssignedAdults >= MAX_N_OF_ADULTS_PER_OFFICE) {
              continue;
            }
            randomOffice.nOfAssignedAdults += 1;
            t.assignedOffice = randomOffice.id;
            isOfficeAssigned = true;
          }
        }
        t.face(this.office.find((o) => o.id == t.assignedOffice));
        t.forward(1);
        if (t.patchAt(0, 0).breed.name == "office") {
          t.shouldGoToOffice = false;
        }
      }

      if (t.shouldGoHome) {
        t.face(this.house.find((o) => o.id == t.assignedHouse));
        if (
          t.patchAt(0, 0).breed.name == "house" &&
          t.patchAt(0, 0).id == t.assignedHouse
        ) {
          t.shouldGoHome = false;
        } else {
          t.forward(1);
        }
      }
    });
  }

  checkForDeath() {
    this.turtles.ask((t) => {
      // Only symptomatic individuals could die by the virus
      if (t.status !== "infected-sym") {
        return;
      }

      const daysOfInfection =
        t.infectionDuration / (60 / MINUTES_PER_STEP) / 24;

      const expPower = -(daysOfInfection - this.virus.timeOfDiseaseDays);
      const probabilityOfDeath =
        ((this.virus.probabilityOfDeath /
          daysOfInfection /
          this.virus.timeOfDiseaseDays) *
          Math.log10(t.age)) /
        (1 + Math.exp(expPower));

      const randomValue = Math.random();
      const shouldDie = randomValue < probabilityOfDeath;
      if (shouldDie) {
        t.die();
        this.currentNumberOfDeaths += 1;
        this.reduxStore.dispatch(increaseNumberOfDeath());
      }
    });
  }

  checkForRecover() {
    //
    this.turtles.ask((t) => {
      // Only symptomatic individuals could die by the virus
      if (t.status !== "infected-sym" && t.status !== "infected-asy") {
        return;
      }

      const daysOfInfection =
        t.infectionDuration / (60 / MINUTES_PER_STEP) / 24;

      const expPower = -3 * (daysOfInfection - this.virus.timeOfDiseaseDays);
      const probabilityOfRecover = 1 / (1 + Math.exp(expPower));

      const randomValue = Math.random();
      if (randomValue < probabilityOfRecover) {
        if (Math.random() < this.virus.probabilityOfImmunity) {
          t.status = "immune";
        } else {
          t.status = "susceptible";
        }

        t.infectionDuration = 0;
      } else {
        t.infectionDuration += 1;
      }
    });
  }

  spreadInfection() {
    this.turtles.ask((t) => {
      if (t.status === "infected-sym" || t.status === "infected-asy") {
        const amountOfViralLoad = t.willUseMask ? 0.5 : 1;
        t.patchAt(0, 0).viralLoad += amountOfViralLoad;
      }
    });
  }

  checkIfInfected() {
    this.turtles.ask((t) => {
      if (t.status === "immune") {
        return;
      }

      if (t.status === "infected-sym" || t.status === "infected-asy") {
        return;
      }

      if (t.status === "exposed") {
        const expositionDurationInDays =
          t.expositionDuration / (60 / MINUTES_PER_STEP) / 24;
        if (expositionDurationInDays === this.virus.timeOfIncubationDays) {
          const status =
            Math.random() < this.virus.probabilityOfSymptoms
              ? "infected-sym"
              : "infected-asy";
          t.status = status;
          t.infectionDuration = 0;
          t.expositionDuration = 0;
        } else {
          t.expositionDuration += 1;
        }

        return;
      }

      const currentViralLoad = t.patchAt(0, 0).viralLoad;
      const roughPopulationNumber = this.nOfHouses * 4;
      const probabilityOfBeingInfected =
        1 -
        Math.exp(
          -this.virus.probabilityOfInfection *
            currentViralLoad *
            (1 / Math.log(roughPopulationNumber) / MINUTES_PER_STEP)
        );

      const randomValue = Math.random();
      if (randomValue < probabilityOfBeingInfected) {
        t.status = "exposed";
        t.expositionDuration = 0;
      }
    });
  }

  checkForLockdown() {
    this.turtles.ask((t) => {
      if (t.status !== "infected-sym") {
        t.canMove = true;
        return;
      }

      if (t.patchAt(0, 0).breed.name == "house" && t.hasLockdown) {
        t.canMove = false;
      }
    });
  }

  step() {
    // Infectious phase
    this.checkForRecover();
    this.checkForDeath();
    this.spreadInfection();
    this.checkIfInfected();
    // Movement phase
    this.checkForLockdown();
    this.moveAdults();
    this.moveYoungs();

    // Diffusing and Evaporate the virus load on each patch over time
    this.patches.diffuse("viralLoad", 0);
    this.patches.ask((patch) => {
      patch.viralLoad *= 0.9;
    });

    // Updating in the store the simulation progress
    this.currentStep += 1;
    this.reduxStore.dispatch(increaseCurrentStep());
    const nOfIndividuals = this.turtles.length;
    this.reduxStore.dispatch(setPopulation(nOfIndividuals));
    // Sending to the store the stats to plot results
    const {
      infected,
      infectedAsymptomatic,
      infectedSymptomatic,
      susceptible,
      exposed,
      immuned,
    } = this.getStats();
    this.reduxStore.dispatch(setNumberOfInfected(infected));
    this.reduxStore.dispatch(setNumberOfInfectedSympt(infectedSymptomatic));
    this.reduxStore.dispatch(setNumberOfInfectedAsympt(infectedAsymptomatic));
    this.reduxStore.dispatch(setNumberOfSusceptible(susceptible));
    this.reduxStore.dispatch(setNumberOfExposed(exposed));
    this.reduxStore.dispatch(setNumberOfImmune(immuned));

    // Check to send to history

    if (this.currentStep % ONE_DAY_IN_STEPS == 0) {
      this.reduxStore.dispatch(
        sendToHistory({
          infectedAsymptomatic,
          infectedSymptomatic,
          susceptible,
          exposed,
          immuned,
          deaths: this.currentNumberOfDeaths,
        })
      );
    }

    let max = -Infinity;
    this.patches.ask((p) => {
      if (p.viralLoad > max) {
        max = p.viralLoad;
      }
    });
  }

  getStats() {
    let infected = 0;
    let infectedSymptomatic = 0;
    let infectedAsymptomatic = 0;
    let susceptible = 0;
    let exposed = 0;
    let immuned = 0;

    this.turtles.ask((t) => {
      if (t.status === "infected-sym") {
        infected += 1;
        infectedSymptomatic += 1;
      }

      if (t.status === "infected-asy") {
        infected += 1;
        infectedAsymptomatic += 1;
      }

      if (t.status === "susceptible") {
        susceptible += 1;
      }

      if (t.status === "exposed") {
        exposed += 1;
      }

      if (t.status === "immune") {
        immuned += 1;
      }
    });

    return {
      infected,
      infectedAsymptomatic,
      infectedSymptomatic,
      susceptible,
      exposed,
      immuned,
    };
  }
}
