import { KucoinAPI } from "./dataSources";

export type ContextValue = {
  dataSources: {
    kucoinAPI: KucoinAPI;
  };
};
