import { Card, Dropdown, message, Radio } from "antd";
import { useEffect, useState } from "react";
import { useUpdateUserManagementMutation } from "../features/userManagement/userManagementApi";

const UsermanagementTableRow = ({ item, list }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [updateUserManagement, { isLoading: isLoadingStatus }] =
    useUpdateUserManagementMutation(undefined, {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const [statusName, setStatusName] = useState(item.status);

  // Update statusName whenever item.status changes
  useEffect(() => {
    setStatusName(item.status);
  }, [item.status]);

  const handleRadioChange = async (e) => {
    try {
      const response = await updateUserManagement({
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

  return (
    <div className="grid grid-cols-8 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
      <div className="py-3 text-center">{list}</div>
      <div className="px-3 py-3 text-center">{item?.name}</div>
      <div className="px-3 py-3 text-center">{item.email}</div>
      <div className="px-4 py-3 text-center">{"Dhaka"}</div>
      <div className="px-4 py-3 text-center">{item.phone}</div>
      <div className="px-4 py-3 text-center">
        {new Date(item.updatedAt).toLocaleDateString("en-GB")}
      </div>
      <div className="py-3 text-center">
        {item?.orders === true ? "Yes" : "No"}
      </div>

      <div className="text-center">
        <Dropdown
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
          trigger={["click"]}
          disabled={item.userStatus === "blocked"}
          dropdownRender={() => (
            <Card className="shadow-lg w-52">
              <Radio.Group
                onChange={handleRadioChange}
                value={statusName} // Use statusName instead of item.userStatus
                disabled={isLoadingStatus}
                className="flex flex-col space-y-2"
              >
                <Radio value="active" className="font-semibold text-amber-700">
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
          <div className="py-1 transition duration-200 border border-red-500 rounded hover:bg-gray-100">
            <button
              className={`w-[180px] p-2.5 text-white rounded ${
                statusName === "blocked" ? "bg-red-600" : "bg-primary"
              }`}
            >
              {isLoadingStatus ? "Loading..." : statusName}{" "}
              {/* Use statusName here */}
            </button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default UsermanagementTableRow;
