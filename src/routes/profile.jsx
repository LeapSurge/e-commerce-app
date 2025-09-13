import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <h1>个人信息</h1>
      <div> 用户名： {user}</div>
    </>
  );
}
