//
//  BatteryModule.swift
//  financialempire
//
//  Created by Kamil Szerląg on 10/09/2025.
//

import Foundation
import UIKit
import React

@objc(BatteryModule)
class BatteryModule: NSObject {

  @objc
  func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    UIDevice.current.isBatteryMonitoringEnabled = true
    let level = UIDevice.current.batteryLevel
    if level < 0 {
      reject("E_BATTERY", "Battery level not available", nil)
    } else {
      resolve(Int(level * 100))
    }
  }

  @objc
  static func requireMainQueue() -> Bool {
    return true;
  }

}
