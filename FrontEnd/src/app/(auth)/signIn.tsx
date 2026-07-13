import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { SignInScreen} from '@/src/components/ui/index'
import { api } from '@/src/utils/apiClient'
import { router } from 'expo-router';
import { SignInCard } from '@/src/components/ui/auth'





export const SignIn = () => {
  
  {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const onSubmit= async (email: string, password: string) => {
      try {
        setError("")
        setLoading(true)
        const response = await api.post('/auth/login', { email, password })
       
        if (response.ok) {
          router.replace('/')
          setLoading(false)
          
        } else {
          setError(response.error)
          alert(response.error)
          setLoading(false)
          
        }
        
      } catch (error) {
        console.log(error)
        setError(error instanceof Error ? error.message : String(error))
        setLoading(false)
        
      }
    }
    return (
      <View className="flex-1 items-center justify-center bg-surface">
      <SignInScreen onSubmit={onSubmit} />
        { error && <Text>{error}</Text> }
        { loading && <Text>Loading...</Text> }
     </View>
    )
  }
}

export default SignIn