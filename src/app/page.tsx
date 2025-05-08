import Hero from "@/pages/Home/Hero";
import NewArrivals from "@/pages/Home/NewArrivals";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      
      <Hero />
      <NewArrivals />
    </div>
  );
}
