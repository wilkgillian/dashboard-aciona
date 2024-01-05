import { HStack, Box, Text, Center, VStack, Icon } from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai';

interface CardArrecadacaoProps {
  index: number;
  filial: string;
  value: number;
  percentage: number;
}

export default function CardArrecadacao({
  index,
  filial,
  value,
  percentage
}: CardArrecadacaoProps) {
  return (
    <HStack
      w="full"
      padding="1.5rem"
      bgColor="white"
      borderRadius="lg"
      justifyContent="space-between"
    >
      <HStack>
        <Center
          bgColor="light.300"
          borderRadius="lg"
          padding="1rem"
          w="fit-content"
        >
          <Text fontWeight="bold" color="dark.50" fontSize="lg">
            {index}
          </Text>
        </Center>
        <VStack ml="1rem" alignItems="left">
          <Text fontWeight="bold" fontSize="2xl">
            {filial}
          </Text>
          <HStack>
            <Text fontSize="lg" color="dark.50">
              R$ {value}
            </Text>
            <Box
              ml="1rem"
              bgColor="success.50"
              borderRadius="md"
              color="green"
              fontWeight="bold"
              px="1rem"
            >
              {percentage}%
            </Box>
          </HStack>
        </VStack>
      </HStack>
      <Icon alignSelf="right" as={AiOutlineEye} fontSize="3xl" />
    </HStack>
  );
}
