import { Modal, Select, message } from 'antd';
import { useState } from 'react';
import { useUpdatePayoutMutation } from '../../features/wallet/walletApi';


const PayoutTableBody = ({ item, sl }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(item.status || 'pending');
  const [updatePayout] = useUpdatePayoutMutation();

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    if (typeof dateString === 'string' && dateString.includes(",")) {
      return dateString;
    }

    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("en-GB", {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleStateChange = async (value) => {
    try {
      // Call the mutation with the id and data
      await updatePayout({
        id: item._id, // Using item._id as the identifier
        data: { status: value }
      }).unwrap();

      setSelectedStatus(value);
      message.success('Payout status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
      message.error('Failed to update payout status');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Table Row */}
      <div className="grid items-center grid-cols-10 gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap mx-2">
        <div className="flex items-center justify-center py-3">{sl}</div>
        <div className="flex items-center justify-center py-3">{item?.ownerId?.name}</div>
        <div className="flex items-center justify-center py-3">{item?.ownerId?.email}</div>
        <div className="flex items-center justify-center py-3">{item?.ownerId?.yocoMerchantAcc}</div>
        <div className="flex items-center justify-center py-3">{item?.ownerId?.bankHolderName}</div>
        <div className="flex items-center justify-center py-3">{item?.ownerId?.bankName}</div>
        <div className="flex items-center justify-center py-3">{item?.ownerId?.bankBranch}</div>
        <div className="flex items-center justify-center py-3">R {item?.payoutBalance}</div>
        <div className="col-span-2 py-2 border border-green-500 rounded">
          <div className="flex items-center justify-between gap-2 rounded">
            <div className="w-1/2 px-1">
              <Select
                value={selectedStatus}
                onChange={handleStateChange}
                style={{ width: '100%' }}
              >
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="approved">Approved</Select.Option>
                <Select.Option value="rejected">Rejected</Select.Option>
              </Select>
            </div>

            <div className="w-1/2 px-1">
              <button
                onClick={showModal}
                className="w-full p-1 text-sm text-white bg-[#C68C4E] rounded hover:bg-[#C68C4E] focus:outline-none focus:ring-1 "
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title={
          <div className="text-xl font-semibold text-[#C68C4E] border-b pb-2">
            Payout Details
          </div>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={600}
        bodyStyle={{ padding: '24px' }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Payout ID</p>
              <p className="font-medium">{item?.payoutId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{item?.ownerId?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium break-all">{item?.ownerId?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-medium text-lg text-[#C68C4E]">R {item?.payoutBalance}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selectedStatus === 'approved' ? 'bg-green-100 text-green-800' :
                selectedStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Request Date</p>
              <p className="font-medium">{formatDate(item?.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className='grid grid-cols-2'>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Account Name</p>
              <p className="font-medium">{item?.ownerId?.bankHolderName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="font-medium">{item?.ownerId?.yocoMerchantAcc}</p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Bank Name</p>
              <p className="font-medium">{item?.ownerId?.bankName}</p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Bank Branch Name</p>
              <p className="font-medium">{item?.ownerId?.bankBranch}</p>
            </div>

          </div>
        </div>
      </Modal>
    </>
  );
};

export default PayoutTableBody;
