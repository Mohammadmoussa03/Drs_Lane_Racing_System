import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Mock user for demo
const mockUser = {
  id: 1,
  first_name: "John",
  last_name: "Racer",
  profile_picture: null,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header user={mockUser} notificationCount={3} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
