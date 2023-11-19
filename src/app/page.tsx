'use client'
import { Concert } from "@/interface/concert.interface";
import { api } from "@/api/index.api";
import { ConcertCard } from "./components/ConcertCard";
import { Box, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [concerts, setConcerts] = useState([] as Concert[])

  const handleFetchConcerts = async () => {
    const response = await api.concerts.listAll()
    const concerts = response.data;
    setConcerts(concerts);
  }

  useEffect(() => {
    if (!concerts.length) {
      handleFetchConcerts();
    }
  }, [concerts])

  return (
    <Box padding="5px">
      <Stack
        gap="5"
        paddingX={{ base: '2', lg: '20' }}
      >
        {concerts
          ? concerts.map((concert: Concert) => {
            return <ConcertCard key={concert.ID} concert={concert} />
          })
          : null}
      </Stack>
    </Box>
  );
}
