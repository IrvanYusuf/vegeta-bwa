// components
import { CommonHeader } from "@/components/common/common-header";
import { CommonFooter } from "@/components/common/common-footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonHeader />
      <div className="lg:pt-44 md:pt-40 pt-24 px-2 md:px-0">{children}</div>
      <CommonFooter />
    </>
  );
}
