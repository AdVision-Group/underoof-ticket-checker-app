import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

export const checkCameraPermission = async () => {
  switch (Platform.OS) {
    case 'ios':
      return await check(PERMISSIONS.IOS.CAMERA);
    case 'android':
      return await check(PERMISSIONS.ANDROID.CAMERA);
    default:
      return RESULTS.UNAVAILABLE;
  }
};

export const requestCameraPermission = async () => {
  switch (Platform.OS) {
    case 'ios':
      return await request(PERMISSIONS.IOS.CAMERA);
    case 'android':
      console.log('requesting camera permission', PERMISSIONS.ANDROID.CAMERA);
      return await request(PERMISSIONS.ANDROID.CAMERA);
    default:
      return RESULTS.UNAVAILABLE;
  }
};
