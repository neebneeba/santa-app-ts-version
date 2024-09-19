// In memory storage, consider this file as database.

type UserReqest = {
  requestId: number;
  uid: string;
  request: string;
  isSent: boolean;
};

const userRequests: Array<UserReqest> = [];

function addRequest(data: UserReqest) {
  userRequests.push(data);
}

// Fetches sent ready request by user Id
function getSentReadyRequestByUserId(uid: string) {
  return userRequests.filter(
    (request) => request.uid === uid && request.isSent === false
  );
}

// Changes state of the request to true
function changeStateOfRequestById(id: number) {
  const item = userRequests.find((item) => item.requestId === id);

  if (item) {
    item.isSent = true;
  }
}

export default {
  userRequests,
  addRequest,
  getSentReadyRequestByUserId,
  changeStateOfRequestById,
};
