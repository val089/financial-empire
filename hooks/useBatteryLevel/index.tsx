import { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import DeviceInfo from 'react-native-device-info';

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
    if (DeviceInfo.isEmulatorSync()) {
      console.warn(
        'useBatteryLevel hook is not supported on simulators/emulators.'
      );
      return;
    }

    fetchBatteryLevel();
    const interval = setInterval(fetchBatteryLevel, pollingInterval);

    return () => clearInterval(interval);
  }, [pollingInterval]);

  return batteryLevel;
};

export default useBatteryLevel;
