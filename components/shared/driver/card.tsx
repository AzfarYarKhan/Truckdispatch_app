import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
  title: string;
  value: string;
}

export function CardDemo({ title, value }: CardProps) {
  return (
    <Card className=" w-[150px]  xl:w-[300px] h-[132px]  border-slate-200 shadow-md ">
      <div className="flex flex-col space-y-1.5 px-6 py-4 lg:py-6">
        <h3 className=" font-semibold tracking-tight text-lg text-blue-950 ">
          {title}
        </h3>
      </div>
      <CardContent>
        <p className="text-xl font-bold text-blue-950 mb-1">{value}</p>
      </CardContent>
    </Card>
  );
}
export default CardDemo;
