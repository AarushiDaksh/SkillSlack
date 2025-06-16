// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/dashboard";
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.image = token.picture;
      return session;
    },
    async jwt({ token, account, profile }) {
  if (account && profile) {
    const githubProfile = profile as any; // ✅ Fix here
    token.picture = githubProfile.avatar_url;
    token.id = githubProfile.id.toString();
  }
  return token;
   } },
});

export { handler as GET, handler as POST };
