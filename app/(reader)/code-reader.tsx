import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";
import { Button, Text, View, XStack } from "tamagui";

export default function CodeReader() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && <Button onPress={() => setScanned(false)}>Scan again</Button>}
    </View>
  );
}
