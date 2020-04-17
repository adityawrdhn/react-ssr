import colors from './colors'
const breakpoints = {
    xs: 576,
    sm: 768,
    md: 991,
    lg: 1220,
}
const devices = Object.keys(breakpoints).reduce((a, b) => {
    a[b] = `(max-width: ${breakpoints[b]}px)`
    return a
}, {})
const loop = (startNumber, maxNumber, increment) => {
    let ret = []
    for (let i = startNumber; i <= maxNumber; i += increment) {
        ret = [...ret, i]
    }
    return ret
}

export const theme = {
    breakpoints: { ...breakpoints },
    devices: { ...devices },
    space: loop(0, 100, 4),
    fontSizes: loop(8, 96, 2),
    fontWeights: loop(100, 900),
    lineHeights: loop(8, 96, 2),
    letterSpacings: {
        normal: 'normal',
        tracked: '0.1em',
        tight: '-0.05em',
        mega: '0.25em',
    },
    borders: [0, '1px solid', '2px solid', '3px solid', '4px solid', '5px solid', '6px solid'],
    radius: [3, 4, 5, 10, 20, 30, 60, 120, '50%'],
    widths: [36, 40, 44, 48, 54, 70, 81, 128, 256],
    heights: [36, 40, 44, 46, 48, 54, 70, 81, 128],
    maxWidths: [16, 32, 64, 128, 256, 512, 768, 1024, 1536],
    colors,
    colorStyles: {
        primary: {
            color: colors.primary,
            borderColor: colors.transparent,
            backgroundColor: colors.transparent,
            '&:hover': {
                color: colors.primary,
                backgroundColor: colors.transparent,
            },
        },
        secondary: {
            color: colors.secondary,
            borderColor: colors.secondary,
            '&:hover': {
                color: colors.secondaryHover,
                borderColor: colors.secondaryHover,
            },
        },
        warning: {
            color: colors.yellow,
            borderColor: colors.yellow,
            '&:hover': {
                color: colors.yellowHover,
                borderColor: colors.yellowHover,
            },
        },
        error: {
            color: colors.secondaryHover,
            borderColor: colors.secondaryHover,
            '&:hover': {
                color: colors.secondary,
                borderColor: colors.secondary,
            },
        },
        primaryWithBg: {
            color: colors.white,
            border: '2px solid',
            backgroundColor: colors.primary,
            borderColor: colors.borderColor,
            borderRadius: '0',
            '&:after': {
                content: '',
                width: '100px',
                height: '100px',
                display: 'block',
                backgroundColor: colors.primary,
            },
            '&:hover': {
                backgroundColor: colors.primaryHover,
                borderColor: colors.transparent,
            },
        },
        secondaryWithBg: {
            color: colors.white,
            backgroundColor: colors.secondary,
            borderColor: colors.secondary,
            '&:hover': {
                backgroundColor: colors.secondaryHover,
                borderColor: colors.secondaryHover,
            },
        },
        warningWithBg: {
            color: colors.white,
            backgroundColor: colors.yellow,
            borderColor: colors.yellow,
            '&:hover': {
                backgroundColor: colors.yellowHover,
                borderColor: colors.yellowHover,
            },
        },
        errorWithBg: {
            color: colors.white,
            backgroundColor: colors.secondaryHover,
            borderColor: colors.secondaryHover,
            '&:hover': {
                backgroundColor: colors.secondary,
                borderColor: colors.secondary,
            },
        },
        transparentBg: {
            backgroundColor: colors.white,
            '&:hover': {
                backgroundColor: colors.white,
            },
        },
    },
    buttonStyles: {
        textButton: {
            border: 0,
            color: colors.primary,
            padding: 0,
            height: 'auto',
            backgroundColor: colors.transparent,
        },
        outlined: {
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: colors.transparent,
        },
        fab: {
            border: '0',
            width: '40px',
            height: '40px',
            padding: 0,
            borderRadius: '50%',
            justifyContent: 'center',
            'span.btn-icon': {
                paddingLeft: 0,
            },
        },
        extendedFab: {
            border: '0',
            minWidth: '50px',
            height: '40px',
            borderRadius: '50px',
            justifyContent: 'center',
        },
    },
    // FlexBox: {
    //   backgroundColor: 'green'
    // }
}
