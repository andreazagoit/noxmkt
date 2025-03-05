"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LottieProsp = {
  src: string;
};

const Lottie = ({ src }: LottieProsp) => {
  return <DotLottieReact src={src} loop autoplay height="100%" width="100%" />;
};

export default Lottie;
