import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { Session } from '@supabase/supabase-js';
import Avatar from './Avatar';
import useAuthentication from 'hooks/useAuthentication';
import useUserProfileQuery from 'api/queries/useUserProfileQuery';
import useUpdateUserProfileMutation from 'api/mutations/useUpdateUserProfileMutation';

export default function Account({ session }: { session: Session }) {
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const { logOut } = useAuthentication();

  const { data, isLoading: isUserProfileLoding } = useUserProfileQuery(
    session.user.id
  );
  const { mutate: updateProfile, isPending: isUserProfileUpdating } =
    useUpdateUserProfileMutation();

  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setWebsite(data.website);
      setAvatarUrl(data.avatar_url);
    }
  }, [data]);

  if (!data || isUserProfileLoding) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);

            updateProfile({
              username: data.username,
              website: data.website,
              avatar_url: data.avatar_url,
            });
          }}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          // label='Email'
          value={session?.user?.email}
          // disabled
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          // label='Username'
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          // label='Website'
          value={website || ''}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={isUserProfileUpdating ? 'Loading ...' : 'Update'}
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={isUserProfileLoding}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title='Sign Out' onPress={logOut} />
      </View>

      <Text className='font-interRegular text-h3'>100 999 678 234 569</Text>
    </View>
  );
}

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
