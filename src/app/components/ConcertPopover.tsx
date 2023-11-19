import { Concert } from '@/interface/concert.interface';
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody
} from '@chakra-ui/react'

type Props = {
  concert: Concert
}

export const ConcertPopover = (props: Props) => {
  const { concert } = props;
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='solid' colorScheme='blue'>
          Concert Details
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <Image
            objectFit='cover'
            src={concert.imageURL}
            alt={concert.name}
            borderRadius="5px"
          />
        </PopoverHeader>

        <PopoverBody>
          <Heading size="sm">{concert.name}</Heading>
          <Heading size="xs">by {concert.artistName}</Heading>
          <Text>Available Tickets: {concert.availableTickets}</Text>
          <Text>Concert Date: {new Date(concert.concertDate).toLocaleDateString()}</Text>
          <Text>Venue: {concert.venue}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}