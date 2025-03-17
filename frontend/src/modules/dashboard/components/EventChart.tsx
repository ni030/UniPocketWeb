import { Skeleton } from "@/components/ui/skeleton";
import ReactECharts, { EChartsOption } from "echarts-for-react";

interface EventChartProps {
  events: Event[];
  isLoading: boolean;
}

export const EventChart = ({ events, isLoading }: EventChartProps) => {
  const topFiveEvents = events
    .slice(0, 5)
    .filter((event) => event.scanCount > 0);

  const options: EChartsOption = {
    title: {
      text: "Top 5 Events",
    },
    tooltip: {},
    legend: {
      data: ["Event Scan Count"],
    },
    xAxis: {
      data: topFiveEvents.map((event) => event.eventName),
      axisLabel: {
        formatter: (value: string) => {
          return value.toString().substring(0, 10) + "...";
        },
      },
    },
    yAxis: {},
    series: [
      {
        name: "Ranking",
        type: "bar",
        data: topFiveEvents.map((event) => event.scanCount),
      },
    ],
  };

  if (isLoading)
    return (
      <div className="lg:col-span-3 col-span-full border rounded-md p-4">
        <Skeleton className="w-full h-[300px]" />
      </div>
    );

  return (
    <div className="lg:col-span-3 col-span-full border rounded-md p-4">
      <ReactECharts option={options} opts={{ locale: "en" }} />
    </div>
  );
};
