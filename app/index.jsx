import { useRootNavigationState, Redirect } from 'expo-router';

export default function App() {
  return <Redirect href={'/splash'} />
}