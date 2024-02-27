import 'styled-components'; // pre-made components & their styling 
import { Theme } from '@mui/material/styles'; // default theme

// whenever we refer to styled-components it will go to THIS theme, not the default
// extending the original theme and changing it up 
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}