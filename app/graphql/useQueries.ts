import { gql, useQuery } from "@apollo/client";

const KUCOIN_PRICE = gql`
  query Query($coin: String) {
    kucoinPrice(coin: $coin)
  }
`;

const BINANCE_PRICE = gql`
  query Query($coin: String) {
    binancePrice(coin: $coin)
  }
`;

const getKucoinPrice = (coin: string) => {
  const { data: kucoinData, error: kucoinError } = useQuery(KUCOIN_PRICE, {
    variables: { coin },
    pollInterval: 10000,
    context: {},
  });

  return kucoinData?.kucoinPrice;
};

const getBinancePrice = (coin: string) => {
  const { data: binanceData, error: binanceError } = useQuery(BINANCE_PRICE, {
    variables: { coin },
    pollInterval: 10000,
    context: {},
  });

  return binanceData?.binancePrice;
};

export { getKucoinPrice, getBinancePrice };
