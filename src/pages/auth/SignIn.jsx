import { Button, Input, Form } from "antd";
import { login, googleIcon, companyLogo } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { saveToken } from "../../features/auth/authService";
import { baseURL } from "../../utils/BaseURL";

export default function LoginPage() {
  const route = useNavigate();
  const [Login, { isLoading }] = useLoginMutation();

  const handleGoogleLogin = () => {
    // Redirect the user to initiate Google OAuth flow
    window.location.href = `${baseURL}/api/v1/auth/google`;
  };

  const onFinish = async (values) => {
    try {
      const response = await Login(values).unwrap();
      saveToken(response?.data?.token);
      localStorage.setItem("loginId", response?.data?.user?._id);
      // console.log(response.data.user._id)
      route("/");
    } catch (error) {
      console.error("Feild login, Please try again!!:", error);
      alert("Feild login, Please try again!!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="flex w-full">
        {/* Left Side - Image */}
        <div className="hidden bg-center bg-cover md:flex md:w-6/12 lg:w-8/12">
          <img
            src={login}
            className="object-cover w-full"
            alt="Login Illustration"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center w-full p-6 bg-white md:w-6/12 lg:w-4/12 md:p-12">
          <div className="flex flex-col items-center justify-center w-full max-w-md px-4 py-8 mx-auto border rounded-lg border-primary">
            <img
              src={companyLogo}
              alt="Ubuntu Bites Logo"
              className="w-[150px]"
            />
            <h2 className="text-sm md:text-base leading-[24px] font-normal mb-4 text-[#1E1E1E] text-center">
              Welcome back! Please enter your details.
            </h2>

            <Form layout="vertical" onFinish={onFinish} className="w-full">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  size="large"
                />
              </Form.Item>

              <div className="mb-4 text-sm text-end">
                <p
                  onClick={() => route("/auth/login/forgot_password")}
                  className="text-[#1E1E1E] cursor-pointer hover:underline"
                >
                  Forgot password?
                </p>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={isLoading}
                style={{ backgroundColor: "#C68C4E", borderColor: "#C68C4E" }}
              >
                Sign in
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
