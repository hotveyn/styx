import { resetFilterStore } from "../store/FilterStore";
import { resetUserProfileStore } from "../store/UserProfileStore";

export default function () {
  resetFilterStore();
  resetUserProfileStore();
}
