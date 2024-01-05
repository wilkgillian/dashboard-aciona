import { Button, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export default function BackButton() {
  const { back } = useRouter();
  return (
    <Button
      leftIcon={<Icon as={AiOutlineArrowLeft} />}
      mb="2rem"
      w="fit-content"
      onClick={back}
    >
      Voltar
    </Button>
  );
}
