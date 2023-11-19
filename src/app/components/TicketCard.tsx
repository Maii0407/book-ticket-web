'use client'
import { Ticket } from "@/interface/ticket.interface";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Stack,
  Text,
  Flex
} from '@chakra-ui/react'
import QRCode from "react-qr-code";
import { ConcertPopover } from "./ConcertPopover";

type Props = {
  ticket: Ticket
}

export const TicketCard = (props: Props) => {
  const { ticket } = props;

  return (
    <Card
      direction={{ base: 'column', lg: 'row' }}
      variant='filled'
    >
      <Flex
        padding="15"
        justifyContent={{ base: 'center', lg: 'auto' }}
      >
        <QRCode value={JSON.stringify(ticket)} />
      </Flex>

      <Stack>
        <CardBody>
          <Heading size='md'>{ticket.concert.name}</Heading>
          <Heading size="sm">by {ticket.concert.artistName}</Heading>

          <Text>
            Ticket Holder: {ticket.customer.username}
          </Text>
          <Text>
            Purchased at: {new Date(ticket.purchaseDate).toLocaleDateString()}
          </Text>
          <Text>
            Price: RM{ticket.concert.ticketPrice}
          </Text>
        </CardBody>

        <CardFooter>
          <ConcertPopover concert={ticket.concert} />
        </CardFooter>
      </Stack>
    </Card>
  )
};