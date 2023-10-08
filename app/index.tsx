import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  Box,
  ChevronRight,
  Filter,
  QrCode,
  ScanLine,
  Trash,
  User
} from "@tamagui/lucide-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
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

import LoadingSpinner from "../components/LoadingSpinner";
import { useSupabase } from "../lib/context/useSupabase";
import { useInventoryItemStore } from "../lib/state/inventory-item";

export default function Inventory() {
  const router = useRouter();

  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(false);
  const [inventoryItems, setInventoryItems] = useInventoryItemStore((state) => [
    state.inventoryItems,
    state.setInventoryItems
  ]);

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        // Datos obtenidos por orden de creación descendente
        const { data } = await supabase
          .from("InventoryItems")
          .select("*")
          .order("created_at", { ascending: false });

        setInventoryItems(data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          "Error",
          error instanceof Error ? error.message : "Error desconocido"
        );
      }
    }

    fetchItems();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View flex={1}>
      {/* Encabezado siempre visible */}
      <YStack
        zIndex={1}
        backgroundColor="$backgroundStrong"
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
              icon={ScanLine}
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
        data={inventoryItems}
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
              icon={
                item.code_type == BarCodeScanner.Constants.BarCodeType.qr
                  ? QrCode
                  : Box
              }
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
            animation="quick"
            size="$6"
            position="absolute"
            bottom="$0"
            right="$0"
            margin="$4"
            circular
            icon={Filter}
            scaleIcon={1.5}
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
