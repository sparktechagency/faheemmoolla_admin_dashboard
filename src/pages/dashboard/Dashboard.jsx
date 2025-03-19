import { lazy, Suspense } from "react";
import { useAllCountAnalysisQuery } from "../../features/dashboard/dashboardApi"


const AnalysisCard = lazy(() => import("../../components/AnalysisCard"));
const CustomerMap = lazy(() =>
  import("../../components/dashboard/CustomerMap")
);
const OrderChart = lazy(() => import("../../components/dashboard/OrderChart"));
const PieCharts = lazy(() => import("../../components/dashboard/PieChart"));
const Revenue = lazy(() => import("../../components/dashboard/Revenue"));

import Icon_Order from "../../assets/icons/Icon_Order.png";
import Items_Delivered from "../../assets/icons/Items_Delivered.png";
import revenue from "../../assets/icons/revenue.png";
import shop_order from "../../assets/icons/shop_order.png";
import OrderData from "../../assets/icons/orderData.png";
import down from "../../assets/icons/down.png";
import { Skeleton, Spin } from "antd";
import CustomLoading from "../../components/CustomLoading";

const Dashboard = () => {
  const {
    data: allShop,
    error: queryError,
    isLoading: queryLoading,
    isError,
    status
  } = useAllCountAnalysisQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });


  if (status === "rejected" && isError && queryError)
    return <div className="flex flex-col gap-5 text-base items-center justify-center h-[300px]">
      <p className="text-center text-red-500">{queryError.data.message ? queryError.data.message +  " "+"please logOut then Login" :""} </p>
  <p className="text-center text-red-500">Server Error. Please try again later.</p>
</div>

 

  const analysisCards = [
    {
      value: queryLoading ? <div className="text-center"><Spin size="small" /></div>: allShop?.data?.totalFoodSell,
      title: "Total Food Sell",
      icon: Icon_Order,
      percentage: "4% (30 days)",
      orderData: OrderData,
    },
    {
      value:  queryLoading ? <div className="text-center"><Spin size="small" /></div>: `$${allShop?.data?.totalRevenue?.toFixed(2)}`,
      title: "Total Revenue",
      icon: revenue,
      percentage: "12% (30 days)",
      orderData: down,
    },
    {
      value:  queryLoading ? <div className="text-center"><Spin size="small" /></div>: allShop?.data?.totalUser || 0,
      title: "Total User",
      icon: shop_order,
    },
    {
      value:  queryLoading ? <div className="text-center"><Spin size="small" /></div>: allShop?.data?.totalShop || 0,
      title: "Total Shop",
      icon: Items_Delivered,
    },
  ];

  return (
    <div className="flex flex-col gap-10 py-10">
      {/* Analysis Cards with Skeleton Loading */}
      <div className="flex items-center gap-12">
        {analysisCards.map((card, index) => (
          <Suspense key={index} fallback={ <Skeleton active className="w-full h-[300px] rounded-lg bg-gray-200" />}>
            <AnalysisCard
              value={card.value}
              title={card.title}
              OrderDataImage={card.icon}
              percentage={card.percentage}
              OrderDatapercentage={card.orderData || ""}
            />
          </Suspense>
        ))}
      </div>

      {/* PieCharts and OrderChart with Skeleton Loading */}
      <div className="flex items-center justify-between gap-10">
        
          <PieCharts />
          <OrderChart />
      </div>

      {/* Revenue and CustomerMap with Skeleton Loading */}
      <div className="flex items-center justify-between gap-10">
          <Revenue />
          <CustomerMap />
      </div>
    </div>
  );
};

export default Dashboard;
