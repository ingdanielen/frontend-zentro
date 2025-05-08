import Hero from "@/pages/Home/Hero";
import NewArrivals from "@/pages/Home/NewArrivals";
import TopSellings from "@/pages/Home/TopSellings";
import Highlighted from "@/pages/Home/Highlighted";
import HappyCustomers from "@/pages/Home/HappyCustomers";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-20 w-full">
        <Hero />
        <NewArrivals />
        <TopSellings />
      <Highlighted /> 
      <HappyCustomers />
    </div>
  );
}
