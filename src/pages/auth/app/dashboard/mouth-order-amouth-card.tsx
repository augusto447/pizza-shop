
import { getMouthOrdersAmount } from "@/api/get-mounth-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./matric-card-skeleton";

export function MouthOrderAmountCard() {

    const { data: monthOrdersAmount } = useQuery({
        queryFn: getMouthOrdersAmount,
        queryKey: ["metrics", "month-orders-amount"]
    })
    return (
        <Card>
            <CardHeader className="flex items-center space-y-0 justify-between pb-2">
                <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>

                <Utensils className="h-4 w-4 text-muted-foreground" />

            </CardHeader>
            <CardContent className="space-y-1">
                {monthOrdersAmount ? (
                    <>

                        <span className="text-2xl font-bold tracking-tight">
                            {monthOrdersAmount.amount.toLocaleString("pt-BR")}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            {monthOrdersAmount.diffFromLastMonth >= 0 ? (

                                <>

                                    <span className="text-emerald-500 dark:text-emerald-400">


                                        +{monthOrdersAmount.diffFromLastMonth}%</span>
                                    em relação ao mês passado
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">

                                        ${monthOrdersAmount.diffFromLastMonth}% </span>
                                    em relação ao mês passado
                                </>
                            )}

                        </p>



                    </>

                ) : (
                    <MetricCardSkeleton />

                )}




            </CardContent>
        </Card>
    )
}