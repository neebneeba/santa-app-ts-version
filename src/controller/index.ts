import { Request, Response } from "express";
import { validationResult } from "express-validator";

import store from "../store";
import service from "../service";
import ageCalculator from "../utils/age_calculator";

async function saveRequest(request: Request, response: Response) {
  // Getting validation result
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    // This line adds all error messages into single text
    let errorText = "";

    errors.array().map((item) => {
      if (item.type === "field") {
        errorText += `${item.path}: ${item.msg}\n`;
      }
    });

    return response.status(400).send(errorText);
  }

  // Fetches user profile and check if request userId exists
  const userProfiles = await service.getUserProfiles();

  for (let item of userProfiles.data) {
    if (item.userUid === request.body.uid) {
      // Calculate age and if too old then show warning
      if (ageCalculator(item.birthdate) > 10) {
        return response
          .status(400)
          .send("You are too old to get a gift from santa !!!");
      }

      // Stores user request into in-memory variable
      store.addRequest({
        requestId: store.userRequests.length + 1,
        uid: request.body.uid,
        request: request.body.request,
        isSent: false,
      });

      // After saving the user request. it sends the message indicating that the request has received.
      return response.send("Successfully stored !!!");
    }
  }

  return response.status(400).send("You are not registered !!!");
}

function getRequests(request: Request, response: Response) {
  response.send(store.userRequests);
}

export default {
  saveRequest,
  getRequests,
};
