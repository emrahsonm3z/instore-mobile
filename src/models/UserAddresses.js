import { types } from "mobx-state-tree";
import get from "lodash.get";

export const UserAddressModel = types
  .model({
    _id: types.identifier,
    street: types.string,
    aptNum: types.maybeNull(types.string),
    postalCode: types.maybeNull(types.string),
    city: types.string,
    country: types.string,
    district: types.maybeNull(types.string),
    neighborhood: types.maybeNull(types.string),
    province: types.maybeNull(types.string),
    instructions: types.maybeNull(types.string),
    geo: types.model({
      lng: types.number,
      lat: types.number
    })
  })
  .preProcessSnapshot(snap => ({
    ...snap,
    geo: {
      lng: get(snap, ["geo", "coords", 0]),
      lat: get(snap, ["geo", "coords", 1])
    }
  }));
