import { createFileRoute } from "@tanstack/react-router";
import SmokeyApp from "@/components/sgh/App";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smokey Grill Hut · Flame-Grilled Burgers & Shawarmas in Model Town, Lahore" },
      { name: "description", content: "Order sizzling grilled burgers, shawarmas, platters and more from Smokey Grill Hut, Model Town Lahore. Fast delivery, COD available." },
      { property: "og:title", content: "Smokey Grill Hut · Lahore" },
      { property: "og:description", content: "Smokey & grilled perfection since 2024. Order now via WhatsApp." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SmokeyApp />
      <Toaster theme="dark" position="top-center" richColors />
    </>
  );
}
