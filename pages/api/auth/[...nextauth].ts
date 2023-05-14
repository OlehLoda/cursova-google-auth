import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// ініціалізуємо та конфігуруємо провайдери для NextAuth
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "32090163210-25foauob4crobi9s1q7ir9lvbr0dc5ve.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
