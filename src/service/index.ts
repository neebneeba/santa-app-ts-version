import serverAxiosInstance from "../api";
import store from "../store";

type User = {
  username: string;
  uid: string;
};

type UserProfile = {
  userUid: string;
  address: string;
  birthdate: string;
};

function getUsers() {
  return serverAxiosInstance.get<User[]>("users.json");
}

function getUserProfiles() {
  return serverAxiosInstance.get<UserProfile[]>("userProfiles.json");
}

async function getCombinedUserData() {
  const [usersResponse, profilesResponse] = await Promise.all([
    getUsers(),
    getUserProfiles(),
  ]);

  const users = usersResponse.data;
  const profiles = profilesResponse.data;

  // this will combine users data with profile data then return
  return users.map((user) => {
    const profile = profiles.find((profile) => profile.userUid === user.uid);
    const userRequests = store.getSentReadyRequestByUserId(user.uid);

    return {
      ...user,
      address: profile ? profile.address : null,
      birthdate: profile ? profile.birthdate : null,
      requests: userRequests,
    };
  });

  // return combinedData;
}

export default {
  getUsers,
  getUserProfiles,
  getCombinedUserData,
};
