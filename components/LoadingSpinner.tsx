import { Spinner } from "tamagui";

import { MyStack } from "./MyStack";

export default function LoadingSpinner() {
  return (
    <MyStack
      ai="center"
      jc="center"
    >
      <Spinner
        size="large"
        color="$green10"
      />
    </MyStack>
  );
}
