import { CursorPaginationResponse } from '../../../../types/helpers/pagination.type';
import { PublicUserModel } from '../../../../types/Models/User.type';

export const addUserToCursorPagination = (
  username: string,
  user_id: number,
  initialData?: CursorPaginationResponse<PublicUserModel>[]
): CursorPaginationResponse<PublicUserModel>[] => {
  // insert user into initial list of data or create a new list with the user in it
  const newUser = {
    user_id: user_id,
    username: username,
  };
  const newData = initialData ? [...initialData] : [];

  if (newData.length === 0) {
    newData.push({
      cursor: {},
      results: [newUser],
    });
  } else {
    newData[0].results.unshift(newUser);
  }

  return newData;
};
