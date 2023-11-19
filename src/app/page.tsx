'use client'
import { Concert } from "@/interface/concert.interface";
import { ConcertCard } from "./components/ConcertCard";
import { Box, Flex, Spinner, Stack } from "@chakra-ui/react";
import { queries } from "@/queries/index.query";

export default function Home() {
  const {
    data: concerts,
    isSuccess,
    isLoading,
    refetch
  } = queries.concerts.listAll();

  if (isLoading) {
    return (
      <Flex
        height="100vh"
        justifyContent="center"
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    )
  }

  if (isSuccess) {
    return (
      <Box padding="5px">
        <Stack
          gap="5"
          paddingX={{ base: '2', lg: '20' }}
        >
          {concerts
            ? concerts.data.map((concert: Concert) => {
              return <ConcertCard key={concert.ID} concert={concert} refetch={refetch} />
            })
            : null}
        </Stack>
      </Box>
    );
  }

  return null;
}
