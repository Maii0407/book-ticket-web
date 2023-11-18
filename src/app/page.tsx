import { Concert } from "@/types/concert";
import { api } from "@/api/index.api";
import { ConcertCard } from "./components/ConcertCard";
import { Stack } from "@chakra-ui/react";

export default async function Home() {

  const response = await api.concerts.listAll()
  const concerts = response.data;

  return (
    <main style={{ padding: '10px' }}>
      <Stack gap="5">
        {concerts
          ? concerts.map((concert: Concert) => {
            return <ConcertCard key={concert.ID} concert={concert} />
          })
          : null}
      </Stack>
    </main>
  );
}
