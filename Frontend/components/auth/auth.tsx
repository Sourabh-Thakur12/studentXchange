import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const BLUE = '#0067B1';

type AuthInputProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
};

function BrandHeader() {
  return (
    <View className="items-center">
      <View className="h-[55px] w-[55px] items-center justify-center rounded-[13px] bg-white" style={styles.logoShadow}>
        <Ionicons name="location-outline" size={30} color={BLUE} />
      </View>

      <Text className="mt-[14px] text-center text-[29px] font-extrabold leading-[35px] text-[#0067B1]">
        CampusXchange
      </Text>
      <Text className="mt-[1px] text-center text-[15px] font-medium leading-[22px] text-[#4F535A]">
        The secure marketplace for your campus.
      </Text>
    </View>
  );
}

function AuthInput({ icon, label, placeholder, secureTextEntry = false }: AuthInputProps) {
  return (
    <View>
      <Text className="mb-[6px] text-[12px] font-extrabold leading-[15px] text-[#656B76]">
        {label}
      </Text>
      <View className="h-[43px] flex-row items-center rounded-[10px] bg-[#F1F2F4] px-[15px]">
        <Ionicons name={icon} size={19} color="#8D96A3" />
        <TextInput
          className="ml-[3px] flex-1 text-[14px] font-extrabold leading-[18px] text-[#9EA6B1]"
          placeholder={placeholder}
          placeholderTextColor="#9EA6B1"
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

function ForgotPasswordLink() {
  return (
    <Pressable className="mt-[5px] self-end">
      <Text className="text-[10px] font-extrabold leading-[14px] text-[#1673BA]">
        Forgot password?
      </Text>
    </Pressable>
  );
}

function GradientButton() {
  return (
    <Pressable className="mt-[35px] h-[39px] overflow-hidden rounded-[8px] active:opacity-90">
      <LinearGradient
        colors={['#0067B8', '#245BD9', '#7600CF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradientButton}>
        <Text className="text-center text-[12px] font-extrabold leading-[16px] text-white">
          Sign In
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

function StudentStatusLink() {
  return (
    <Text className="mt-[20px] text-center text-[12px] font-extrabold leading-[16px] text-[#5F6671]">
      New to CampusXchange?{' '}
      <Text className="text-[#1673BA]">Verify Student{'\n'}Status</Text>
    </Text>
  );
}

function SignInCard() {
  return (
    <View className="mt-[35px] w-[304px] max-w-[90%] rounded-[21px] bg-white px-[21px] pb-[25px] pt-[21px]" style={styles.cardShadow}>
      <Text className="text-[22px] font-extrabold leading-[28px] text-[#20242A]">
        Welcome Back
      </Text>
      <Text className="mt-[4px] text-[15px] font-semibold leading-[25px] text-[#777E89]">
        Sign in with your university credentials{'\n'}to continue.
      </Text>

      <View className="mt-[22px]">
        <AuthInput icon="mail-outline" label="University Email (@ddu.du.ac.in)" placeholder="student@ddu.du.ac.in" />
      </View>
      <View className="mt-[14px]">
        <AuthInput icon="lock-closed-outline" label="Password" placeholder="••••••••" secureTextEntry />
      </View>

      <ForgotPasswordLink />
      <GradientButton />
      <StudentStatusLink />
    </View>
  );
}

export function SignInScreen() {
  return (
    <View className="flex-1 items-center overflow-hidden bg-[#F8FAFD] pt-8">
      <LinearGradient
        colors={['#F7FAFD', '#FAFBFD', '#FEFBFF']}
        locations={[0, 0.56, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View className="w-full flex-1 items-center pt-[13px]">
        <BrandHeader />
        <SignInCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    elevation: 6,
    shadowColor: '#DDE5F0',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 24,
  },
  gradientButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoShadow: {
    elevation: 2,
    shadowColor: '#D8E2EF',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
  },
});
