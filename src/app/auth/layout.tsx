// components
import { LogoVegeta } from "@/components/icons";

// assets
import bgAuth from "@/assets/images/bg-authentication.jpg";
import bgAuthLeft from "@/assets/images/bg-authentication-left.jpg";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgAuth.src})` }}
    >
      {/* Desktop View */}
      <div className="hidden md:flex w-[1154px] h-[675px] bg-white drop-shadow-xl rounded-[28px] overflow-hidden">
        {/* Left Panel */}
        <div
          className="relative bg-carrot aspect-[443/758] flex justify-center items-center pr-[26px]"
          style={{
            backgroundImage: `url(${bgAuthLeft.src})`,
            backgroundSize: "cover",
          }}
        >
          <LogoVegeta className="w-[201px] h-[52px]" />
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-[26px] flex flex-1 ml-[-26px] z-10 justify-center items-center">
          <div className="w-[510px] h-full py-[48px] flex flex-col items-center justify-center gap-4">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden w-full h-full items-center justify-center px-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </main>
  );
}

export default Layout;
