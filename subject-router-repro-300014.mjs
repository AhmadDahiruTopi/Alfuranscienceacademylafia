import { appRouter } from "./server/routers.ts";

const cookies = [];
const ctx = {
  req: { headers: {} },
  res: { cookie: (...args) => cookies.push(args) },
};

try {
  const result = await appRouter.createCaller(ctx).auth.staffLogin({
    username: "AFS-300014",
    password: "X0CHSIYOMX",
    rememberMe: false,
  });
  console.log(JSON.stringify({ success: result.success, role: result.user.role, username: result.user.username, mustChangePassword: result.user.mustChangePassword, cookieSet: cookies.length > 0 }, null, 2));
} catch (error) {
  console.log(JSON.stringify({ name: error?.name, code: error?.code, message: error?.message }, null, 2));
}
