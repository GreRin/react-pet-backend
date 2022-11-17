const redis = require('redis');

const client = redis.createClient({
  url: 'redis://127.0.0.1:6379',
});

const setAccessToken = async (userId: string, accessToken: string) => {
  try {
    await client.set(userId, accessToken);
    await client.get(userId, (error: Error, data: any): void => (error ? console.log(error) : console.log('aaaaaaaaaaaaa', data)));
  } catch (error) {
    console.log(error);
  }
};

const getAccessToken = (userId: string) =>
  // client.get(userId, (error: Error, data: any) => {
  //   if (error) {
  //     return error.message
  //   }
  //   console.log(data);
  //   return data;
  // });
  client.get(userId);
const deleteAccessToken = (userId: string) => client.set(userId);

export { setAccessToken, getAccessToken, deleteAccessToken, client };
