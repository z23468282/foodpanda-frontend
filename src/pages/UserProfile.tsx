import { useFetchMyUser, useUpdateMyUser } from '@/api/MyUserApi';
import UserProfileForm from '@/forms/user-profile/UserProfileForm';
import { Loader2 } from 'lucide-react';

const UserProfile = () => {
  const { currentUser, isLoading: isGetLoading } = useFetchMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return (
      <div className="flex justify-center ">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <span>無法載入個人資料頁面</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfile;
