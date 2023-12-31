import { signIn } from '@/service/signin';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signIn',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _) {
        if (!credentials) return null;

        const { email, password } = credentials;

        if (!email || !password) return null;

        try {
          const data = await signIn({ email, password });

          if (data) {
            const { user, accessToken } = data.result;

            return {
              id: user.id,
              email: user.email,
              accessToken,
            };
          }
        } catch (error) {
          return null;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      return token;
    },

    async session({ token, session }) {
      session.user = { email: token.user.email, id: token.user.id };
      session.accessToken = token.accessToken;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
