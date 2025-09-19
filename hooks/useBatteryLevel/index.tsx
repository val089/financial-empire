import { useEffect, useState } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { BatteryModule } = NativeModules;
const batteryEmitter = new NativeEventEmitter(BatteryModule);

// Native modules work only on real devices, not on simulators/emulators

const useBatteryLevel = (pollingInterval: number = 5000) => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  const fetchBatteryLevel = async () => {
    try {
      const level = (await BatteryModule.getBatteryLevel()) as number;
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
    const subscription = batteryEmitter.addListener(
      'batteryLevelDidChange',
      (newLevel: number) => {
        setBatteryLevel(newLevel);
      }
    );

    return () => subscription.remove();
  }, [pollingInterval]);

  return batteryLevel;
};

export default useBatteryLevel;
