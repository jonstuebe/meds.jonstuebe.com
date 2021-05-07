import React, { useCallback, useMemo, useState } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { parseISO, isToday } from "date-fns";

const useMeds = () => {
  const [lastTaken, set] = useState(() =>
    localStorage.getItem("lastMeds")
      ? parseISO(localStorage.getItem("lastMeds") as string)
      : undefined
  );

  const setTaken = useCallback(() => {
    const time = new Date();
    localStorage.setItem("lastMeds", time.toISOString());
    set(time);
  }, []);

  const taken = useMemo(() => {
    if (lastTaken && isToday(lastTaken)) {
      return true;
    }

    return false;
  }, [lastTaken]);

  return {
    taken,
    setTaken,
  };
};

export default function App() {
  const { taken, setTaken } = useMeds();

  const onClick = useCallback(() => {
    setTaken();
  }, [setTaken]);

  return (
    <>
      <Flex justify="center" align="center" h="100vh">
        {taken ? (
          <Heading>Meds Taken</Heading>
        ) : (
          <Button colorScheme="blue" onClick={onClick}>
            Took my meds
          </Button>
        )}
      </Flex>
    </>
  );
}
