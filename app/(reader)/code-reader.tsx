import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";
import { Button, Sheet, Text, View, XStack } from "tamagui";

export default function CodeReader() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(null);
  const [data, setData] = useState(null);

  const [position, setPosition] = useState(0);
  const [open, setOpen] = useState(false);

  const snapPoints = [75];

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

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={true}
        open={open}
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        snapPointsMode="percent"
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="quick"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame
          padding="$4"
          justifyContent="center"
          alignItems="center"
          space="$5"
        >
          <Text>{type}</Text>
          <Text>{data}</Text>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
