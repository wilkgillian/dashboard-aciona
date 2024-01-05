import Head from 'next/head';
import {
  HStack,
  Box,
  Image,
  Text,
  Center,
  VStack,
  Input,
  Button,
  FormErrorMessage
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import mask from 'react-input-mask';
import { useAuth } from '@/hooks/useAuth';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useUser } from '@/hooks/useUser';

interface SignInProps {
  login: string;
  password: string;
}

export default function Home() {
  const { loadUser } = useUser();
  const { login } = useAuth();
  const { push } = useRouter();

  const signInSchema = yup.object().shape({
    login: yup.string().required('Campo obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .required('Campo obrigatório')
  });

  const { register, handleSubmit, formState } = useForm<SignInProps>({
    resolver: yupResolver(signInSchema),
    mode: 'onChange'
  });

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<SignInProps> = async infos => {
    try {
      const data = {
        ...infos,
        modulo: 2
      };
      const user = await login(data);
      await loadUser();
      if (user.perfil === 'Gerente Matriz') {
        push('/dashboard/matriz');
      } else if (user.perfil === 'Gerente Loja') {
        push('/dashboard/loja');
      } else {
        push('/dashboard/regional');
      }
    } catch (err) {
      toast.error('Falha ao fazer login.');
    }
  };
  return (
    <>
      <Head>
        <title>Painel lojista gazin</title>
        <meta name="description" content="Painel lojista gazin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack h="100vh" overflow="hidden">
        <VStack
          h="full"
          bgColor="white"
          w="50%"
          justifyContent="space-between"
          padding="4rem"
          position="absolute"
          left={0}
        >
          <Center>
            <Image
              src="../../assets/logos/gazin-logo-login.svg"
              alt="logo gazin"
              h="5rem"
              alignSelf="center"
            />
          </Center>
          <Center>
            <VStack>
              <Image
                src="../../assets/teo.svg"
                alt="man and woman"
                h="25rem"
                alignSelf="center"
                borderRadius="full"
              />
              <Text fontSize="5xl" fontWeight="bold" color="primary.400">
                Painel do Lojista
              </Text>
            </VStack>
          </Center>
        </VStack>
        <Box
          h="100vh"
          overflow="hidden"
          w="50%"
          display="flex"
          alignItems="center"
          position="absolute"
          zIndex={2}
          right={0}
        >
          <Box
            h="200vh"
            bgColor="primary.400"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="full"
            padding="4rem"
            borderLeftRadius="50%"
          >
            <VStack w="full">
              <Image
                src="../../assets/logos/aciona.svg"
                alt="logo aciona"
                h="10rem"
              />
              <Center
                padding="1rem"
                borderWidth={2}
                borderColor="light.50"
                borderRadius="2xl"
                w="50%"
                bgColor="rgba(255,255,255, 0.1)"
                boxShadow="0px 2px 10px white"
                _hover={{
                  transform: 'scale(1.01)',
                  transition: '0.2s'
                }}
              >
                <VStack
                  as="form"
                  w="full"
                  spacing="2rem"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Text color="white" fontWeight="bold" fontSize="2xl">
                    Acessar
                  </Text>
                  <VStack spacing="1rem" w="full">
                    <Input
                      {...register('login')}
                      color="white"
                      placeholder="Usuário"
                      type="text"
                      padding="1.5rem"
                    />
                    <FormErrorMessage color="red">
                      {errors.login?.message}
                    </FormErrorMessage>
                    <Input
                      {...register('password')}
                      color="white"
                      placeholder="Senha"
                      type="password"
                      padding="1.5rem"
                    />
                    <FormErrorMessage color="red">
                      {errors.password?.message}
                    </FormErrorMessage>
                  </VStack>
                  <Button
                    bgColor="white"
                    padding="1.5rem"
                    fontWeight="bold"
                    w="full"
                    type="submit"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Acessar
                  </Button>
                  <Text
                    color="white"
                    textDecoration="underline"
                    as={Link}
                    href="/reset-password"
                  >
                    Esqueceu sua senha?
                  </Text>
                </VStack>
              </Center>
            </VStack>
          </Box>
        </Box>
      </HStack>
    </>
  );
}
