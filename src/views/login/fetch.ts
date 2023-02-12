/* eslint-disable import/prefer-default-export */

const login = async (values: any) => {
  await new Promise<void>((r) => {
    setTimeout(() => r(), 1000);
  });
  if (values.username !== 'admin' || values.password !== 'admin') {
    throw new Error('用户名或密码错误');
  }
};

export { login };
