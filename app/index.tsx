import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  Box,
  ChevronRight,
  Filter,
  QrCode,
  Trash,
  User
} from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import {
  AnimatePresence,
  Button,
  H3,
  ListItem,
  Separator,
  View,
  XStack,
  YStack
} from "tamagui";

import { useSupabase } from "../lib/context/useSupabase";
import { Tables } from "../lib/types/database-custom";

export default function Inventory() {
  const router = useRouter();

  const { supabase } = useSupabase();
  const [items, setItems] = useState<Tables<"InventoryItems">[]>([]);

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      // Datos obtenidos por orden de creación descendente
      const { data } = await supabase
        .from("InventoryItems")
        .select("*")
        .order("created_at", { ascending: false });
      if (!data) return;
      setItems(data);
    }

    fetchItems();
  }, []);

  return (
    <View flex={1}>
      {/* Encabezado siempre visible */}
      <YStack
        zIndex={1}
        backgroundColor="$backgroundStrong"
        shadowColor="$green10"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.1}
        shadowRadius={8}
        elevation={4}
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
      </YStack>

      {/* FlatList que se desplaza debajo del encabezado */}
      <FlatList
        style={{ flex: 1 }}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Swipeable
            friction={2}
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
              title={item.container}
              subTitle={`${item.reference} (x${item.quantity}) - ${new Date(
                item.created_at
              ).toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}`}
              icon={Box}
              iconAfter={ChevronRight}
            />
          </Swipeable>
        )}
        ItemSeparatorComponent={() => <Separator />}
        onScrollBeginDrag={() => setShowButton(false)}
        onScrollEndDrag={() => setShowButton(true)}
      />

      {/* Botón flotante */}
      <AnimatePresence exitBeforeEnter>
        {showButton && (
          <Button
            animation="bouncy"
            size="$6"
            position="absolute"
            bottom="$0"
            right="$0"
            margin="$4"
            circular
            icon={Filter}
            scaleIcon={1.5}
            onPress={() => router.push("/inventory/add")}
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.1}
            shadowRadius={8}
            elevation={4}
            exitStyle={{ opacity: 0 }}
            enterStyle={{ opacity: 1 }}
          />
        )}
      </AnimatePresence>
    </View>
  );
}
