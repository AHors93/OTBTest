This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Notes

First point, having read the Next docs, it can serve static files like images (for the background), but for speed I decided to opt against it. If I have time to refactor I would look at implementing this.

Second point, as we are using static json its not needed, but I would have used React Query to fetch data asynchronously, caching and background fetching etc. I am using it in my current role and just so clean!

Third point, at the moment the HotelList isn't very reusable, its pretty tightly tied to the hotel data that its being passed. With more time id like to make this much more reusable. In its current form it is relatively reusable, but with more time id create a component such as, 

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
 <List =<T,>({items, renderItem})/> 
 
 With List now being generic, it can accept any type of data. You can pass 'items' which could be array, or an array of objects, and a renderItem function that would render each item for you. renderItem would be a callback that would allow you to define how each item should be rendered. 

We implement a lot of components like this in my current role, as we have a lot of different data and types coming from lots of places within our app. For example, we are building a 'hub' for certain users within the app, and have built a 'section' that can be reused everywhere, as we have a lot of conditional rendering depending on the type of user. We use a lot of FlatLists, SectionList that native provides, which are really useful in this scenario.

Fourth point, expand the page so that if more than 3 hotels are rendered the page looks the same and the experience is smooth for the user

Fifth point, if i were to iterate further, i'd create a Card like component, for consistency and reusability as well as avoiding DRY

Final point, there is a flicker going on when you refresh the page, I think it might to do with the data rendering in the useEffect, would be one to look into in the next iteration
