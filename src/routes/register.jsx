import { Form, Input, Button, App } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../apis/authApis";

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

export default function RegisterPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { message } = App.useApp();
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      register(values);
      message.success("注册成功！");
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }

    navigate("/");
  };
  return (
    <>
      <h1>注册用户</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="name"
          label="用户名"
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
          name="email"
          label="电子邮箱"
          rules={[
            {
              type: "email",
              message: "不是一个有效的邮箱！",
            },
            {
              required: true,
              message: "请输入你的邮箱！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入你的密码！",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请重新输入密码！",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {isLoading ? "注册中" : "注册"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
