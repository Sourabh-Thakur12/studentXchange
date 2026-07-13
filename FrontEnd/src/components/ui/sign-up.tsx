// import { View, Text } from 'react-native'
// import React from 'react'

// const SignUp = () => {
//   return (
//     <View className='bg-neutral-100 flex-1 justify-center items-center rounded-lg shadow-lg w-5/6 max-h-3/4 '>
//         <Text className='font-sand-bold text-primary text-3xl mx-12 my-2 text-center text-wrap'>Join campusXchange</Text>
//         <Text>The cozy corner of campus commerce</Text>
//     </View>
//   )
// }

// export default SignUp
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

type SignUpProps = {
  onSubmit: (name: string, email: string, password: string) => void;
};

export default function SignUp({ onSubmit }: SignUpProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <View className="flex-1 max-w-8/9 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center p-4"
      >
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-sand-bold text-primary">Join</Text>
            <Text className="text-3xl font-sand-bold text-primary">
              campusXchange
            </Text>
            <Text className="text-on-primary-fixed mt-2 text-sm">
              The cozy corner of campus commerce.
            </Text>
          </View>

          {/* Full Name Input */}
          <View className="mb-4">
            <Text className="text-xs text-on-primary-fixed font-medium mb-1.5 ml-1">
              Full Name
            </Text>
            <View className="bg-[#F6F5ED] border border-[#E2E0D1] rounded-xl px-4 py-3.5">
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                className="text-shadow-primary text-base"
                placeholderTextColor="#A1A898"
              />
            </View>
          </View>

          {/* College Email Input (Focused State representation) */}
          <View className="mb-1">
            <Text className="text-xs text-on-primary-fixedfont-medium mb-1.5 ml-1 ">
              College Email
            </Text>
            <View className="bg-white border border-[#E2E0D1] rounded-xl px-4 py-3.5">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="firstname.rollnumber@ddu.du.ac.in"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-shadow-primary text-base "
                placeholderTextColor="#A1A898"
              />
            </View>
          </View>
          <Text className="text-[10px] italic text-[#A1A898] ml-1 mb-4">
            Use your .edu or official college ID
          </Text>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-xs text-[#5C6652] font-medium mb-1.5 ml-1">
              Password
            </Text>
            <View className="bg-white border border-[#E2E0D1] rounded-xl px-4 py-3.5 flex-row items-center justify-between">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password..."
                secureTextEntry={!showPassword}
                className="flex-1 text-shadow-primary text-base"
                placeholderTextColor="#A1A898"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#2D3A1E"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Guidelines Checkbox */}
          <TouchableOpacity
            className="flex-row items-start pr-4 mb-8"
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}
          >
            <View
              className={`w-5 h-5 rounded border mt-0.5 items-center justify-center mr-3 ${agreed ? "bg-[#7BB044] border-[#7BB044]" : "bg-white border-[#D1D5CB]"}`}
            >
              {agreed && <Feather name="check" size={14} color="white" />}
            </View>
            <Text className="text-[#5C6652] text-sm leading-5">
              I agree to the{" "}
              <Text className="text-secondary font-medium">
                Campus Guidelines
              </Text>{" "}
              and promise to be a good neighbor.
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={() => onSubmit(name, email, password)}
            className="bg-primary-container rounded-xl py-4 flex-row justify-center items-center active:bg-[#6A9A3A]"
            activeOpacity={0.8}
          >
            <Text className="text-[#1A2610] font-sand-bold text-lg mr-2" >
              Start Exchanging
            </Text>
            <Feather name="arrow-right" size={20} color="#1A2610" />
          </TouchableOpacity>

          {/* Footer */}
          <View className="mt-6 items-center">
            <Text className="text-shadow-primary text-sm mb-1">
              Already have an account?
            </Text>
            <TouchableOpacity>
              <Link href="/(auth)/signIn">
                <Text className="text-secondary font-semibold text-base border-b border-secondary">
                  Sign In
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
