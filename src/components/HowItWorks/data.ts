import { Step } from './types';

export const steps: Step[] = [
  {
    id: 1,
    title: "Post a Request",
    subtitle:
      "Need help with a coding bug, UI feedback, or a quick design? Start by posting your request.",
    description: [
      "Choose your skill category (Design, Dev, Marketing...)",
      "Write a clear description and add tags",
      "Optionally set tokens as reward"
    ],
    image: "/icons/post-request.svg", // update with your asset
    imageAlt: "Posting request illustration",
  },
  {
    id: 2,
    title: "Get Matched",
    subtitle:
      "SkillSwap connects you with peers who have the right skills and are ready to help.",
    description: [
      "Receive offers from verified users",
      "Chat and collaborate live",
      "Swap tokens or return help later"
    ],
    image: "/icons/get-matched.svg", // update with your asset
    imageAlt: "Matching users illustration",
  },
  {
    id: 3,
    title: "Earn & Grow",
    subtitle:
      "Earn community tokens or return favors by helping others. Build your profile as a trusted contributor.",
    description: [
      "Earn tokens for every successful help",
      "Build a verifiable skill profile",
      "Access premium swaps with earned tokens"
    ],
    image: "/icons/earn-grow.svg", // update with your asset
    imageAlt: "Earning tokens illustration",
  },
];
