import { AsyncStorage } from "react-native";
import { types, flow } from "mobx-state-tree";

import { customersApi } from "../api/Api";
import { NavigationService } from "../api/NavigationService";
import { CurrentUserModel } from "../models/CurrentUser";

const TOKEN_KEY = "@instore/token";

export const AuthStore = types
  .model("AuthStore", {
    authToken: types.maybe(types.string),
    info: types.maybe(CurrentUserModel)
  })
  .actions(self => ({
    /* eslint-disable-next-line */
    setupAuth: flow(function*() {
      yield self.getAuthToken();
      yield self.getUserInfo();
    }),
    /* eslint-disable-next-line */
    getAuthToken: flow(function*() {
      try {
        const token = yield AsyncStorage.getItem(TOKEN_KEY);

        if (token) {
          /* eslint-disable-next-line */
          self.authToken = token;
        } else {
          NavigationService.navigate("Auth");
        }
      } catch (error) {
        console.log("error", error);
      }
    }),
    /* eslint-disable-next-line */
    saveToken: flow(function*(token) {
      try {
        yield AsyncStorage.setItem(TOKEN_KEY, token);
      } catch (error) {
        console.log("error", error);
      }
    }),
    /* eslint-disable-next-line */
    login: flow(function*(providerToken, provider) {
      try {
        const res = yield customersApi
          .post({
            token: providerToken,
            provider
          })
          .json();

        if (res.token) {
          /* eslint-disable-next-line */
          self.authToken = res.token;
          yield self.saveToken(res.token);
          yield self.getUserInfo();
        }
      } catch (error) {
        console.log("error", error);
      }
    }),
    /* eslint-disable-next-line */
    getUserInfo: flow(function*() {
      try {
        if (self.authToken) {
          const res = yield customersApi
            .url("/me")
            .headers({ Authorization: `Bearer ${self.authToken}` })
            .get()
            .json();

          /* eslint-disable-next-line */
          self.info = res;

          NavigationService.navigate("Main");
        }
      } catch (error) {
        console.log("error", error);
      }
    })
  }));
