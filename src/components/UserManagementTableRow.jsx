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
    <div className="grid grid-cols-8 my-3 text-sm bg-gray-100 rounded-lg min-w-0">
      {/* Table Cells */}
      <div className="py-3 text-center whitespace-normal break-words min-w-0 px-1">
        {list}
      </div>
      <div className="px-1 py-3 text-center whitespace-normal break-words min-w-0">
        {item?.name}
      </div>
      <div className="px-1 py-3 text-center whitespace-normal break-words min-w-0">
        {item.email}
      </div>
      <div className="px-1 py-3 text-center whitespace-normal break-words min-w-0">
        {"Dhaka"}
      </div>
      <div className="px-1 py-3 text-center whitespace-normal break-words min-w-0">
        {item.phone}
      </div>
      <div className="px-1 py-3 text-center whitespace-normal break-words min-w-0">
        {new Date(item.updatedAt).toLocaleDateString("en-GB")}
      </div>
      <div className="px-1 py-3 text-center whitespace-normal break-words min-w-0">
        {item?.orders === true ? "Yes" : "No"}
      </div>

      {/* Status Dropdown */}
      <div className="px-1 py-1 border border-green-500 rounded text-center min-w-0 flex items-center justify-center">
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
          <div className="w-full max-w-[180px] mx-auto">
            <button
              className={`w-full p-2 text-white rounded ${
                statusName === "blocked" ? "bg-red-600" : "bg-primary"
              } hover:opacity-90 transition-opacity`}
            >
              {isLoadingStatus ? "Loading..." : statusName}
            </button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default UsermanagementTableRow;