export enum ETab {
  INTERACTIVE,
  ANALYSIS,
}

export interface IUi {
  currentTab: ETab;
  chartSectionOpen: boolean;
  infoSectionOpen: boolean;
}
