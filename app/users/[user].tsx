import { ArrowLeft } from "@tamagui/lucide-icons";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Button, H3, H6, XStack } from "tamagui";

import SpinnerDemo from "../../components/LoadingSpinner";
import { MainStack } from "../../components/MainStack";
import SelectDemo from "../../components/SelectDemo";
import SwitchDemo from "../../components/SwitchDemo";

export default function User() {
  const router = useRouter();
  const params = useGlobalSearchParams();

  return (
    <MainStack justifyContent="flex-start">
      <XStack
        alignItems="center"
        space="$2"
      >
        <Button
          icon={ArrowLeft}
          onPress={router.back}
        />
        <H3>{params.user}&apos;s user page</H3>
      </XStack>

      <H6>Some Tamagui components in action.</H6>

      <SelectDemo />
      <SpinnerDemo />
      <SwitchDemo />
    </MainStack>
  );
}
