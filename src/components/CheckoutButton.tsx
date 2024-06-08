import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import UserProfileForm from '@/forms/user-profile/UserProfileForm';
import { useFetchMyUser } from '@/api/MyUserApi';
import { UserFormData } from '../forms/user-profile/UserProfileForm';

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isFetchUserLoading } = useFetchMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        登入結帳
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          去結帳
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          onSave={onCheckout}
          isLoading={isFetchUserLoading}
          currentUser={currentUser}
          title="確認訂單詳細信息"
          buttonText="繼續付款"
        />
        <span className="text-xs ml-10 text-red-600">
          結帳卡號: 4242 4242 4242 4242
        </span>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
