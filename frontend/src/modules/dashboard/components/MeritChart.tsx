import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import ReactECharts, { EChartsOption } from "echarts-for-react";

interface MeritChartProps {
  merits: Merit[];
  isLoading: boolean;
}

export const MeritChart = ({ merits, isLoading }: MeritChartProps) => {
  const isMobile = useIsMobile();

  const meritSet = new Set(merits.map((complaint) => complaint.ranking));
  const sortedRankings = Array.from(meritSet).sort((a, b) => a - b);

  // Filter the number of users for each ranking
  const normalizedData = sortedRankings.map((ranking) => {
    const count = merits.filter((merit) => merit.ranking === ranking).length;
    return { value: count, name: `Ranking ${ranking}` };
  });

  const options: EChartsOption = {
    title: {
      text: "Ranking Leaderboard",
      textStyle: {
        fontSize: isMobile ? 14 : 16,
        fontWeight: "bold",
      },
    },
    toolBox: {
      feature: {
        saveAsImage: {},
        dataZoom: {},
        restore: {},
      },
    },
    tooltip: {},
    legend: {
      data: ["Ranking"],
      orient: "vertical",
      right: 10,
    },
    xAxis: {
      data: normalizedData.map((item) => item.name),
    },
    yAxis: {},
    series: [
      {
        name: "Ranking",
        type: "line",
        data: normalizedData.map((item) => item.value),
      },
    ],
  };

  if (isLoading)
    return (
      <div className="col-span-full border rounded-md p-4">
        <Skeleton className="w-full h-[300px]" />
      </div>
    );

  return (
    <div className="col-span-full border rounded-md p-4">
      <ReactECharts option={options} opts={{ locale: "en" }} />
    </div>
  );
};
