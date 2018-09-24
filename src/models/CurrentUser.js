import { types, getParent, flow } from "mobx-state-tree";

import { UserAddressModel } from "./UserAddresses";
import { baseApi } from "../api/Api";

export const CurrentUserModel = types
  .model("CurrentUserModel", {
    _id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    avatarUrl: types.maybe(types.string),
    addresses: types.optional(types.array(UserAddressModel), [])
  })
  .views(self => ({
    get auth() {
      return getParent(self);
    },
    get addressesIsEmpty() {
      return self.addresses.length === 0;
    }
  }))
  .actions(self => ({
    /* eslint-disable-next-line */
    createAddress: flow(function*(data) {
      try {
        const res = yield baseApi
          .url("/addresses")
          .auth(`Bearer ${self.auth.authToken}`)
          .post({ data })
          .json();

        if (res.address) {
          self.addresses.push(res.address);
        }
      } catch (error) {
        throw error;
      }
    }),
    /* eslint-disable-next-line */
    getAddresses: flow(function*() {
      try {
        const res = yield baseApi
          .url("/addresses")
          .auth(`Bearer ${self.auth.authToken}`)
          .get()
          .json();

        if (Array.isArray(res.addresses)) {
          /* eslint-disable-next-line */
          self.addresses = res.addresses;
        }
      } catch (error) {
        throw error;
      }
    })
  }));
