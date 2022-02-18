

const { widget } = figma;
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG } = widget;

const diceCollection = [20, 12, 10, 8, 6, 4, 2, 100]

const themes = [
  {
    tooltip: "White",
    option: "#ffffff",
    light: '#ffffff',
    medium: '#E6E6E6',
    dark: '#C4C4C4',
  },
  {
    tooltip: "Red",
    light: '#FFBDAE',
    medium: '#FF9790',
    dark: '#F24E1E',
    option: '#F24E1E',
  },
  {
    tooltip: "Yellow",
    light: '#FFEA79',
    medium: '#FFD233',
    dark: '#FFC700',
    option: '#FFC700',
  },
  {
    tooltip: "Green",
    light: '#93E396',
    medium: '#4ECB71',
    dark: '#0FA958',
    option: '#0FA958',
  },
  {
    tooltip: "Blue",
    light: '#B1D0FF',
    medium: '#85B6FF',
    dark: '#699BF7',
    option: '#699BF7',
  },
  {
    tooltip: "Violet",
    light: '#EABFFF',
    medium: '#D99BFF',
    dark: '#9747FF',
    option: '#9747FF',
  },
  {
    tooltip: "Brown",
    light: '#EAC287',
    medium: '#E4A951',
    dark: '#D27C2C',
    option: '#D27C2C',
  },
  {
    tooltip: "Charcoal",
    light: '#CED3DA',
    medium: '#C4C4C4',
    dark: '#545454',
    option: '#545454',
  }
]

function d(sides:number) {
  return Math.floor( Math.random() * sides ) + 1;
}

function DiceIcon ({ sides, size, color, ...props }) {

  const IconSrcs = {

    "100": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="${color}" d="M544 320h-64V144C480 82.25 429.8 32 368 32h-288C35.88 32 0 67.88 0 112V192c0 17.62 14.38 32 32 32h96v160c0 51.13 40.25 92.63 90.63 95.5l248 .5C527 480 576 431 576 370.6V352C576 334.4 561.6 320 544 320zM128 192H32V112C32 85.5 53.5 64 80 64S128 85.5 128 112V192zM288 384c0 35.25-28.75 64-64 64s-64-28.75-64-64V112C160 94 153.1 77.38 144 64h224C412.1 64 448 99.88 448 144V320h-128c-17.62 0-32 14.38-32 32V384zM544 370.6C544 413.3 509.3 448 466.6 448H295C310.4 431 320 408.6 320 384v-32h224V370.6z"/></svg>`,

    "20": `<svg data-prefix="fal" data-icon="dice-d20" class="svg-inline--fa fa-dice-d20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="${color}" d="M463.9 116.1L271.9 4.2C267 1.438 261.5 0 255.1 0s-10.1 1.438-15 4.25l-192 111.9C38.12 121.1 32 132.7 32 144.5v223c0 11.75 6.125 22.48 16.12 28.36l192 111.9C245 510.6 250.5 512 256 512s11-1.438 15.88-4.25l192-111.9C473.9 390 480 379.3 480 367.5v-223c0-11.8-6.1-23.4-16.1-28.4zM256 57.6L350.75 176H161.2L256 57.6zm-99.4 149.5h198.8L256 369.5l-99.4-162.4zM224.9 380l-137-17.13 44.5-133.3L224.9 380zm154.7-150.4l44.5 133.3-137 17.13 92.5-150.43zm7.3-59.7L294.65 54.8l138 80.76-45.75 34.34zm-261.8 0L79 135.2l138.5-80.76-92.4 115.46zm-16 28L64 333.3l.25-169.1 44.85 33.7zM240 414.1v56.38L117.4 398.8 240 414.1zm155.6-15.5L272 470.9v-56.76l123.6-15.54zm7.3-200.7l45.1-34.8-.25 168.8-44.85-134zM256.2 480z"/></svg>`,

    "12": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="${color}" d="M505.3 178.5l-47.73-95.39c-6.125-12.37-16.25-22.5-28.62-28.62l-95.39-47.73C324.6 2.25 314.9 0 304.9 0H207.1c-10 0-19.75 2.25-28.62 6.75L83.11 54.48C70.73 60.61 60.61 70.73 54.48 83.11l-47.73 95.39C2.25 187.4 0 197.1 0 207.1v97.77c0 10 2.25 19.75 6.75 28.62l47.73 95.4c6.125 12.37 16.25 22.5 28.62 28.62l95.4 47.73C187.4 509.6 197.1 512 207.1 512h97.75c10 0 19.75-2.25 28.62-6.75l95.4-47.73c12.37-6.125 22.5-16.25 28.62-28.62l47.73-95.38C509.6 324.6 512 314.9 512 304.9V207.1C512 197.1 509.8 187.4 505.3 178.5zM475.8 190.9l-95.63 109.2L272 246.1V140.2l157-42.87L475.8 190.9zM308.8 480h-105.5l-55.37-152L256 273.9L364.1 328L308.8 480zM199.5 32h113l82.75 41.38L256 111.4l-139.2-38L199.5 32zM83 97.38L240 140.2v105.9l-108.1 54L36.25 190.9L83 97.38zM32 312.5V234.6l81.96 93.83l48.42 132.9l-74.5-37.25L32 312.5zM424.1 424.1l-74.5 37.25l48.42-132.9L480 234.6V312.5L424.1 424.1z"/></svg>`,

    "10": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="${color}" d="M512 282.6c0-7.59-2.683-15.19-8.118-21.32l-224.1-250.6C273.5 3.5 264.8 0 256 0S238.5 3.5 232.2 10.62L8.151 261.3C2.671 267.4 0 274.1 0 282.5C0 291.4 3.662 300.2 10.8 306.5l224.1 197.5C240.9 509.4 248.5 512 256 512c7.5 0 15.12-2.615 21.12-7.99l224.1-197.5C508.4 300.2 512 291.4 512 282.6zM256 298L180.2 247.4l75.87-177l75.87 177L256 298zM148.8 239.8L47.79 265L221 71.12L148.8 239.8zM363.3 239.8L291 71.12L464.5 265L363.3 239.8zM49.04 297.6L157.3 270.5l82.75 55.25v140.3L49.04 297.6zM272 465.9v-140.1l82.75-55.25l108.1 27.12L272 465.9z"/></svg>`,

    "8":  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="${color}" d="M512 256c0-8.643-3.305-17.32-9.868-23.88l-222.2-222.3C273.3 3.26 264.6 0 256 0S238.7 3.26 232.1 9.887L9.868 232.1C3.305 238.7 0 247.4 0 256s3.305 17.27 9.868 23.84l222.2 222.3C238.7 508.7 247.2 512 256 512s17.26-3.26 23.89-9.887l222.2-222.3C508.7 273.4 512 264.7 512 256zM239.1 464.9L61.23 285.9l178.8 76.64V464.9zM239.1 327.8L43.72 243.7L239.1 47.26V327.8zM272 464.9v-102.3l178.8-76.64L272 464.9zM272 327.8v-280.6L468.3 243.7L272 327.8z"/></svg>`,

    "6":  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="${color}" d="M431.9 116.1l-192-111.9C235 1.438 229.5 0 224 0S213 1.438 208.1 4.25l-192 111.9C6.125 121.1 0 132.7 0 144.5v223c0 11.75 6.125 22.48 16.12 28.36l192 111.9C213 510.6 218.5 512 224 512s11-1.438 15.88-4.25l192-111.9C441.9 390 448 379.3 448 367.5V144.5C448 132.7 441.9 121.1 431.9 116.1zM224 32.1l175.8 102.9L224 237.5l-176.1-102.8L224 32.1zM32.25 162.6L208 265.1v205.4L32 367.5L32.25 162.6zM240 470.9V265.1L416 162.5l-.25 205.8L240 470.9z"/></svg>`,

    "4":  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="${color}" d="M512 309.1c0-7.05-2.318-14.15-7.127-20.07l-224-277.1C274.5 3.1 265.2 0 256 0C246.8 0 237.5 3.1 231.1 11.88l-224 277.1C2.318 294.9 0 302 0 309.1c0 9.625 4.319 19.15 12.62 25.43l224 170.1C242.4 509.9 249.1 512 256 512c6.875 0 13.62-2.135 19.37-6.51l224-170.1C507.7 328.2 512 318.7 512 309.1zM32.01 309.1L240 51.75v416L32.01 309.1zM271.1 467.9v-416l207.1 257.3L271.1 467.9z"/></svg>`,

    "2": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="${color}" d="M512 208V320C512 390.7 397.4 448 256 448C114.6 448 0 390.7 0 320V208C0 128.5 114.6 64 256 64C397.4 64 512 128.5 512 208zM90.67 281.9C131.4 304.8 189.8 320 256 320C322.2 320 380.6 304.8 421.3 281.9C463 258.5 480 231.1 480 208C480 184.9 463 157.5 421.3 134.1C380.6 111.2 322.2 96 256 96C189.8 96 131.4 111.2 90.67 134.1C48.96 157.5 32 184.9 32 207.1C32 231.1 48.96 258.5 90.67 281.9V281.9zM240 351.7C217.8 350.1 196.3 348.6 176 344.8V409.2C196 412.7 217.5 414.1 240 415.7V351.7zM96 385.1C110.2 391.7 126.3 397.4 144 402.1V337.5C126.8 332.8 110.8 327.1 96 320.4V385.1zM64 303.2C51.78 295.5 41.03 286.9 32 277.8V320C32 332.9 40.51 349.9 64 366.8V303.2zM336 409.2V344.8C315.7 348.6 294.2 350.1 272 351.7V415.7C294.5 414.1 315.1 412.7 336 409.2V409.2zM448 366.8C471.5 349.9 480 332.9 480 320V277.8C470.1 286.9 460.2 295.5 448 303.2V366.8zM416 320.4C401.3 327.1 385.2 332.8 368 337.5V402.1C385.7 397.4 401.8 391.7 416 385.1V320.4z"/></svg>`

  }

  return <SVG src={ IconSrcs[sides] } height={size} width={size} {...props} />
}

function Widget() {

  const [sides, setSides] = useSyncedState( 'sides', diceCollection[0] );
  const [roll, setRoll]   = useSyncedState( 'roll', 0 );
  const [color, setColor] = useSyncedState( 'color', themes[0] );

  const reroll = ( n = sides ) => {
    setRoll( d(n) )
    console.log(`Rolled a D${n}`)
  };

  const cycleDice = () => {
    const nextIndex = diceCollection.indexOf(sides) + 1;
    const nextDie = diceCollection[ nextIndex % diceCollection.length ];

    setSides( nextDie )
    reroll( nextDie )
  }

  console.log( color )

  usePropertyMenu(
    [
      {
        itemType: 'color-selector',
        propertyName: 'color-selector',
        tooltip: 'Color',
        selectedOption: color.option,
        options: themes.map( ({option, tooltip}) => ({
          option,
          tooltip
        }))
      },

      { itemType: 'separator' },

      {
        itemType: 'dropdown',
        propertyName: 'sides-selector',
        tooltip: 'Sides',
        selectedOption: sides + "",
        options: diceCollection
          .sort( (a,b) => b - a )
          .map( n => {
            return { option: `${n}`, label: `D${n}` }
          }),
      },
      {
        itemType: 'action',
        propertyName: 'reroll',
        tooltip: 'Reroll',
      },
    ],

    ({propertyName, propertyValue}) => {
      switch (propertyName) {
        case "color-selector":
          setColor( themes[themes.findIndex( (t) => t.option === propertyValue )] )
          break;

        case "reroll":
          reroll()
          break;

        case "sides-selector":
          setSides( parseInt(propertyValue) )
          reroll( parseInt(propertyValue) )
          break;

        default:
          console.log(propertyName)
          break;
      }
    }
  )

  return (
    <AutoLayout
      verticalAlignItems={'center'}
      horizontalAlignItems={'center'}
      spacing={12}
      padding={16}
      cornerRadius={16}
      fill={color.light}
      stroke={color.medium}
      strokeWidth={4}
    >
      <DiceIcon sides={sides} color={color.dark} size={64}
        onClick={() => cycleDice()}
      />
      <Text fontSize={64} horizontalAlignText={'center'}
        onClick={() => reroll()}
      >
        {roll}
      </Text>
    </AutoLayout>
  )
}

widget.register(Widget)
