const redis = require('redis');

const client = redis.createClient({
  url: 'redis://127.0.0.1:6379',
});

// Start Redis store
client.on('connect', () => {
  console.log('Redis plugged in.');
});

client.connect();

const setAccessToken = async (userId: string, accessToken: string) => {
  try {
    console.log('1', accessToken);
    return Promise.resolve(client.set(userId, accessToken))
      .then((res) => {
        console.log(res);
        console.log('1');
      })
      .then(() => {
        console.log('2');
        return Promise.resolve(client.get(userId)).then((res) => {
          console.log(res);
          console.log('3');
        });
      });
  } catch (error) {
    return error;
  }
};

const getAccessToken = (userId: string) => {
  try {
    return Promise.resolve(client.get(userId)).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteAccessToken = (userId: string) => client.set(userId);

export { setAccessToken, getAccessToken, deleteAccessToken };
