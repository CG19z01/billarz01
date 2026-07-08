import Constants from 'expo-constants';

export function useAppInfo() {
  return {
    name: Constants.expoConfig?.name ?? 'Billard Score',
    version: Constants.expoConfig?.version ?? '1.0.0',
  };
}
