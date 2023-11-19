'use client'
import { Box, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import { queries } from "@/queries/index.query";
import { Ticket } from "@/interface/ticket.interface";
import { TicketCard } from "../components/TicketCard";

export default function OrderHistory() {
  const {
    data: tickets,
    isSuccess,
    isLoading,
  } = queries.tickets.listAll();

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
          {
            tickets.data.map((ticket: Ticket) => {
              return (
                <TicketCard key={ticket.ID} ticket={ticket} />
              );
            })
          }
        </Stack>
      </Box>
    );
  }

  return null;
}
