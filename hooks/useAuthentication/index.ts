import { useUserContext } from '../../contexts/UserContext';
import { supabase } from '../../lib/supabase';

const useAuthentication = () => {
  const { setIsLoggedIn } = useUserContext();

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error.message);
      return;
    }

    setIsLoggedIn(false);
  };

  return { logOut };
};

export default useAuthentication;
