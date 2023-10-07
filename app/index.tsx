import { Link } from "expo-router";
import { Button, H1, Input, Paragraph, YStack } from "tamagui";

import Logo from "../components/Logo";
import { MyStack } from "../components/MyStack";

export default function Home() {
  return (
    <MyStack>
      <YStack
        alignItems="flex-start"
        space="$4"
      >
        <YStack space="$4">
          <Logo />

          <YStack space="$2">
            <H1 fontWeight={"bold"}>Bienvenido</H1>
            <Paragraph>
              Magna Inventory te permite llevar el control del almacén desde tu
              dispositivo móvil. Inicia sesión para comenzar.
            </Paragraph>
          </YStack>
        </YStack>

        <YStack
          width="100%"
          space="$2"
        >
          <Input placeholder="Usuario" />
          <Input placeholder="Contraseña" />
          <Link
            asChild
            href=""
          >
            <Paragraph
              color="$green10"
              fontWeight="bold"
              textAlign="right"
            >
              ¿Olvidaste tu contraseña?
            </Paragraph>
          </Link>
        </YStack>
      </YStack>

      <Button
        color="$green10"
        pressTheme
      >
        Iniciar sesión
      </Button>
    </MyStack>
  );
}
