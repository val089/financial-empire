//
//  BatteryModule.m
//  financialempire
//
//  Created by Kamil Szerląg on 10/09/2025.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BatteryModule, NSObject)


// RCT_EXTERN_MODULE - jest kluczowy dla React Native, aby moduł był prawidłowo zarejestrowany.
RCT_EXTERN_METHOD(getBatteryLevel:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
