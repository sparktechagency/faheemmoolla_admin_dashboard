import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetEarningsDetailQuery } from "../features/earning/earningApi";

const EarningTableRow = ({ item, list }) => {
  console.log(item)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [itemId, setItemId] = useState(null);

  const { data, isLoading } = useGetEarningsDetailQuery(itemId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const showViewModal = async (id) => {
    setIsViewModalOpen(true);
    setItemId(id);
  };

  const handleModalClose = () => {
    setIsViewModalOpen(false);
  };


  // console.log(data?.data)
  return (
    <>
      {/* Table Row */}
      <div className="grid grid-cols-10 pr-1 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap">
        <div className="py-3 text-center">{list}</div>
        <div className="px-3 py-3 text-center">{item?.orderNumber}</div>
        <div className="px-3 py-3 text-center">{item?.userId?.name}</div>
        <div className="px-4 py-3 text-center">{item?.shopId?.shopName}</div>
        <div className="px-4 py-3 text-center">
          {item.products.map((product) => product?.productName).join(", ")}
        </div>
        <div className="px-4 py-3 text-center">
          {item.products.map((product) => product?.price).join(", ")}
        </div>
        <div className="px-4 py-3 text-center">{"Dhaka"}</div>
        <div className="px-4 py-3 text-center">{item?.adminRevenue}</div>
        <div className="px-4 py-3 text-center">
          {formatDate(item.createdAt)}
        </div>

        <div className="flex items-center px-1 border border-green-500 rounded">
          <button
            onClick={() => showViewModal(item?._id)}
            className="w-full p-2 text-white transition duration-200 rounded bg-primary hover:bg-primary-dark"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isViewModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleModalClose}
                className="absolute text-gray-600 top-4 right-4 hover:text-gray-900 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="w-16 h-16 border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-gray-700">
                      Loading details...
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Image Section */}
                    <div className="mt-6">
                      <img
                        className="w-full h-auto rounded-md"
                        src="/banner.png"
                        alt="Order Product"
                      />
                    </div>

                    {/* Order Details */}
                    <section className="flex justify-center gap-5 item-center">
                      <section className="w-full p-2 border rounded-md border-primary">
                        <div className="">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <strong className="text-black">
                                User Name::
                              </strong>
                              <p className="text-gray-700">
                                {data?.data?.userId?.name}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <strong className="text-black">Item Name:</strong>
                              {data?.data?.products?.map((product, index) => (
                                <p key={index} className="text-gray-700">
                                  {product?.productName}
                                </p>
                              ))}
                            </div>

                            <div className="flex items-center gap-2">
                              <strong className="text-black">
                                Item Category:
                              </strong>
                              <p className="text-gray-700">Burger</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <strong className="text-black">Email: </strong>
                              <p className="text-gray-700">
                                {data?.data?.userId?.email}
                              </p>
                            </div>

                           

                            <div className="flex items-center gap-2">
                              <strong className="text-black">
                                Order Price:{" "}
                              </strong>
                              ${data?.data?.totalAmount}
                            </div>

                            <div className="flex items-center gap-2">
                              <strong className="text-black">
                                Revenue Amount:
                              </strong>
                              <p className="text-gray-700">{data?.data?.shopId?.revenue}%</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <strong className="text-black">
                                Payment By:{" "}
                              </strong>
                              <p className="text-gray-700">Visa Card</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <strong className="text-black">
                                Order Date:
                              </strong>
                              <p className="text-gray-700">
                                {/* {formatDate(item.createdAt)} */}
                                21-01-2025
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section className="w-full p-2 border rounded-md border-primary">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <strong className="text-black">Shop Name:</strong>
                            <p className="text-gray-700">{data?.data?.shopId?.shopName}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <strong className="text-black">Item Name:</strong>
                            {data?.data?.products?.map((product, index) => (
                              <p key={index} className="text-gray-700">
                                {product?.productName}
                              </p>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <strong className="text-black">
                              Item Category:
                            </strong>
                            <p className="text-gray-700">Burger</p>
                          </div>

                         

                          <div className="flex items-center gap-2">
                              <strong className="text-black">Location: </strong>
                              <p className="text-gray-700">{data?.data?.shopId?.shopAddress}</p>
                            </div>

                          <div className="flex items-center gap-2">
                            <strong className="text-black">Order Price:</strong>
                            ${data?.data?.totalAmount}
                          </div>

                          <div className="flex items-center gap-2">
                            <strong className="text-black">
                              Payment Received By:
                            </strong>
                            <p className="text-gray-700">Visa Card</p>
                          </div>
                        </div>
                      </section>
                    </section>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EarningTableRow;
