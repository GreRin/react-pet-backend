import { ACCESS_TOKEN_SECRET } from '../config/config';
import { TokenInterface } from '../types';
import authService from '../resources/auth/login/login.service';

const jwt = require('jsonwebtoken');

const redis = require('redis');

const NODE_ENV = process.env.NODE_ENV || 'development';
const client = NODE_ENV === 'development' ? redis.createClient() : redis.createClient(process.env.REDIS_URL);

// Start Redis store
client.on('connect', () => console.log('Redis plugged in.'));
client.on('error', (err: Error) => console.log(`Redis error occurred: ${err}`));

client.connect();

const setAccessToken = async (userId: string, accessToken: string) => {
  try {
    return Promise.resolve(client.set(userId, accessToken)).then((res) => res);
  } catch (error) {
    return error;
  }
};

const getAccessToken = (id: string) => {
  try {
    return Promise.resolve(client.get(id)).then(async (res) => {
      console.log('old     ', res);
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkAccessToken = (id: string) => {
  try {
    return Promise.resolve(client.get(id)).then(async (res) => {
      console.log('old     ', res);
      const { userId, email, exp } = jwt.verify(res, ACCESS_TOKEN_SECRET) as TokenInterface;
      return Promise.resolve(authService.findByEmail(email)).then((user: any) => {
        const nowTime = (new Date().getTime() + 1) / 1000;
        if (exp < nowTime) {
          const refreshedAccessToken = jwt.sign(
            { userId: user.id, email: user.email },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '5s' },
            { algorithm: 'RS256' }
          );
          Promise.resolve(client.set(`accessToken-${userId}`, refreshedAccessToken)).then(() => {
            Promise.resolve(client.get(`accessToken-${userId}`)).then((resolve) => {
              console.log('refreshed', resolve);
            });
          });
          return true;
        }
        return false;
      });
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkRefreshToken = (id: string) => {
  try {
    return Promise.resolve(client.get(id)).then(async (res) => {
      console.log('old     ', res);
      const { userId, email, exp } = jwt.verify(res, ACCESS_TOKEN_SECRET) as TokenInterface;
      return Promise.resolve(authService.findByEmail(email)).then((user: any) => {
        const nowTime = (new Date().getTime() + 1) / 1000;
        if (exp < nowTime) {
          const refreshedAccessToken = jwt.sign(
            { userId: user.id, email: user.email },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' },
            { algorithm: 'RS256' }
          );
          Promise.resolve(client.set(`accessToken-${userId}`, refreshedAccessToken)).then(() => {
            Promise.resolve(client.get(`accessToken-${userId}`)).then((resolve) => {
              console.log('refreshed', resolve);
            });
          });
          return true;
        }
        return false;
      });
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteAccessToken = (userId: string) => {
  try {
    return Promise.resolve(client.del(`accessToken-${userId}`)).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteRefreshToken = (userId: string) => {
  try {
    return Promise.resolve(client.del(`refreshToken-${userId}`)).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { setAccessToken, checkAccessToken, deleteRefreshToken, deleteAccessToken, getAccessToken, checkRefreshToken };
