import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Button, H1, Input, Paragraph, YStack } from "tamagui";
import * as z from "zod";

import Logo from "../../components/Logo";
import { MyStack } from "../../components/MyStack";
import { useSupabase } from "../../lib/context/useSupabase";

const FormSchema = z.object({
  email: z
    .string()
    .email("Por favor, introduce una dirección de correo válida."),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(64, "La contraseña no puede tener más de 64 caracteres.")
});

export default function SignIn() {
  const { signInWithPassword } = useSupabase();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { isSubmitting }
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await signInWithPassword(data.email, data.password);
    } catch (error: Error | unknown) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }

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
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Usuario"
                onChangeText={onChange}
                onBlur={() => {
                  trigger("email");
                  onBlur();
                }}
                value={value}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                autoComplete="email"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Contraseña"
                onChangeText={onChange}
                onBlur={() => {
                  trigger("password");
                  onBlur();
                }}
                value={value}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                keyboardType="default"
                secureTextEntry
              />
            )}
          />
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
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        Iniciar sesión
      </Button>
    </MyStack>
  );
}
