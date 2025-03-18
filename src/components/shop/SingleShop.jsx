import { useState } from "react";
import { PiMapPinAreaFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Modal, Button, message } from "antd";
import { useDeleteShopMutation, useUpdateShopStatusMutation } from "../../features/shop/shopApi";
import { baseURL } from "../../utils/BaseURL";
import Loading from "../Loading";

const SingleShop = ({ shop }) => {
  const [isModalVisible, setIsModalVisible] = useState({ off: false, delete: false });
  const [shopStatus, setShopStatus] = useState(shop.turnOffShop);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteShop, { isLoading: shopDeleteLoading }] = useDeleteShopMutation(undefined , { refetchOnFocus: true, refetchOnReconnect: true });
  const [updateShopStatus, { isLoading: shopStatusLoading }] = useUpdateShopStatusMutation(undefined , { refetchOnFocus: true, refetchOnReconnect: true });

  const handleModalToggle = (type, state) => {
    setIsModalVisible((prev) => ({ ...prev, [type]: state }));
  };

  const handleAction = async (type, id) => {
    setIsLoading(true); // 🔄 Show loading overlay
    try {
      if (type === "delete") {
        await deleteShop(id).unwrap();
        window.location.reload();
      } else if (type === "off") {
        const response = await updateShopStatus(id).unwrap();
        if (response.success) {
          setShopStatus((prev) => !prev); 
          message.success(shopStatus ? "Shop turned ON!" : "Shop turned OFF!");
        }
      }
    } catch (error) {
      message.error(`Error ${type === "delete" ? "deleting" : "updating"} shop.`);
    }
    setIsLoading(false);
    handleModalToggle(type, false);
  };

  return (
    <div className="relative w-full max-w-[360px] bg-white rounded-xl overflow-hidden">
      {/* 🔄 Full Page Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loading />
        </div>
      )}

      <img src={`${baseURL}/${shop?.banner}`} alt="Shop" className="w-full h-[250px]" loading="lazy" />
      <div className="px-5">
        <div className="flex gap-3">
          <img src={`${baseURL}/${shop?.logo}`} alt="Shop Logo" className="w-[70px] h-[70px] rounded-full p-2" loading="lazy" />
          <div className="py-2 text-[12px] font-semibold text-gray-700 space-y-2">
            <h3 className="text-xl text-gray-800">{shop?.shopName}</h3>
            <p className="flex items-center gap-2">
              <PiMapPinAreaFill className="text-xl" />
              <span>{shop.shopAddress} | 2.6 km</span>
            </p>
            <p>Open Time: {shop?.shopOpenTime}:00 AM</p>
            <p>Close Time: {shop?.shopCloseTime}:00 PM</p>
          </div>
        </div>

        <textarea placeholder="Description" className="border border-primary w-full p-2 h-[150px] rounded-xl focus:outline-none" />

        <div className="flex px-3 py-3 text-sm justify-evenly">
          <button
            onClick={() => handleModalToggle("off", true)}
            className={`px-4 py-1 font-semibold text-gray-700 border ${shopStatus ? "border-gray-600 opacity-50":"border-green-600"}  rounded-md`}
            disabled={shopStatusLoading || isLoading}
          >
            {shopStatus ? "Turn On" : "Turn Off"}
          </button>
          <button
            onClick={() => handleModalToggle("delete", true)}
            className="px-4 py-1 font-semibold text-gray-700 border border-red-400 rounded-md"
            disabled={shopDeleteLoading || isLoading}
          >
            Delete Shop
          </button>
          <Link to={`/shop-management/edit-shop/${shop._id}`} className="px-4 py-1 font-semibold text-gray-700 border rounded-md border-btnClr">
            Edit
          </Link>
        </div>
      </div>

      {/* Turn Off Modal */}
      <Modal
        open={isModalVisible.off}
        centered
        onCancel={() => handleModalToggle("off", false)}
        width={300}
        footer={[
          <Button key="no" onClick={() => handleModalToggle("off", false)} style={{ borderColor: "#C68C4E" }}>
            No
          </Button>,
          <Button
            key="yes"
            type="text"
            onClick={() => handleAction("off", shop._id)}
            style={{ backgroundColor: "red", color: "white" }}
            loading={shopStatusLoading}
          >
            Yes
          </Button>,
        ]}
      >
        <p className="pt-10 pb-4 text-xl font-bold">Are you sure you want to turn off this shop?</p>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={isModalVisible.delete}
        centered
        onCancel={() => handleModalToggle("delete", false)}
        width={300}
        footer={[
          <Button key="no" onClick={() => handleModalToggle("delete", false)} style={{ borderColor: "#C68C4E" }}>
            No
          </Button>,
          <Button
            key="yes"
            type="text"
            onClick={() => handleAction("delete", shop._id)}
            style={{ backgroundColor: "red", color: "white" }}
            loading={shopDeleteLoading}
          >
            Yes
          </Button>,
        ]}
      >
        <p className="pt-10 pb-4 text-xl font-bold">Are you sure you want to delete this shop?</p>
      </Modal>
    </div>
  );
};

export default SingleShop;
