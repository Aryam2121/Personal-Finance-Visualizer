# 💰 Personal Finance Visualizer

A full-stack personal finance dashboard built with **Next.js 15**, **MongoDB**, **Tailwind CSS**, `@shadcn/ui`, and **Recharts**. It helps users track and visualize their spending and transactions in a user-friendly interface.

---

## 🛠 Tech Stack

- **Next.js 15**
- **React 19**
- **MongoDB (Mongoose)**
- **Tailwind CSS 4**
- **@shadcn/ui** (UI components)
- **Recharts** (for graphs)
- **TypeScript**

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/personal-finance-visualizer.git
cd personal-finance-visualizer
npm install
🌐 Environment Variables
Create a .env.local file in the root of your project and add:

bash
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/finance-db
🚀 Running the App
bash
Copy
Edit
npm run dev
Navigate to http://localhost:3000

📁 File Structure
bash
Copy
Edit
/app
  /api
    transactions.ts        # API Route for CRUD operations
  /models
    Transaction.ts         # Mongoose model
  /lib
    db.ts                  # MongoDB connection
  page.tsx                 # UI + form
📊 Features
Add, delete, and list transactions.

Filter by category or date (optional).

Visualize expenses using pie and bar charts.

🧠 Future Improvements
User Authentication

Budget Goals & Alerts

Monthly/Yearly Analytics

🧑‍💻 Author
Made with ❤️ by Aryaman Gupta



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
