import { ReactElement } from 'react';
import { IconButton } from './IconButton';
import { Tooltip } from '@mui/material';
import dynamic from 'next/dynamic';
import { IconBaseProps } from 'react-icons';

const EnvelopeIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/bi').then((mod) => mod.BiEnvelope)
);

export const MessageButton = (): ReactElement => {
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
      <IconButton>
        <EnvelopeIcon size={40} />
      </IconButton>
    </Tooltip>
  );
};
