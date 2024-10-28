import Account from '../../components/Account';
import { useUserContext } from '../../contexts/UserContext';

const HomeScreen = () => {
  const { user, session } = useUserContext();

  return <>{session && user && <Account key={user.id} session={session} />}</>;
};

export default HomeScreen;
