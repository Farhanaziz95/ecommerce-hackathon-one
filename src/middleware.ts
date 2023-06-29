import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/","/:path*","/product_detail","/product_detail/:path*"]
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };