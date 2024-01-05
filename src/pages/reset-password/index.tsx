import Head from 'next/head';
import {
  HStack,
  Image,
  Text,
  Center,
  VStack,
  Input,
  Button,
  FormErrorMessage
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

interface SendEmailProps {
  email: string;
}

export default function Home() {
  const { push } = useRouter();
  const { requestReset } = useAuth();

  const sendEmailSchema = yup.object().shape({
    email: yup.string().required('Campo obrigatório')
  });

  const { register, handleSubmit, formState } = useForm<SendEmailProps>({
    resolver: yupResolver(sendEmailSchema),
    mode: 'onChange'
  });

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<SendEmailProps> = async data => {
    try {
      await requestReset(data.email);
    } catch (err) {
      toast.error('Falha ao enviar email');
    }
  };
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
            <VStack
              w="full"
              spacing="2rem"
              padding="2rem"
              as="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Text color="dark.50" fontSize="xl" textAlign="center">
                Confirme seu e-mail para receber o código de recuperação de
                senha.
              </Text>
              <VStack spacing="1rem" w="full">
                <Input
                  {...register('email')}
                  placeholder="email@email.com.br"
                  type="email"
                  padding="2rem"
                  borderRadius="lg"
                />
                <FormErrorMessage color="red">
                  {errors.email?.message}
                </FormErrorMessage>
              </VStack>
              <Button
                type="submit"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                borderRadius="lg"
                bgColor="primary.400"
                colorScheme="telegram"
                padding="2rem"
                fontWeight="bold"
                w="full"
              >
                Enviar
              </Button>
            </VStack>
          </Center>
        </VStack>
      </HStack>
    </>
  );
}
