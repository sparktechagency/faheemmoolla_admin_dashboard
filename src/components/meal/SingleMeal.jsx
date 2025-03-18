import { useState, useEffect, useRef } from "react";
import { Modal, Button, message, Input, Form } from "antd";
import { baseURL } from "../../utils/BaseURL";
import Loading from "../Loading";
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateToggleStatusMutation,
} from "../../features/category/categoryApi";
import CategoryModal from "../CategoryModal";

const SingleMeal = ({ items }) => {
  const [isModalVisible, setIsModalVisible] = useState({
    off: false,
    delete: false,
    edit: false,
  });

  const [status, setStatus] = useState(items?.status === "active");
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: items?.name || "",
    status: items?.status || "active",
  });
  const [errors, setErrors] = useState({ categoryName: "", file: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(`${baseURL}/${items?.image}`);
  const hasUpdated = useRef(false);

  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation(undefined , { refetchOnFocus: true, refetchOnReconnect: true });
  const [updateToggleStatus, { isLoading: statusLoading }] =
    useUpdateToggleStatusMutation(undefined , { refetchOnFocus: true, refetchOnReconnect: true });
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation(undefined , { refetchOnFocus: true, refetchOnReconnect: true });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return setErrors((prev) => ({
        ...prev,
        file: "Invalid file type. Use JPEG, PNG, or JPG.",
      }));
    }

    if (file.size > 5 * 1024 * 1024) {
      return setErrors((prev) => ({
        ...prev,
        file: "File size must be < 5MB.",
      }));
    }

    setSelectedFile(file);
    setErrors((prev) => ({ ...prev, file: "" }));
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    let newErrors = { categoryName: "", file: "" };
    const name = categoryData.name.trim();

    if (!name) newErrors.categoryName = "Category name is required.";
    else if (name.length < 2)
      newErrors.categoryName = "Must be at least 2 characters.";
    else if (name.length > 50)
      newErrors.categoryName = "Must be under 50 characters.";

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleEdit = async () => {
    if (!validateForm()) return;

    console.log(selectedFile);

    const formData = new FormData();
    console.log(categoryData);
    formData.append("data", JSON.stringify(categoryData));

    if (selectedFile) formData.append("image", selectedFile);

    try {
      // Update category data via the API
      await updateCategory({ id: items._id, data: formData }).unwrap();
      message.success("Category updated successfully.");
      handleModalToggle("edit", false);
    } catch (error) {
      message.error("Error updating category.");
    }
  };

  const handleModalToggle = (type, state) => {
    if (type === "edit" && state) {
      setCategoryData({
        name: items?.name || "",
        status: items?.status || "active",
      });
      setPreviewUrl(`${baseURL}/${items?.image}`);
      setSelectedFile(null);
      setErrors({ categoryName: "", file: "" });
    }
    setIsModalVisible((prev) => ({ ...prev, [type]: state }));
  };

  const handleAction = async (type, id) => {
    setIsLoading(true);

    try {
      if (type === "delete") {
        await deleteCategory(id).unwrap();
        window.location.reload();
        message.success("Meal deleted successfully.");
      } else if (type === "off") {
        setStatus((prev) => !prev);
      }
    } catch {
      message.error(`Error performing ${type} action.`);
    } finally {
      setIsLoading(false);
      handleModalToggle(type, false);
    }
  };

  useEffect(() => {
    if (status !== null && !hasUpdated.current) {
      hasUpdated.current = true;
      updateToggleStatus({
        id: items._id,
        status: status ? "active" : "inactive",
      })
        .unwrap()
        .catch(() => message.error("Error updating status."))
        .finally(() => {
          setIsLoading(false);
          handleModalToggle("off", false);
          hasUpdated.current = false;
        });
    }
  }, [status, items._id, updateToggleStatus]);

  return (
    <div className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-sm">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <Loading />
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-4 border rounded-full w-28 h-28 bg-amber-50 border-amber-100">
          <img
            src={previewUrl}
            className="object-contain w-16 h-16 rounded-full"
            alt={items?.category}
          />
        </div>

        <div className="mb-6 text-start">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Category Name: {items?.name}
          </h3>
          <p className="text-gray-700">
            Status: {status ? "Active" : "Inactive"}
          </p>
        </div>

        <div className="flex w-full gap-2 mt-2">
          <button
            onClick={() => handleModalToggle("off", true)}
            className={`flex-1 py-2 text-gray-700 rounded-md hover:bg-gray-50 ${
              status
                ? "border border-green-500"
                : "border opacity-55 border-gray-300"
            }`}
          >
            {status ? "Turn Off" : "Turn On"}
          </button>

          <button
            onClick={() => handleModalToggle("delete", true)}
            className="flex-1 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={deleteLoading || isLoading}
          >
            Delete
          </button>

          <button
            onClick={() => handleModalToggle("edit", true)}
            className="flex-1 py-2 text-center text-gray-700 border border-orange-300 rounded-md hover:bg-orange-50"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Status Toggle Modal */}
      <Modal
        title={
          <h3 className="text-center">
            Turn {status ? "Off" : "On"} Category Status
          </h3>
        }
        width={380}
        open={isModalVisible.off}
        centered
        onOk={() => handleAction("off", items._id)}
        onCancel={() => handleModalToggle("off", false)}
        confirmLoading={statusLoading}
        footer={
          <div className="flex justify-center gap-3 pt-5">
            <button
              className="px-12 border rounded border-primary"
              onClick={() => handleModalToggle("off", false)}
            >
              No
            </button>
            <button
              className="px-10 py-2.5 text-white bg-red-500 border rounded"
              type="primary"
              loading={statusLoading}
              onClick={() => handleAction("off", items._id)}
            >
              {status ? "Turn Off" : "Turn On"}
            </button>
          </div>
        }
      >
        <p className="text-center">
          Are you sure you want to {status ? "disable" : "enable"} this
          category?
        </p>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title={<h3 className="text-center">Delete Category</h3>}
        width={380}
        open={isModalVisible.delete}
        centered
        onOk={() => handleAction("delete", items._id)}
        onCancel={() => handleModalToggle("delete", false)}
        confirmLoading={deleteLoading}
        footer={
          <div className="flex justify-center gap-3 pt-5">
            <button
              className="px-12 border rounded border-primary"
              onClick={() => handleModalToggle("delete", false)}
            >
              No
            </button>
            <button
              className="px-10 py-2.5 text-white bg-red-500 border rounded"
              type="primary"
              onClick={() => handleAction("delete", items._id)}
            >
              Delete
            </button>
          </div>
        }
      >
        <p className="text-center">
          Are you sure you want to delete this Category?
        </p>
      </Modal>

      {/* Edit Category Modal */}
      {isModalVisible.edit && (
        <CategoryModal
          categoryData={categoryData}
          errors={errors}
          handleEdit={handleEdit}
          handleFileChange={handleFileChange}
          handleModalToggle={handleModalToggle}
          previewUrl={previewUrl}
          selectedFile={selectedFile}
          setCategoryData={setCategoryData}
          setErrors={setErrors}
          loading={updateLoading}
        />
      )}
    </div>
  );
};

export default SingleMeal;
