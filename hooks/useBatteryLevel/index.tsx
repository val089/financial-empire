import { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { BatteryModule } = NativeModules;

// i want use this hook only on phiysical devices, write some condition to check if the app is running on a simulator or emulator
// you can use the 'react-native-device-info' library to check if the device is a simulator or emulator
// import DeviceInfo from 'react-native-device-info';
// const isEmulator = DeviceInfo.isEmulatorSync();
// if (isEmulator) {
//   console.warn('useBatteryLevel hook is not supported on simulators/emulators.');
//   return null;
// }

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
