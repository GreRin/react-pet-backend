import { router as signupRouter } from './auth/signup/signup.router';
import { router as loginRouter } from './auth/login/login.router';
import { router as userRouter } from './user/user.router';
import { router as fundsRouter } from './funds/fund.router';
import { router as donationsRouter } from './donation/donation.router';
import { router as refreshTokenRouter } from './auth/refreshToken';

export const routes = {
  loginRouter,
  userRouter,
  fundsRouter,
  donationsRouter,
  signupRouter,
  refreshTokenRouter,
};
