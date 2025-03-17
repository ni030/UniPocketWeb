import { Skeleton } from "@/components/ui/skeleton";
import ReactECharts, { EChartsOption } from "echarts-for-react";

interface ComplaintChartProps {
  complaints: Complaint[];
  isLoading: boolean;
}

export const ComplaintChart = ({
  complaints,
  isLoading,
}: ComplaintChartProps) => {
  const complaintSet = new Set(complaints.map((complaint) => complaint.type));

  const normalizedData = Array.from(complaintSet).map((type) => {
    const count = complaints.filter(
      (complaint) => complaint.type === type
    ).length;
    return { value: count, name: type };
  });

  const options: EChartsOption = {
    title: {
      text: "Complaints",
      subtext: "Total complaints by users",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Water", "Electricity", "Facility"],
    },
    series: [
      {
        type: "pie",
        radius: "60%",
        center: ["50%", "60%"],
        data: normalizedData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  if (isLoading)
    return (
      <div className="lg:col-span-2 col-span-full border rounded-md p-4">
        <Skeleton className="w-full h-[300px]" />
      </div>
    );

  return (
    <div className="lg:col-span-2 col-span-full border rounded-md p-4">
      <ReactECharts option={options} />
    </div>
  );
};
