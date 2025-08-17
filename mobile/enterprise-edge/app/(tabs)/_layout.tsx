import { ReportsProvider } from '../shared/ReportsContext';
import BottomNavigation from '@/components/BottomNavigation';

export default function TabLayout() {
  return (
    <ReportsProvider>
      <BottomNavigation/>
    </ReportsProvider>
  );
}