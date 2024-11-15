import React from "react";
import { Text, Container } from "@react-three/uikit";
import { Button } from "@react-three/uikit-apfel";

interface UiBarProps {
  objects: {
    id: string;
    name: string;
    position: [number, number, number];
  }[];
  setFocus: (position: [number, number, number]) => void;
}

const UiBar: React.FC<UiBarProps> = ({ objects, setFocus }) => (
  <Container
    flexDirection="row"
    justifyContent="flex-start"
    alignItems="center"
    padding={16}
    style={{ backgroundColor: "#f0f0f0", borderRadius: "8px" }}
  >
    {objects.map((object) => (
      <Container key={object.id} hover={{ backgroundOpacity: 1 }} backgroundColor="grey">
        <Button onClick={() => setFocus(object.position)}>
          <Text color="black">{object.name}</Text>
        </Button>
      </Container>
    ))}
  </Container>
);

export default UiBar;

