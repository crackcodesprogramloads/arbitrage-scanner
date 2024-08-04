import { BinanceAPI, KucoinAPI } from "./dataSources";

export type ContextValue = {
  dataSources: {
    kucoinAPI: KucoinAPI;
    binanceAPI: BinanceAPI;
  };
};
