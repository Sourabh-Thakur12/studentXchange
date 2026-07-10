import { Button } from "@/src/components/ui";
import { api } from "@/src/utils/apiClient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View, Platform } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as Linking from "expo-linking";

export default function VerifyEmail() {
  const { email, userId, secret } = useLocalSearchParams<{
    email?: string | string[];
    userId?: string | string[];
    secret?: string | string[];
  }>();
  const [status, setStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);
  const hasVerified = useRef(false);

  const getParam = (value?: string | string[]) =>
    Array.isArray(value) ? value[0] : value;

  // const tempURL =
  //   "http://localhost:3000/verify-email?userId=6a4bed97002c8f500f04&secret=07b90527a5b155aaa10920724299db01f7512113e5e6fbfdee9804118cfe79a072cf24f8cfc640bf1e6cff97a489ddfa6c9a48fe09ddc77fe982dde2597637616f2e9645af6bebc750a6f54d37e85a7099c4f92826a892c6ed1ce2ecda0c84472ed816d88c06da754044f2ff80b82be61c30fab33d98df6d994d9ae4e99edd46&expire=2026-07-06T19%3A02%3A02.318%2B00%3A00";
  // const emailAddress = tempURL.includes("email=")
  //   ? tempURL.split("email=")[1].split("&")[0]
  //   : null;
  // const verificationUserId = tempURL.includes("userId=")
  //   ? tempURL.split("userId=")[1].split("&")[0]
  //   : null;
  // const verificationSecret = tempURL.includes("secret=")
  //   ? tempURL.split("secret=")[1].split("&")[0]
  //   : null;

  const emailAddress = getParam(email);
  const verificationUserId = getParam(userId);
  const verificationSecret = getParam(secret);
  console.log("emailAddress", emailAddress, "verificationUserId", verificationUserId, "verificationSecret", verificationSecret);

  const openEmailApp = async () => {
    try {
      if (Platform.OS === "android") {
        const packageName = "com.google.android.gm";
        IntentLauncher.openApplication(packageName);
      }
    } catch (error) {
      console.error(`OpenEmailbox > android > ${error}`);
    }
  };

  const openExpoApp = async () => {
    try {
      const url = "campusxchange://inbox"
      console.log("url", url);
      // Linking.openURL(url)
      window.location.href = url;
    } catch (error) {
      console.error(`OpenExpoApp > ${error}`);
    }
  };

  useEffect(() => {
    if (!verificationUserId || !verificationSecret || hasVerified.current) {
      return;
    }

    hasVerified.current = true;

    const verifyEmail = async () => {
      setStatus("verifying");
      setMessage("Verifying your email...");

      const query = new URLSearchParams({
        userId: verificationUserId,
        secret: verificationSecret,
      }).toString();
      const response = await api.get(`/auth/verify-email?${query}`);

      if (!response.ok) {
        setStatus("error");
        setMessage(response.error);
        return;
      }

      setStatus("success");
      setMessage("Email verified successfully. Redirecting to sign in...");

      setTimeout(() => {
        router.replace("/(auth)/signIn");
      }, 1200);
    };

    verifyEmail();
  }, [verificationSecret, verificationUserId]);

  return (
    <View className="bg-on-primary min-h-screen flex items-center">
      <View className="p-8 rounded-3xl flex gap-5">
        <Text className="text-3xl font-sand-bold">
          {status === "verifying"
            ? "Verifying email"
            : "Check your college email"}
        </Text>

        {verificationUserId && verificationSecret ? (
          <View className="flex gap-3">
            {status === "verifying" && <ActivityIndicator />}
            <Text>{message}</Text>
            {status === "error" && (
              <Button
                Title="Back to Sign In"
                onPress={() => router.replace("/(auth)/signIn")}
              />
            )}
          </View>
        ) : (
          <>
            <Text>
              We have sent a verification email
              {emailAddress ? ` to ${emailAddress}` : ""}. Please check your
              inbox. Tap the link to verify and continue to sign in.
            </Text>
              <Button Title="Open Email App" onPress={openEmailApp} />
              <Button Title="Test" onPress={openExpoApp} />
          </>
        )}

        <Text>Didn't receive the email?</Text>
      </View>

      <Text>Check your spam or junk folder</Text>
      <Text>Verify that you have entered the correct email address</Text>
    </View>
  );
}
