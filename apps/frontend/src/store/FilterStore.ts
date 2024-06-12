import { Store } from "pullstate";

export interface IFilterStore {
  pagination: {
    limit: number;
    offset: number;
  };
  sorter: {
    sortField: string;
    sortDirection: string;
  };
  filters: {
    searchValue: string;
    organizationId: string;
    deviceId: string;
    goalIds: string[];
  };
  selectSearchValue: string;
  period: {
    startDate: string;
    endDate: string;
  };
}

const defaultState = {
  pagination: {
    limit: 10,
    offset: 0,
  },
  sorter: {
    sortField: "",
    sortDirection: "",
  },
  filters: {
    searchValue: "",
    organizationId: "",
    deviceId: "",
    goalIds: [],
  },
  selectSearchValue: "",
  period: {
    startDate: "",
    endDate: "",
  },
};

const filterStore = new Store<IFilterStore>(defaultState);

export default filterStore;

export const resetFilterStore = () => {
  filterStore.update(() => defaultState);
};
