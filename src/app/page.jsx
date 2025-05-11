"use client"
import React, { useEffect } from "react";
import Navbar from "@/components/landing-page/Navbar";
import HeroSection from "@/components/landing-page/HeroSection";
import FeaturesSection from "@/components/landing-page/FeatureSection";
import HowItWorks from "@/components/landing-page/HowItWorks";
import FAQ from "@/components/landing-page/FAQ";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/landing-page/Footer";
import { getStatus } from "@/api/APICall";

export default function Home() {
  useEffect (() => {
    getStatus()
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <HowItWorks />
    <FAQ />
    <CallToAction />
    <Footer />
  </div>
  );
}
