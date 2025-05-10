"use client";
import { ThreeDots } from "react-loader-spinner";

export default function CustomLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#5865F2"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}