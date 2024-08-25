"use client";

import { useEffect, useState } from "react";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { getTime } from "../functions/getTime";
import { getPercentageIncrease } from "../functions/getPercentageIncrease";
import { getBinancePrice, getKucoinPrice } from "../graphql/useQueries";

export default function ArbitrageChart({ coin }: { coin: string }) {
  const currentTime = getTime();
  const kucoinPrice = getKucoinPrice(coin);
  const binancePrice = getBinancePrice(coin);
  const percentageGain = getPercentageIncrease(kucoinPrice, binancePrice);

  const [chartData, setChartData] = useState([{ ticker: coin, time: currentTime, Kucoin: kucoinPrice, Binance: binancePrice }]);

  useEffect(() => {
    const newChartData = { ticker: coin, time: currentTime, Kucoin: kucoinPrice, Binance: binancePrice };
    setChartData((prevState) => {
      return [...prevState, newChartData];
    });
  }, [kucoinPrice, binancePrice]);

  return (
    <Card className="w-full h-1/2">
      <CardHeader>
        <CardTitle>
          {coin} Chart - {percentageGain}%
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis domain={[(dataMin: number) => dataMin, (dataMax: number) => dataMax]} tickLine={false} tickCount={30} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="Kucoin" type="monotone" stroke="#22c55e" strokeWidth={1} dot={false} />
            <Line dataKey="Binance" type="monotone" stroke="#eab308" strokeWidth={1} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const chartConfig = {
  Kucoin: {
    label: "Kucoin",
    color: "red",
  },
  Binance: {
    label: "Binance",
    color: "black",
  },
} satisfies ChartConfig;
