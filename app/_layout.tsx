import { Suspense, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider, Theme } from "tamagui";

import LoadingSpinner from "../components/LoadingSpinner";
import { MySafeAreaView } from "../components/MySafeAreaView";
import { SupabaseProvider } from "../lib/context/SupabaseProvider";
import config from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SupabaseProvider>
      <TamaguiProvider config={config}>
        <Suspense fallback={<LoadingSpinner />}>
          <Theme name={colorScheme}>
            <ThemeProvider
              value={colorScheme === "light" ? DefaultTheme : DarkTheme}
            >
              <MySafeAreaView>
                <Stack
                  screenOptions={{
                    headerShown: false
                  }}
                />
              </MySafeAreaView>
            </ThemeProvider>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </SupabaseProvider>
  );
}
