import { Concert } from "@/types/concert";
import { Card, CardBody, CardFooter, Heading, Image, Button, ButtonGroup, Stack, Text } from '@chakra-ui/react'

type Props = {
  concert: Concert
}

export const ConcertCard = (props: Props) => {
  const { concert } = props;

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
            <Button variant='solid' colorScheme='blue'>
              Buy now
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  )
};