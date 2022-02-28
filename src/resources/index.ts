import { router as authRouter } from "./auth/auth.router";
import { router as userRouter } from "./user/user.router";
import { router as fundsRouter } from "./funds/fund.router";
import { router as donationsRouter } from "./donation/donation.router";

export const routes = {
  authRouter,
  userRouter,
  fundsRouter,
  donationsRouter,
};
