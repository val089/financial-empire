import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

import {
  FPS_HISTORY_SIZE,
  FPS_REFERENCE,
  FPS_THRESHOLD_GREEN,
  FPS_THRESHOLD_YELLOW,
  FPS_UPDATE_INTERVAL,
  MEMORY_CHECK_INTERVAL,
  MEMORY_THRESHOLD_GREEN,
  MEMORY_THRESHOLD_YELLOW,
  RECENT_FPS_SAMPLES,
} from './consts';
import { FPSMonitorProps } from './types';

/**
 * Component for monitoring JavaScript framerate performance and memory usage in development.
 * To enable, set EXPO_PUBLIC_ENABLE_FPS_MONITOR=true in your environment.
 *
 * Note: The metrics displayed are approximations intended for relative performance
 * monitoring and easy detection of performance issues during development. Values
 * may differ from those shown in the official Expo Performance Monitor, which
 * has access to native metrics not available to JavaScript.
 *
 * The displayed FPS value specifically refers to the JavaScript thread performance,
 * not the UI thread. JavaScript FPS can exceed 60, even on devices with 60Hz displays,
 * as it represents how fast the JS thread can process frames rather than actual screen
 * refresh rate.
 */
const FPSMonitor: React.FC<FPSMonitorProps> = ({
  enabled = process.env.EXPO_PUBLIC_ENABLE_FPS_MONITOR === 'true',
}) => {
  const { top } = useSafeAreaInsets();

  // Performance metrics state
  const [fps, setFps] = useState<number>(FPS_REFERENCE);
  const [minFps, setMinFps] = useState<number>(FPS_REFERENCE);
  const [frameDrops, setFrameDrops] = useState<number>(0);
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
  const [totalMemory, setTotalMemory] = useState<number>(0);

  // Performance tracking refs
  const frameCount = useRef<number>(0);
  const lastUpdateTime = useRef<number>(Date.now());
  const droppedFrames = useRef<number>(0);
  const fpsHistory = useRef<number[]>([]);
  const recentFpsValues = useRef<number[]>([]);

  // Resource cleanup refs
  const animFrame = useRef<number | null>(null);
  const memoryInterval = useRef<NodeJS.Timeout | null>(null);
  const fpsInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run when component is enabled
    if (!enabled) {
      return undefined;
    }

    // Initialize memory measurement
    try {
      const total = DeviceInfo.getTotalMemorySync();
      setTotalMemory(total);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to get total memory:', error);
    }

    // Count frames using requestAnimationFrame
    const countFrame = () => {
      frameCount.current += 1;
      animFrame.current = requestAnimationFrame(countFrame);
    };

    // Start counting frames
    animFrame.current = requestAnimationFrame(countFrame);

    // Measure memory less frequently to reduce performance impact
    memoryInterval.current = setInterval(() => {
      try {
        const used = DeviceInfo.getUsedMemorySync();

        setMemoryUsage(used);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Failed to get memory usage:', error);
      }
    }, MEMORY_CHECK_INTERVAL);

    // Update FPS display at regular intervals
    fpsInterval.current = setInterval(() => {
      const now = Date.now();
      const elapsedSec = (now - lastUpdateTime.current) / 1000;

      if (elapsedSec > 0) {
        // Calculate current FPS based on frame count
        const currentFps = Math.round(frameCount.current / elapsedSec);

        // Reset counter for next measurement
        frameCount.current = 0;
        lastUpdateTime.current = now;

        // Add to recent values for averaging
        recentFpsValues.current.push(currentFps);

        // Keep only most recent samples
        if (recentFpsValues.current.length > RECENT_FPS_SAMPLES) {
          recentFpsValues.current.shift();
        }

        // Calculate average FPS from recent measurements
        const avgFps = Math.round(
          recentFpsValues.current.reduce((sum, val) => sum + val, 0) /
            recentFpsValues.current.length
        );

        // Track frame drop events
        // Count how many times FPS dropped below our performance threshold
        // This gives a more meaningful metric than trying to count individual frames
        if (avgFps < FPS_THRESHOLD_GREEN) {
          droppedFrames.current += 1;
          setFrameDrops(droppedFrames.current);
        }

        // Store FPS in history for min FPS tracking
        fpsHistory.current.push(avgFps);
        if (fpsHistory.current.length > FPS_HISTORY_SIZE) {
          fpsHistory.current.shift();
        }

        // Update minimum FPS
        if (fpsHistory.current.length > 0) {
          const currentMin = Math.min(...fpsHistory.current);
          setMinFps((prev) => (currentMin < prev ? currentMin : prev));
        }

        // Update displayed FPS
        setFps(avgFps);
      }
    }, FPS_UPDATE_INTERVAL);

    // Clean up resources on unmount
    return () => {
      if (animFrame.current !== null) {
        cancelAnimationFrame(animFrame.current);
      }

      if (fpsInterval.current !== null) {
        clearInterval(fpsInterval.current);
      }

      if (memoryInterval.current !== null) {
        clearInterval(memoryInterval.current);
      }
    };
  }, [enabled]);

  // Don't render when disabled
  if (!enabled) {
    return null;
  }

  const getFpsColor = (): string => {
    if (fps >= FPS_THRESHOLD_GREEN) {
      return 'text-green-500'; // Good performance
    }

    if (fps >= FPS_THRESHOLD_YELLOW) {
      return 'text-yellow-500'; // Moderate performance issues
    }

    return 'text-red-500'; // Significant performance issues
  };

  // Format memory size to MB
  const formatMemory = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const memoryPercentage: number =
    totalMemory > 0 ? (memoryUsage / totalMemory) * 100 : 0;

  const getMemoryColor = (): string => {
    if (memoryPercentage < MEMORY_THRESHOLD_GREEN) {
      return 'text-green-500'; // Good memory usage
    }

    if (memoryPercentage < MEMORY_THRESHOLD_YELLOW) {
      return 'text-yellow-500'; // Moderate memory usage
    }

    return 'text-red-500'; // High memory usage
  };

  return (
    <View
      className='absolute right-2.5 z-[9999] rounded-md bg-black/75 p-2'
      style={{ top: 50 + top }}
    >
      <Text className={`text-sm font-bold ${getFpsColor()}`}>FPS: {fps}</Text>
      <Text className='text-[10px] text-white'>
        Min: {minFps} | Drops: {frameDrops}
      </Text>
      <Text className={`text-sm font-bold ${getMemoryColor()}`}>
        RAM: {memoryPercentage.toFixed(0)}%
      </Text>
      <Text className='text-[10px] text-white'>
        {formatMemory(memoryUsage)} / {formatMemory(totalMemory)}
      </Text>
    </View>
  );
};

export default FPSMonitor;
