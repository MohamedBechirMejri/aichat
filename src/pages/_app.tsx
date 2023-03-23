import { type AppType } from "next/dist/shared/lib/utils";

import { Nunito } from "next/font/google";

import "~/styles/globals.css";

const nunito = Nunito({ subsets: ["latin"] });

const AIChat: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className="h-[100svh] overflow-hidden bg-white bg-opacity-50 pt-8 backdrop-blur"
      style={nunito.style}
    >
      <Component {...pageProps} />
    </div>
  );
};

export default AIChat;
