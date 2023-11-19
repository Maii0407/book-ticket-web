'use client'
import { Concert } from "@/interface/concert.interface";
import { queries } from "@/queries/index.query";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Button,
  ButtonGroup,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'

type Props = {
  concert: Concert
}

export const ConcertCard = (props: Props) => {
  const { concert } = props;

  const toast = useToast();

  const { mutateAsync } = queries.tickets.create();

  const handleBuyTicket = async (concertID: string) => {
    try {
      const response = await mutateAsync({ concertID })

      toast({
        title: 'Successfully buy ticket',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-left'
      });
    } catch (err: any) {
      const {
        error,
        statusCode,
        message
      } = err.response.data;

      toast({
        title: `${error || "Error Code:"} ${statusCode}`,
        description: Array.isArray(message) ? message.map((msg: string) => msg) : message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-left'
      })

      console.error(err);
    }
  }

  return (
    <Card variant="filled" direction={{ base: 'column', lg: 'row' }} overflow="hidden">
      <Image
        objectFit='cover'
        src={concert.imageURL}
        alt={concert.name}
      />
      <Stack>
        <CardBody>
          <Heading>{concert.name}</Heading>
          <Heading size="2">by {concert.artistName}</Heading>
          <Text py="2">Ticket Price: RM{concert.ticketPrice}</Text>
          <Text py="2">Available Tickets: {concert.availableTickets}</Text>
          <Text py="2">Ticket Price: {concert.availableTickets}</Text>
          <Text py="2">Concert Date: {new Date(concert.concertDate).toLocaleDateString()}</Text>
          <Text py="2">Venue: {concert.venue}</Text>
        </CardBody>

        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button
              variant='solid'
              colorScheme='blue'
              onClick={() => handleBuyTicket(concert.ID)}
            >
              Buy now
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  )
};