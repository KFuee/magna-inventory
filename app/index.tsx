import { FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Box, ChevronRight, QrCode, Trash, User } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, H3, ListItem, Separator, View, XStack, YStack } from "tamagui";

export default function Inventory() {
  const router = useRouter();

  return (
    <YStack
      flex={1}
      backgroundColor="$backgroundStrong"
    >
      <XStack
        padding="$4"
        alignItems="center"
        justifyContent="space-between"
      >
        <H3>Inventario</H3>

        <XStack
          space="$2"
          alignItems="center"
        >
          <Button
            circular
            icon={QrCode}
            scaleIcon={1.5}
          />
          <Button
            circular
            icon={User}
            scaleIcon={1.5}
            onPress={() => router.push("/users/testuser")}
          />
        </XStack>
      </XStack>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <View
                width="$6"
                justifyContent="center"
                alignItems="center"
                backgroundColor="$color.red10Dark"
              >
                <Trash color="white" />
              </View>
            )}
          >
            <ListItem
              hoverTheme
              pressTheme
              title={`Item ${item}`}
              subTitle="Subtitle"
              icon={Box}
              iconAfter={ChevronRight}
            />
          </Swipeable>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </YStack>
  );
}
