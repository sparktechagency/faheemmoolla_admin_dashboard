import { Button, Input, Form, message } from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";
import { forgotKeyIcon } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import setpassword from '../../assets/auth/setpassword.jpg';
// import { useChangePasswordMutation } from "../../features/auth/authApi";

export default function ChangePassword() {


  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="flex w-full">
        <div className="hidden bg-center bg-cover md:flex md:w-6/12 lg:w-8/12">
          <img src={setpassword} className="object-cover w-full" alt="Change Password Illustration" />
        </div>

        <div className="flex items-center w-full p-6 bg-white md:w-6/12 lg:w-4/12 md:p-12">
          <div className="flex flex-col items-center justify-center w-full max-w-md px-4 py-8 mx-auto border rounded-lg border-primary">
            <img src={forgotKeyIcon} alt="Key Icon" className="w-[60px] md:w-[60px]" />
            <h3 className="text-[30px] font-semibold leading-[38px] pb-2">Change Password</h3>
            <h2 className="text-sm md:text-base leading-[24px] font-normal mb-4 text-[#1E1E1E] text-center">
              Please enter your current password and new password.
            </h2>

            <Form layout="vertical"  className="w-full">
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: "Current password is required!" }]}
              >
                <Input.Password placeholder="Enter your current password" size="large" />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: "New password is required!" }]}
              >
                <Input.Password placeholder="Enter your new password" size="large" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your new password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm your new password" size="large" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                
                style={{ backgroundColor: "#C68C4E", borderColor: "#C68C4E" }}
              >
                Update Password
              </Button>
            </Form>
            
            <button 
             
              className="flex items-center gap-2 pt-5 text-base text-gray-500 cursor-pointer"
            >
              <FaArrowLeftLong />
              <h3>Back to Dashboard</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}