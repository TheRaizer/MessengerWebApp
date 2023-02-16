import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { useOutsideClickDetection } from '../../../../../../../../hooks/actions/useOutsideClickDetection';
import { IconButton } from './IconButton';
import dynamic from 'next/dynamic';
import { IconBaseProps } from 'react-icons';
import { fetchNextAPI } from '../../../../../../../../helpers/api/api';
import { DetailsButtonProps } from '../../../../../../../../../types/components/Windows/FriendWindow/States/FriendList/common/FriendItem/DetailsButton.type';
import { Spinner } from '../../../../../../../Loading/Spinner';

const DetailsTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 100,
    maxHeight: 200,
    height: 100,
  },
});

const MoreIcon = dynamic<IconBaseProps>(() =>
  import('react-icons/cg').then((mod) => mod.CgMoreVerticalO)
);

const Styled = {
  RemoveButton: styled.button`
    font-size: 1.4em;
    padding: 5px 10px;
    border-radius: inherit;
    transition: background-color 100ms ease-in;

    &:hover {
      background-color: #ff0000e2;
    }
  `,
};

export const DetailsButton = ({
  mutate,
  friendUsername,
}: DetailsButtonProps): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const detailsRef = useRef(null);

  useOutsideClickDetection(detailsRef, () => setOpenDetails(false));

  return (
    <DetailsTooltip
      sx={{ m: 1 }}
      open={openDetails}
      placement={'right-start'}
      title={
        <Styled.RemoveButton
          ref={detailsRef}
          onClick={() => {
            setLoading(true);
            fetchNextAPI(
              `friends/requests?friend_username=${friendUsername}`,
              'DELETE'
            )
              .then(() => {
                // instead of refetching we remove user with a specified username from SWR cache
                mutate()
                  .catch((err) => console.error(err))
                  .finally(() => setLoading(false));
              })
              .catch((err) => console.error(err))
              .finally(() => setLoading(false));
          }}
        >
          remove
        </Styled.RemoveButton>
      }
    >
      {loading ? (
        <Spinner color="black" size={1} />
      ) : (
        <IconButton onClick={() => setOpenDetails(true)}>
          <MoreIcon size={30} />
        </IconButton>
      )}
    </DetailsTooltip>
  );
};
