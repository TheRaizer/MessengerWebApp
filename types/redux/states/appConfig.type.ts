export enum ViewportStates {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

export type AppConfigState = {
  viewportState: ViewportStates;
};
