import "./globals.css";
import ProvidersWrapper from "./ProvidersWrapper";
import Header from "@/components/global/header/header";
import Footer from "@/components/global/footer/footer";

export const metadata = {
  title: "Vladyslav Broda",
  description: "Created by Vladyslav Broda",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>
          <Header />
          {children}
          <Footer />
        </ProvidersWrapper>
      </body>
    </html>
  );
}
