import { Spinner } from "tamagui";

import { MainStack } from "./MainStack";

export default function LoadingSpinner() {
  return (
    <MainStack
      ai="center"
      jc="center"
    >
      <Spinner
        size="large"
        color="$green10"
      />
    </MainStack>
  );
}
