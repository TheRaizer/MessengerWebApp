import { ReactElement } from 'react';
import styled from 'styled-components';
import { MessageProps } from '../../../../../../types/components/Windows/MessageWindow/States/Conversation/Message.type';
import { useAppSelector } from '../../../../../redux/hooks';
import { selectUser } from '../../../../../redux/slices/userSlice';
import { Col } from '../../../../common/Col';
import { getFormattedLocalTimeString } from '../../../../../helpers/datetime';

const Styled = {
  PositioningContainer: styled.div<{ justifyEnd: boolean }>`
    width: 100%;
    display: flex;
    justify-content: ${({ justifyEnd }) =>
      justifyEnd ? 'flex-end' : 'flex-start'};
    padding: 0px 10px;
  `,
  Container: styled.div`
    display: flex;
    align-items: center;
    min-height: 35px;
    gap: 7px;
  `,
  Icon: styled.div`
    border-radius: 50%;
    width: 35px;
    height: 35px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  `,
  ContentContainer: styled(Col)`
    padding: 0px 10px;
    max-width: 230px;
    height: 100%;
    border: 1px solid black;
    justify-content: center;
  `,
  Header: styled.div<{ alignTextLeft: boolean }>`
    display: flex;
    gap: 10px;
    text-align: ${({ alignTextLeft }) => (alignTextLeft ? 'left' : 'right')};
    opacity: 0.4;
    font-size: 0.8em;
    justify-content: space-between;
  `,
};

export const Message = ({
  content,
  createdDate,
  friendUsername,
  senderId,
}: MessageProps): ReactElement => {
  const user = useAppSelector(selectUser);

  const senderIsUser = user.user?.user_id == senderId;
  const username = senderIsUser ? user.user?.username || '' : friendUsername;
  const createdDateTime =
    new Date(createdDate).toLocaleDateString() +
    ' ' +
    getFormattedLocalTimeString(new Date(createdDate));

  return (
    <Styled.PositioningContainer justifyEnd={senderIsUser}>
      <Styled.Container>
        {!senderIsUser && (
          <Styled.Icon>
            <p>{username[0].toUpperCase()}</p>
          </Styled.Icon>
        )}
        <Styled.ContentContainer>
          <Styled.Header alignTextLeft={senderIsUser}>
            {!senderIsUser && <p>{friendUsername}</p>}
            <p>{createdDateTime}</p>
          </Styled.Header>
          <p>{content}</p>
        </Styled.ContentContainer>
        {senderIsUser && (
          <Styled.Icon>
            <p>{username[0].toUpperCase()}</p>
          </Styled.Icon>
        )}
      </Styled.Container>
    </Styled.PositioningContainer>
  );
};