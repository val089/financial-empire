import { useState } from 'react';
import { Alert, StyleSheet, View, Button } from 'react-native';
import { supabase } from 'lib/supabase';
import { Input, PasswordInput } from 'components/atoms';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View className='px-4'>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label='Email'
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='email@address.com'
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <PasswordInput
          label='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder='Password'
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title='Sign in' disabled={loading} onPress={signInWithEmail} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});

export default LoginScreen;
