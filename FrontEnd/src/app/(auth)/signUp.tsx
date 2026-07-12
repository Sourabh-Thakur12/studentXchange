import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SignUp } from '@/src/components/ui/index'
import { api } from '@/src/utils/apiClient'
import { router } from 'expo-router'

const SignUpPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  
  const onSubmit = async (name: string, email: string, password: string) => {
    try {
      setError("")
      setLoading(true)
      const response = await api.post('/auth/register', { name, email, password })
      console.log(response.ok)
      if (!response.ok) {
        setError(response.error)
        console.log(response.error)
      } else {
        router.replace({
          pathname: './verifyEmail',
          params: { email },
        })
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : String(error))
      setLoading(false)
    } finally {
      setLoading(false)
    }
  };

  return (
    <View className='flex-1  bg-surface justify-center items-center'>
      <SignUp onSubmit={onSubmit} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
    </View>
  )
}

export default SignUpPage
