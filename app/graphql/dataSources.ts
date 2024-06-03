import { RESTDataSource } from "@apollo/datasource-rest";

export class KucoinAPI extends RESTDataSource {
  override baseURL = "https://api.kucoin.com/api/";

  async getCoinPrice(coin: string) {
    const coinToUppercase = encodeURIComponent(coin).toUpperCase();
    const response = await this.get(`v1/prices?currencies=${coinToUppercase}`);

    return response.data[coinToUppercase];
  }
}
