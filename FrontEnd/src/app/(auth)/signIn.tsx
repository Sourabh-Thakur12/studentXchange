import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { SignInScreen} from '@/src/components/ui/index'
import { api } from '@/src/utils/apiClient'
import { router } from 'expo-router';
import { SignInCard } from '@/src/components/ui/auth'
import * as SecureStore from 'expo-secure-store'



type LoginRespose = {

  "success": boolean,
  "message": string,
  "data": {
    "user": {
      "id": string,
      "userId": string,
      "name": string,
      "email": string,
      "avatarUrl": string | null,
      "verified": boolean,
      "createdAt": string
    },
    "session": {
      "id": string,
      "userId": string,
      "secret": string,
      "provider": string,
      "providerUid": string,
      "expire": string
    }
  }

}





export const SignIn = () => {
  
  {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const onSubmit= async (email: string, password: string) => {
      try {
        setError("")
        setLoading(true)
        const response  = await api.post<LoginRespose>('/auth/login', { email, password })
       
        if (response.ok) {
          router.replace('/')
          setLoading(false)

          await SecureStore.setItemAsync("sessionSecret", response.data.data.session.secret)
          
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