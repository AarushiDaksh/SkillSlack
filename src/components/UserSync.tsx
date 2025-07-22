"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

export default function UserSync() {
  const { user, isLoaded } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded && user) {
      dispatch(
        setUser({
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: user.fullName,
          image: user.imageUrl,
        })
      );
    }
  }, [user, isLoaded, dispatch]);

  return null;
}
