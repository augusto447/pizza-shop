import { Helmet } from "react-helmet-async";
import { MouthRevenueCard } from "./mouth-revenue-card";
import { MouthOrderAmountCard } from "./mouth-order-amouth-card";
import { DayhOrderAmountCard } from "./day-order-amount-card";
import { MouthCanceledOrderAmountCard } from "./mouth-canceled-order-amount-card";
import { RevenueChart } from "./revenue-chart";
import { PopularProductsChart } from "./popular-product-chart";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MouthRevenueCard />
          <MouthOrderAmountCard />
          <DayhOrderAmountCard />
          <MouthCanceledOrderAmountCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />

        </div>
      </div>
    </>
  );
}
