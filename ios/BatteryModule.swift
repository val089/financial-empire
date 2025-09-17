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
class BatteryModule: RCTEventEmitter {
  
  override init() {
    super.init()
    UIDevice.current.isBatteryMonitoringEnabled = true
    NotificationCenter.default.addObserver(self, selector: #selector(self.batteryLevelDidChangeNotification), name: UIDevice.batteryLevelDidChangeNotification, object: nil
    )
  }

  deinit {
    NotificationCenter.default.removeObserver(self)
  }
  
  // handle events
  @objc func batteryLevelDidChange(notification: NSNotification) {
    let level = UIDevice.current.batteryLevel
    if level >= 0 {
      sendEvent(withName: "batteryLevelDidChange", body: Int(level * 100))
    }
  }
  
  // RCTEventEmitter
  override func supportedEvents() -> [String]! {
    return ["batteryLevelDidChange"]
  }
  
  @objc
  func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
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
