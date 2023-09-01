# Formaster

- Web form builder
- Build entirely in Next.js 13 with App directory
- Deployed to vercel, and available on [formaster.vantuch.dev](https://formaster.vantuch.dev)
- I wanted to make the styling clean and consistent so I created my own UI components and styles
- For icons I used [Feather icons](https://feathericons.com/)
- For authorization I used [NextAuth.js](https://next-auth.js.org/)
- For internationalization I used [next-intl](https://next-intl-docs.vercel.app/)
- For fields translation I used [DeepL API](https://www.deepl.com/)

## Setup

1. Copy or create `.env` file and set `NEXTAUTH_SECRET` (example secret: `TqMzyp+fJ20kAQPB/xhuRNN53Y3lV7bxczNa00PB41Q=`), and other variables
2. Run `yarn` to install packages
3. Start development server by running `yarn dev`
4. Log in with mock user or github account

```json
{
  "email:" "jnovak@seznam.cz",
  "password:" "Nov4k_j3_n3j"
}
```

5. When you first log into the app you will see two mock forms that you can edit, remove or test
6. To create new form navigate yourself to [Form builder](https://formaster.vantuch.dev/form-builder/)
7. To test forms navigate yourself to [Form tester](https://formaster.vantuch.dev/form-tester/)
