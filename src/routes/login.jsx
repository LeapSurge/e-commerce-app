import { Form, Input, Button, App } from "antd";
import { loginSuccess } from "../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../apis/authApis";
import { useState } from "react";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [form] = Form.useForm();
  const { message } = App.useApp();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { user, token } = await login(values);
      message.success("登录成功！");
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", user);
      dispatch(loginSuccess({ user, token }));
      navigate("/");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <h1>登录</h1>
      <Form
        form={form}
        {...formItemLayout}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="用户名"
          name="user"
          rules={[
            {
              required: true,
              message: "请输入你的用户名！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入你的密码！",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {isLoading ? "登录中" : "登录"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
