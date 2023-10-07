import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";
import { Button, Text, View, XStack } from "tamagui";

import NewInventoryItemSheet from "../../components/NewInventoryItemSheet";

export default function CodeReader() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);

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
    if (
      type !== BarCodeScanner.Constants.BarCodeType.code128 &&
      type !== BarCodeScanner.Constants.BarCodeType.qr
    ) {
      Alert.alert(
        "Código no válido",
        "El código escaneado no es un código de barras o QR válido."
      );
      return;
    }

    setData(data);
    setOpen(true);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos para acceder a la cámara...</Text>;
  }
  if (hasPermission === false) {
    return (
      <Text>
        No se aceptaron los permisos de la cámara. Por favor, permita el acceso
        a la cámara desde la configuración de tu dispositivo para poder escanear
        códigos.
      </Text>
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
        data={data}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
