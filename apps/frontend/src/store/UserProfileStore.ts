import { Store } from "pullstate";

export interface IUserProfile {
  additionalData: string | null;
  email: string | null;
  login: string | null;
  name: string | null;
  organization: {
    name: string;
  };
  organizationId: string | null;
}

const defaultState = {
  additionalData: "",
  email: "",
  login: "",
  name: "",
  organization: {
    name: "",
  },
  organizationId: null,
};

const userProfileStore = new Store<IUserProfile>(defaultState);

export default userProfileStore;

export const resetUserProfileStore = () => {
  userProfileStore.update(() => defaultState);
};
