import { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';

const { BatteryModule } = NativeModules;

// Native modules work only on real devices, not on simulators/emulators

const useBatteryLevel = (pollingInterval: number = 5000) => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  const fetchBatteryLevel = async () => {
    try {
      const level = await BatteryModule.getBatteryLevel();
      setBatteryLevel(level);
    } catch (error) {
      console.error('Error fetching battery level:', error);
      setBatteryLevel(null);
    }
  };

  useEffect(() => {
    fetchBatteryLevel();
    const interval = setInterval(fetchBatteryLevel, pollingInterval);

    return () => clearInterval(interval);
  }, [pollingInterval]);

  return batteryLevel;
};

export default useBatteryLevel;
