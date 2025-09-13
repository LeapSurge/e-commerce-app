export async function login(data) {
  const generateSimpleToken = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const token = btoa(`${timestamp}:${randomNumber}`);
    return token;
  };

  try {
    const response = await fetch("http://localhost:3000/users");
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "登录失败");
    }

    // 模拟验证和添加token
    const matchedUser = result.find((item) => item.name === data.user);
    if (matchedUser) {
      const token = generateSimpleToken();
      return { user: data.user, token };
    } else {
      throw new Error(result.message || "不存在用户");
    }
  } catch (error) {
    throw new Error(error.message || "网络请求失败，请稍后再试");
  }
}

export async function register(data) {
  try {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw new Error(error.message || "网络请求失败，请稍后再试");
  }
}
