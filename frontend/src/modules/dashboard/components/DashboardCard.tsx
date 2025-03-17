import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

export const DashboardCard = ({
  title,
  value,
  icon: Icon,
  className,
}: DashboardCardProps) => {
  return (
    <div
      className={cn(
        "w-full h-[150px] rounded-md flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="flex items-center gap-1">
        <Icon className="size-4" />
        <h3 className="sm:text-lg text-base">{title}</h3>
      </div>
      <p className="sm:text-3xl text-xl font-semibold">
        {value ? (
          <span>{value}</span>
        ) : (
          <span className="text-gray-400">0</span>
        )}
      </p>
    </div>
  );
};
