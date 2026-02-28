// src/hooks/useAuth.ts

import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import authService from '../Services/auth.Service';
import type { LoginRequest, RegisterRequest } from '../Types/auth.types';
import { getErrorMessage } from '../API/api.errorHandler';

export const useAuth = () => {
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
    enabled: authService.isAuthenticated(),
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: () => navigate('/dashboard'),
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: () => navigate('/login'),
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) =>
      authService.changePassword({ oldPassword, newPassword }),
  });

  const logout = () => {
    authService.logout();
    navigate('/login');
  };

  return {
    user,
    isLoading,
    error: error ? getErrorMessage(error) : null,
    isAuthenticated: authService.isAuthenticated(),
    login: loginMutation.mutateAsync,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error ? getErrorMessage(loginMutation.error) : null,
    register: registerMutation.mutateAsync,
    registerLoading: registerMutation.isPending,
    registerError: registerMutation.error ? getErrorMessage(registerMutation.error) : null,
    logout,
    changePassword: changePasswordMutation.mutateAsync,
    changePasswordLoading: changePasswordMutation.isPending,
    changePasswordError: changePasswordMutation.error ? getErrorMessage(changePasswordMutation.error) : null,
  };
};

export default useAuth;