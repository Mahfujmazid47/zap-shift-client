import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading: isRoleLoading,refetch } = useQuery({
    enabled: !loading && !!user?.email, // wait for auth to finish
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data.role;
    }
  });

  return { role: roleData || 'user', isRoleLoading,refetch };
};

export default useUserRole;
