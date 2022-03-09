import { router as loginRouter } from "./login/login.router";
import { router as userRouter } from "./user/user.router";
import { router as fundsRouter } from "./funds/fund.router";
import { router as donationsRouter } from "./donation/donation.router";

export const routes = {
  loginRouter,
  userRouter,
  fundsRouter,
  donationsRouter,
};
