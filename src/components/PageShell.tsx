import { ViewTransition } from "react";
import Footer from "@/components/Footer";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="relative isolate overflow-clip bg-paper text-ink">
        <main>{children}</main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
