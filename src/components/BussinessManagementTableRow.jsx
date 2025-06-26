import { Button, Card, Dropdown, Input, message, Radio } from "antd";
import { useEffect, useState } from "react";
import {
  useUpdateRevenueMutation,
  useUpdateStatusMutation,
} from "../features/bussinessManagement/bussinessApi";

const inputStyle = {
  width: "100%",
  height: "44px",
  background: "transparent",
  border: "1px solid #C68C4E",
  fontSize: "14px",
  borderRadius: "12px",
};

const BussinessManagementTableRow = ({ item, list }) => {
  console.log("sdfsdfdsfsd",item)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [revenueDropdown, setRevenueDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [statusName, setStatusName] = useState(item.status);
  const [updateRevenue, { isLoading: revenueLoading }] =
    useUpdateRevenueMutation();
  const [updateStatus, { isLoading: statusLoading }] =
    useUpdateStatusMutation();

  useEffect(() => {
    setStatusName(item.status);
  }, [item.status]);

  const handleRadioChange = async (e) => {
    try {
      const response = await updateStatus({
        id: item._id,
        status: e.target.value,
      });
      setStatusName(response?.data?.data?.status);

      if (response?.error) {
        message.error(
          response.error?.data?.message || "Failed to update status."
        );
      }
    } catch (error) {
      message.error(error?.data?.message || "An error occurred!");
    }
    setDropdownOpen(false);
  };

  const handleInputValue = (value) => {
    setInputValue(value);
  };

  const handleRevenue = async (id) => {
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) {
      message.error("Please enter a valid number for revenue.");
      return;
    }

    try {
      const response = await updateRevenue({
        id: id,
        revenue: numericValue,
      });

      if (response.data) {
        message.success("Revenue updated successfully.");
        setInputValue("");
        setRevenueDropdown(false);
      } else {
        message.error(
          response.error?.data?.message || "Failed to update revenue."
        );
      }
    } catch (error) {
      message.error(error?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="grid items-center grid-cols-9 pr-3 my-3 text-sm bg-gray-100 rounded-lg min-w-0">
      <div className="py-3 text-center whitespace-normal break-words min-w-0">{list}</div>
      <div className="px-3 py-3 text-center whitespace-normal break-words min-w-0">{item?.shopName}</div>
      <div className="px-3 py-3 text-start w-full whitespace-normal break-words min-w-0">{item?.userId?.email}</div>
      <div className="px-4 py-3 text-center whitespace-normal break-words min-w-0">{item?.shopAddress ? item?.shopAddress : "N/A"}</div>
      <div className="px-4 py-3 text-center whitespace-normal break-words min-w-0">{item?.userId?.phone}</div>
      <div className="px-4 py-3 text-center whitespace-normal break-words min-w-0">{item?.totalOrders}</div>
      <div className="py-3 text-center whitespace-normal break-words min-w-0">{item.revenue}%</div>
      <div className="col-span-2 border py-1 border-green-500 rounded">
        <div className="flex items-stretch h-full">
          <div className="w-1/2 px-1 flex">
            <Dropdown
              open={revenueDropdown}
              onOpenChange={setRevenueDropdown}
              trigger={["click"]}
              dropdownRender={() => (
                <Card className="flex flex-col gap-3 shadow-lg w-[300px]">
                  <h2 className="text-[#464749] font-bold text-[20px]">
                    Update Revenue
                  </h2>
                  <div className="bg-[#C68C4E] w-full h-[1px] mt-3"></div>

                  <Input
                    type="number"
                    onChange={(e) => handleInputValue(e.target.value)}
                    className="mt-3"
                    style={inputStyle}
                    value={inputValue}
                  />

                  <Button
                    onClick={() => handleRevenue(item._id)}
                    type="text"
                    htmlType="submit"
                    className="w-full mt-3"
                    style={{
                      height: "40px",
                      background: "#B47000",
                      color: "white",
                    }}
                    disabled={revenueLoading}
                  >
                    {revenueLoading ? "Saving..." : "Save"}
                  </Button>
                </Card>
              )}
              placement="bottomRight"
            >
              <div className="w-full flex">
                <button className="w-full p-2.5 text-white rounded bg-primary hover:bg-opacity-90 transition-colors flex items-center justify-center h-full">
                  Update Revenue
                </button>
              </div>
            </Dropdown>
          </div>

          <div className="w-1/2 px-1 flex">
            <Dropdown
              open={dropdownOpen}
              onOpenChange={setDropdownOpen}
              trigger={["click"]}
              disabled={item.userStatus === "blocked"}
              dropdownRender={() => (
                <Card className="shadow-lg w-52">
                  <Radio.Group
                    onChange={handleRadioChange}
                    value={statusName}
                    disabled={statusLoading}
                    className="flex flex-col space-y-2"
                  >
                    <Radio
                      value="active"
                      className="font-semibold text-amber-700"
                    >
                      Active
                    </Radio>
                    <Radio value="blocked" className="text-black">
                      Blocked
                    </Radio>
                  </Radio.Group>
                </Card>
              )}
              placement="bottomRight"
            >
              <div className="w-full flex">
                <button
                  className={`w-full p-2.5 text-white rounded transition-colors hover:bg-opacity-90 flex items-center justify-center h-full ${statusName === "blocked" ? "bg-red-600" : "bg-primary"
                    }`}
                >
                  {statusLoading ? "Loading..." : statusName}
                </button>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BussinessManagementTableRow;