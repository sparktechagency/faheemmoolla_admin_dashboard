import { Link } from "react-router-dom";
import BussinessManagementTable from "../../components/bussinessManagementTable";
import { useBussinessShopOfferQuery } from "../../features/bussinessManagement/bussinessApi";
import { Spin } from "antd";
const BusinessManagement = () => {
  const columns = [
    "SL",
    "Shop Name",
    "Email",
    "Location",
    "Phone Number",
    "Total Item Sell",
    "Revenue",
  ];

  const { data, isLoading } = useBussinessShopOfferQuery();

  return (
    <div className="w-full mt-10">
      <div className="flex flex-col gap-6 ">
        <div className="flex items-center justify-end">
          <Link
            to="/business-management/offer-review"
            className="px-16 py-2 font-semibold text-white rounded-md bg-primary"
          >
            Offer Review{" "}
            {isLoading ? <Spin size="small" /> : data?.data?.shops?.length}
          </Link>
        </div>

        <BussinessManagementTable columns={columns} />
      </div>
    </div>
  );
};

export default BusinessManagement;
