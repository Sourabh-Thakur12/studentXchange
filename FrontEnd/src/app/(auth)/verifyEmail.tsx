import { Button, } from "@/src/components/ui";
import { api } from "@/src/utils/apiClient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Linking, Text, View, Platform } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";


export default function VerifyEmail() {
  const { email, userId, secret } = useLocalSearchParams<{
    email?: string | string[];
    userId?: string | string[];
    secret?: string | string[];
  }>();
  const [redirectTime, setRedirectTime] = useState<number>(5);
  const [status, setStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);
  const hasVerified = useRef(false);

  const getParam = (value?: string | string[]) =>
    Array.isArray(value) ? value[0] : value;

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
      const url = "campusxchange://signIn"
      console.log("url", url);
      Linking.openURL(url)
      // window.location.href = url;
    } catch (error) {
      console.error(`OpenExpoApp > ${error}`);
    }
  };

  useEffect(() => {
    if (status !== "success") return

    const interval = setInterval(() => {
      setRedirectTime(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [status]);

  useEffect(() => {
    if (redirectTime <= 0) {
      openExpoApp();
    }
  }, [redirectTime]);

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

      setRedirectTime(5);
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
          {
            (status === "verifying"
              ? "verifying email"
              : status === "success"
              ? "email verified successfully"
              : status === "error"
              ? "verification failed, please try again"
              : "Check your college email")
          }
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
                {status === "success" ? `Your ${emailAddress} is now active. You can now access the campusxchange marketplace ` :
              `We have sent a verification email to ${emailAddress}. Please check your inbox. Tap the link to verify and continue to sign in.`}
              </Text>
              {status === "success" ? <Button Title="Continue to login" onPress={openExpoApp} /> :
                <Button Title="Open Email App" onPress={openEmailApp} />}
              {/*<Button Title="Test" onPress={openExpoApp} />*/}
              {status === "success" && <Text>  Redirecting to login in {redirectTime} seconds... </Text> }
          </>
        )}

        <Text>Didn't receive the email?</Text>
      </View>

      <Text>Check your spam or junk folder</Text>
      <Text>Verify that you have entered the correct email address</Text>
    </View>
  );
}
