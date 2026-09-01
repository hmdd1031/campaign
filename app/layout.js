import "./globals.css";

export const metadata = {
  title: "BackDoor 개인정보 진단",
  description: "개인정보 노출 자가진단 체크리스트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
