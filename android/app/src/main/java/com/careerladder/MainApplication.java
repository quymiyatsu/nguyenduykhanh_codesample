package com.careerladder;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import cl.json.RNSharePackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.imagepicker.ImagePickerPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;

import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static CallbackManager mCallbackManager = new CallbackManager.Factory().create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new FBSDKPackage(),
            new RNSharePackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new ImagePickerPackage(),
            new RNSensitiveInfoPackage(),
                    new FastImageViewPackage(),
                    new VectorIconsPackage(),
                    new RNI18nPackage(),
                    new RNFirebasePackage(),
                    new RNFirebaseAuthPackage(),
                    new FBSDKPackage(mCallbackManager)
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
