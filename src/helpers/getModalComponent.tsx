// import dynamic, { DynamicOptions } from 'next/dynamic';
import { ComponentType } from 'react';
// import styled from 'styled-components';
import { ModalType } from '../../types/redux/states/modalState.type';
// import { Spinner } from '../components/common/Spinner';

// const Styled = {
//   Spinner: styled(Spinner)`
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   `,
// };

// const options: DynamicOptions = {
//   loading: () => <Styled.Spinner size={40} />,
// };

export const getModalComponent = (modalType: ModalType): ComponentType => {
  switch (modalType) {
    // case ModalType.SIGN_IN:
    //   return dynamic(
    //     () =>
    //       import('../components/Modals/Authentication/SignInModal').then(
    //         (mod) => mod.SignInModal
    //       ),
    //     options
    //   );
    default:
      throw new Error('No such modal of type ' + modalType);
  }
};
