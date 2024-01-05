import Head from 'next/head';
import {
  HStack,
  Image,
  Text,
  Center,
  VStack,
  Input,
  Button
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import BackButton from '@/components/BackButton';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';

export default function Home() {
  const [code, setCode] = useState('0-0-0-0-0');
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { verifyCode, email } = useAuth();

  async function handleVerifyCode() {
    setLoading(true);
    try {
      const data = {
        email: email,
        code: code.replaceAll('-', '')
      };
      await verifyCode(data);
    } catch (err) {
      toast.error('Código inválido ou expirado!');
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>Recuperar senha</title>
        <meta name="description" content="Recuperar senha" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack h="100vh" bgColor="white" justifyContent="center">
        <VStack h="full" w="40%" justifyContent="center" alignItems="left">
          <BackButton />
          <Center
            padding="2rem"
            borderWidth={2}
            flexDir="column"
            borderColor="light.50"
            borderRadius="2xl"
            w="full"
            boxShadow="0px 2px 10px rgba(0,0,0, 0.3)"
          >
            <Image
              src="../../assets/logos/gazin-logo-login.svg"
              alt="logo gazin"
              h="4rem"
              alignSelf="center"
              mb="2rem"
            />
            <VStack w="full" spacing="2rem" padding="2rem">
              <Text color="dark.50" fontSize="xl" textAlign="center">
                Confirme o código que foi enviado para o seu email.
              </Text>
              <VStack spacing="1rem" w="full">
                <Input
                  as={InputMask}
                  fontSize="2xl"
                  fontWeight="bold"
                  mask="9-9-9-9-9"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  textAlign="center"
                  type="text"
                  padding="2rem"
                  borderRadius="lg"
                />
              </VStack>
              <Button
                isDisabled={loading}
                isLoading={loading}
                borderRadius="lg"
                bgColor="primary.400"
                colorScheme="telegram"
                padding="2rem"
                fontWeight="bold"
                w="full"
                onClick={handleVerifyCode}
              >
                Verificar
              </Button>
            </VStack>
          </Center>
        </VStack>
      </HStack>
    </>
  );
}
