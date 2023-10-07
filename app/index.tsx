import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Box, ChevronRight, QrCode, Trash, User } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, H3, ListItem, Separator, View, XStack, YStack } from "tamagui";

import { useSupabase } from "../lib/context/useSupabase";
import { Tables } from "../lib/types/database-custom";

export default function Inventory() {
  const router = useRouter();

  const { supabase } = useSupabase();
  const [items, setItems] = useState<Tables<"InventoryItems">[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await supabase.from("InventoryItems").select("*");
      if (!data) return;
      setItems(data);
    }

    fetchItems();
  }, []);

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
            onPress={() => router.push("/code-reader")}
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
        data={items}
        keyExtractor={(item) => item.id.toString()}
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
              title={`${item.reference} - ${item.quantity} unidades`}
              subTitle={item.container}
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
