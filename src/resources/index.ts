import { router as loginRouter } from "./auth/auth.router";
import { router as userRouter } from "./user/user.router";
import { router as fundsRouter } from "./funds/fund.router";
import { router as donationsRouter } from "./donation/donation.router";

export const routes = {
  loginRouter,
  userRouter,
  fundsRouter,
  donationsRouter,
};
