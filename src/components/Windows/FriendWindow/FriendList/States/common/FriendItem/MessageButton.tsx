import { ReactElement } from 'react';
import { IconButton } from './IconButton';
import { Tooltip } from '@mui/material';
import dynamic from 'next/dynamic';
import { IconBaseProps } from 'react-icons';
import { WindowType } from '../../../../../../../../types/redux/states/windows.type';
import { useOpenWindow } from '../../../../../../../hooks/actions/window/useOpenWindow';

const EnvelopeIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bi').then((mod) => mod.BiEnvelope)
);

export const MessageButton = ({
  friendId,
  friendUsername,
}: {
  friendId: number;
  friendUsername: string;
}): ReactElement => {
  const openMessageWindow = useOpenWindow(WindowType.MESSAGE, {
    friendId,
    friendUsername,
  });
  return (
    <Tooltip
      placement={'top'}
      title={'message'}
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -10],
            },
          },
        ],
      }}
      arrow
    >
      <IconButton onClick={openMessageWindow}>
        <EnvelopeIcon size={40} />
      </IconButton>
    </Tooltip>
  );
};
