"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const KUCOIN_QUERY = gql`
  query Query($coin: String) {
    kucoinPrice(coin: $coin)
  }
`;

const BINANCE_QUERY = gql`
  query Query($coin: String) {
    binancePrice(coin: $coin)
  }
`;

const chartConfig = {
  Kucoin: {
    label: "Kucoin",
    color: "black",
  },
  Binance: {
    label: "Binance",
    color: "black",
  },
} satisfies ChartConfig;

export default function ArbitrageChart({ coin }: { coin: string }) {
  const { data: kucoinData, error: kucoinError } = useQuery(KUCOIN_QUERY, {
    variables: { coin },
    pollInterval: 10000,
    context: {},
  });

  const { data: binanceData, error: binanceError } = useQuery(BINANCE_QUERY, {
    variables: { coin },
    pollInterval: 10000,
    context: {},
  });

  const kucoinPrice = kucoinData?.kucoinPrice?.slice(0, -12);
  const binancePrice = binanceData?.binancePrice?.slice(0, -4);

  const timestamp = Date.now();
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const [chartData, setChartData] = useState([{ ticker: coin, time: formattedTime, Kucoin: kucoinPrice, Binance: binancePrice }]);

  useEffect(() => {
    const newChartData = { ticker: coin, time: formattedTime, Kucoin: kucoinPrice, Binance: binancePrice };
    setChartData((prevState) => {
      return [...prevState, newChartData];
    });
  }, [kucoinPrice, binancePrice]);

  let smallestPrice = Math.min(kucoinPrice, binancePrice);
  let highestPrice = Math.max(kucoinPrice, binancePrice);

  let percentageIncrease = (((highestPrice - smallestPrice) / smallestPrice) * 100).toFixed(4);

  return (
    <Card className="w-full h-1/2">
      <CardHeader>
        <CardTitle>
          {coin} Chart - {percentageIncrease}%
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            // margin={{
            //   left: 0,
            //   right: 0,
            // }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              // label="Time"
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              // label="Price"
              // dataKey="Kucoin"
              domain={[(dataMin: number) => dataMin, (dataMax: number) => dataMax]}
              tickLine={false}
              tickCount={30}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="Kucoin" type="monotone" stroke="#22c55e" strokeWidth={1} dot={false} />
            <Line dataKey="Binance" type="monotone" stroke="#eab308" strokeWidth={1} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
