import { Button, message } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllQuery, useUpdateSettingsMutation } from "../features/settings/settingApi";
import arrow from "./../assets/icons/arrow.svg";

const Support = ({ placeholder }) => {
  const router = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [updateSettings] = useUpdateSettingsMutation();


   const { data, isLoading: dataLoading } = useGetAllQuery();
  
    // Load existing content when data is available
    useEffect(() => {
      if (data?.data?.support) {
        try {
          // Parse the JSON string to get the actual content
          const parsedContent = JSON.parse(data.data.support);
          setContent(parsedContent);
        } catch (error) {
          // If parsing fails, use the raw content
          setContent(data.data.support);
        }
      }
    }, [data]);

  // Configuration object for Jodit Editor with memoization
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing your support...",
      height: 500,
      minHeight: 300,
      maxHeight: 800,
    }),
    [placeholder]
  );

  const handleSaveTermsConditions = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API call
      const response = await updateSettings({ support: JSON.stringify(content) }).unwrap();
      message.success("Support Updated Successfully");
    } catch (error) {
      message.error("Failed to update support");
      console.error("Error updating support:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="pt-10 mb-4">
        <div className="py-3 rounded">
          <div onClick={() => router('/settings')} className="flex items-center gap-5">
            <img
              className="cursor-pointer inactive-icon"
              src={arrow}
              alt="Back"
            />
            <h3 className="text-xl font-medium">Support</h3>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>

      <Button
        loading={isLoading}
        type="primary"
        size="large"
        htmlType="submit"
        onClick={handleSaveTermsConditions}
        style={{ backgroundColor: "#C68C4E", borderColor: "#C68C4E" }}
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </section>
  );
};

export default Support;
