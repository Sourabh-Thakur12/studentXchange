import { View, Text } from 'react-native'
import React from 'react'
import { SignUp } from '@/src/components/ui/index'
import { api } from '@/src/utils/apiClient'

const SignUpPage = () => {
  const onSubmit = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password })
      console.log(response.ok)
      if(response.ok === false) {
        console.log(response.error)
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <View className='flex-1  bg-surface justify-center items-center'>
      <SignUp onSubmit={onSubmit} />
    </View>
  )
}

export default SignUpPage