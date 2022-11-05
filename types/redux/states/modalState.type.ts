export enum ModalType {
  NONE = 'none',
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
  USERNAME = 'username',
  EMAIL_VERIFICATION = 'email-verification',
  RESET_PASSWORD = 'reset-password',
}

export type ModalState = {
  open: boolean;
  modalType: ModalType;
  /**
   * When true, disables the ability to close or change the current modal, unless they exist in the "selectModals" array.
   */
  allowOnlySelectModalChanges?: boolean;
  /**
   * The array of modal types that this modal can change too when "allowOnlySelectModalChanges" is true
   */
  selectModals?: ModalType[];
};
