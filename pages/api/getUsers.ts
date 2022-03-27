import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllUsers,
  getProviderIdByUserId,
  getRatingByUserId,
  User,
} from '../../util/database';

type getUsersNextApiRequest = Omit<NextApiRequest, 'body'>;

type ProviderRatings = {
  providerId: number;
  rating: number;
};

type ProviderIds = {
  id: number;
  userId: number;
};

export default async function getUsersHandler(
  request: getUsersNextApiRequest,
  response: NextApiResponse<User[], ProviderRatings[], ProviderIds>,
) {
  if (request.method === 'GET') {
    const users = await getAllUsers();
    const providerRatings = async () => {
      for (const user of users) {
        await getRatingByUserId(user.id);
        // console.log(ratings);
      }
    };
    // await providerRatings();

    const providerIds = async () => {
      for (const user of users) {
        const providerId = await getProviderIdByUserId(user.id);
        console.log(providerId);
      }
    };
    await providerIds();

    response.json(users, providerRatings, providerIds);
    return;
  }
}
