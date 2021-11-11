import { router as userRouter } from "./users/user.router";
import { router as fundsRouter } from "./funds/fund.router";
import { router as donationsRouter } from "./donation/donation.router";

export const routes = {
  userRouter,
  fundsRouter,
  donationsRouter,
};
