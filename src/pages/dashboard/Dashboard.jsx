import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useAllCountAnalysisQuery } from "../../features/dashboard/dashboardApi";

const AnalysisCard = lazy(() => import("../../components/AnalysisCard"));
const CustomerMap = lazy(() => import("../../components/dashboard/CustomerMap"));
const OrderChart = lazy(() => import("../../components/dashboard/OrderChart"));
const PieCharts = lazy(() => import("../../components/dashboard/PieChart"));
const Revenue = lazy(() => import("../../components/dashboard/Revenue"));

import { Skeleton, Spin } from "antd";
import down from "../../assets/icons/down.png";
import Icon_Order from "../../assets/icons/Icon_Order.png";
import Items_Delivered from "../../assets/icons/Items_Delivered.png";
import OrderData from "../../assets/icons/orderData.png";
import revenue from "../../assets/icons/revenue.png";
import shop_order from "../../assets/icons/shop_order.png";

const Dashboard = () => {
  const {
    data: allShop,
    error: queryError,
    isLoading: queryLoading,
    isError,
    status,
  } = useAllCountAnalysisQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const navigate = useNavigate();





  const analysisCards = [
    {
      value: queryLoading ? <Spin size="small" /> : allShop?.data?.totalFoodSell,
      title: "Total Food Sell",
      icon: Icon_Order,
      percentage: "4% (30 days)",
      orderData: OrderData,
    },
    {
      value: queryLoading ? <Spin size="small" /> : `R ${allShop?.data?.totalRevenue?.toFixed(2)}`,
      title: "Total Revenue",
      icon: revenue,
      percentage: "12% (30 days)",
      orderData: down,
    },
    {
      value: queryLoading ? <Spin size="small" /> : allShop?.data?.totalUser || 0,
      title: "Total User",
      icon: shop_order,
    },
    {
      value: queryLoading ? <Spin size="small" /> : allShop?.data?.totalShop || 0,
      title: "Total Shop",
      icon: Items_Delivered,
    },
  ];

  return (
    <div className="flex flex-col gap-10 py-10">
      {/* Analysis Cards */}
      <div className="flex items-center gap-12">
        {analysisCards.map((card, index) => (
          <Suspense key={index} fallback={<Skeleton active className="w-full h-[300px] rounded-lg bg-gray-200" />}>
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

      {/* Charts Section */}
      <div className="flex items-center justify-between gap-10">
        <Suspense fallback={<Skeleton active />}>
          <PieCharts />
        </Suspense>
        <Suspense fallback={<Skeleton active />}>
          <OrderChart />
        </Suspense>
      </div>

      {/* Revenue and CustomerMap */}
      <div className="flex items-center justify-between gap-10">
        <Suspense fallback={<Skeleton active />}>
          <Revenue />
        </Suspense>
        <Suspense fallback={<Skeleton active />}>
          <CustomerMap />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
