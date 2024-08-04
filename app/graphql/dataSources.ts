import { RESTDataSource } from "@apollo/datasource-rest";

export class KucoinAPI extends RESTDataSource {
  override baseURL = "https://api.kucoin.com/api/";

  async getKucoinPrice(coin: string) {
    const coinToUppercase = encodeURIComponent(coin).toUpperCase();
    const response = await this.get(`v1/prices?currencies=${coinToUppercase}`);

    return response.data[coinToUppercase];
  }
}
export class BinanceAPI extends RESTDataSource {
  override baseURL = "https://api.binance.com/api/";

  async getBinancePrice(coin: string) {
    const coinToUppercase = encodeURIComponent(coin).toUpperCase();
    const response = await this.get(`v3/avgPrice?symbol=${coinToUppercase}USDT`);

    return response.price;
  }
}
