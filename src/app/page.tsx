import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import Camp from "@/components/Camp";
import Features from "@/components/Features";

export default function Home() {
  return (
    <>
      <Hero/>
      <Camp/>
      <Features/>
    </>  
  );
}
