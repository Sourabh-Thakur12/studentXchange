import { Button } from '@/src/components/ui';
import { Linking, Text, View } from 'react-native';

export default function VerifyEmail() {
  return (
    <View className='bg-on-primary min-h-screen flex items-center'>
      <View className='p-8 rounded-3xl flex gap-5'>
        <Text className='text-3xl font-sand-bold'> Check your college email </Text>
        <Text className=''> We have sent a verification email to your {} address. Please check your inbox. Tap the link to verify to continue login. </Text>
        <Button Title='Open Email App' onPress={() => Linking.openURL('#')} />

        <Text>Didn't receive the email?
          <Text onPress={() => Linking.openURL('#')} className='text-blue-500'>Resend</Text>
        </Text>
      </View>

      <Text>Check your spam or junk folder</Text>
      <Text>Verify that you have entered the correct email address</Text>
    </View>
  );
}