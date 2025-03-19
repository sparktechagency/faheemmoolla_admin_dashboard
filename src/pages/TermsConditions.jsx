import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Button, message } from "antd";
import arrow from "./../assets/icons/arrow.svg";
import { useUpdateSettingsMutation } from "../features/settings/settingApi";
import { useNavigate } from "react-router-dom";

const TermsConditions = ({ placeholder }) => {
  const router = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [updateSettings] = useUpdateSettingsMutation();

  // Configuration object for Jodit Editor with memoization
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing your Terms Conditions...",
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
      const response = await updateSettings({termsOfService:JSON.stringify(content)}).unwrap();
      message.success("Privacy Policy Updated Successfully");
    } catch (error) {
      message.error("Failed to update Privacy Policy");
      console.error("Error updating privacy policy:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="pt-10 mb-4">
        <div className="py-3 rounded">
          <div onClick={()=>router('/settings')} className="flex items-center gap-5">
            <img
              className="cursor-pointer inactive-icon"
              src={arrow}
              alt="Back"
            />
            <h3 className="text-xl font-medium">Terms And Conditions</h3>
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

export default TermsConditions;
