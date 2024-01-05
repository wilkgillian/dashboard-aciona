import Head from 'next/head';
import {
  HStack,
  Image,
  Text,
  Center,
  VStack,
  Input,
  Button,
  Box
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import BackButton from '@/components/BackButton';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { resetPassword, email } = useAuth();

  async function defineNewPassword() {
    if (password !== confirmPassword) {
      return;
    }
    try {
      setLoading(true);
      const data = {
        email: email,
        password: password
      };
      await resetPassword(data);
    } catch (err) {
      toast.error('Falha ao redefinir senha!');
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
              <VStack spacing="1rem" w="full">
                <Box w="full">
                  <Text fontWeight="bold" mb="0.5rem">
                    Digite a nova senha:
                  </Text>
                  <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="********"
                    type="password"
                    padding="2rem"
                    borderRadius="lg"
                  />
                </Box>
                <Box w="full">
                  <Text fontWeight="bold" mb="0.5rem">
                    Confirme a nova senha:
                  </Text>
                  <Input
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="********"
                    type="password"
                    padding="2rem"
                    borderRadius="lg"
                  />
                </Box>
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
                onClick={defineNewPassword}
              >
                Salvar
              </Button>
            </VStack>
          </Center>
        </VStack>
      </HStack>
    </>
  );
}
