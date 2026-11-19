import { ViewTransition } from "react";
import Footer from "@/components/Footer";
import Backdrop from "@/components/Backdrop";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="relative isolate overflow-clip bg-paper text-ink">
        <Backdrop />
        <main>{children}</main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
