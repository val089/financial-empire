//
//  BatteryModule.m
//  financialempire
//
//  Created by Kamil Szerląg on 10/09/2025.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(BatteryModule, RCTEventEmitter)


// RCT_EXTERN_MODULE - is crucial for React Native to properly register the module.
RCT_EXTERN_METHOD(getBatteryLevel:(RCTPromiseResolveBlock)resolve rejector:(RCTPromiseRejectBlock)reject)

@end
