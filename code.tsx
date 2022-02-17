// import DiceIcon from "./DiceIcon";

const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Text } = widget;

function d(sides:number) {
  return Math.floor( Math.random() * sides ) + 1;
}

function Widget() {
  const [roll, setRoll] = useSyncedState('roll', 0);
  const [sides, setSides] = useSyncedState('sides', 20);

  usePropertyMenu(
    [
      {
        itemType: 'action',
        propertyName: 'reroll',
        tooltip: 'Reroll',
      },
    ],
    () => {
      setRoll( d( sides ) )
    },
  )


  return (
    <AutoLayout
      verticalAlignItems={'center'}
      horizontalAlignItems={'center'}
      spacing={8}
      padding={16}
      cornerRadius={16}
      fill={'#FFFFFF'}
      stroke={'#E6E6E6'}
    >
      {/* <DiceIcon sides={sides} color={'#ccc'} size={64} /> */}
      <Text fontSize={64} horizontalAlignText={'center'} width={88}
        onClick={() => {
          setRoll( d( sides ) )
        }}
      >
        {roll}
      </Text>
    </AutoLayout>
  )
}

widget.register(Widget)
