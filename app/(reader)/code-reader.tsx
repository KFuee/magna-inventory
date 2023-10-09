import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";
import { Button, Text, View, XStack } from "tamagui";

import LoadingSpinner from "../../components/LoadingSpinner";
import NewInventoryItemSheet from "../../components/NewInventoryItemSheet";

export default function CodeReader() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);

  const [type, setType] = useState<"code128" | "qr">(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setType(type);
    setData(data);
    setOpen(true);
  };

  if (hasPermission === null) {
    return <LoadingSpinner />;
  }

  if (hasPermission === false) {
    return (
      <View
        flex={1}
        backgroundColor="$gray10"
        alignItems="center"
        justifyContent="center"
      >
        <Text>
          No se aceptaron los permisos de la cámara. Por favor, permita el
          acceso a la cámara desde la configuración de tu dispositivo para poder
          escanear códigos.
        </Text>
      </View>
    );
  }

  return (
    <>
      <View
        flex={1}
        backgroundColor="$gray10"
      >
        <XStack
          zIndex={1}
          padding="$4"
          width="100%"
          space="$4"
          alignItems="center"
        >
          <Button
            circular
            icon={<ArrowLeft size={24} />}
            onPress={() => router.push("/")}
          />
        </XStack>
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={open ? undefined : handleBarCodeScanned}
        />
      </View>

      <NewInventoryItemSheet
        type={type}
        data={data}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
