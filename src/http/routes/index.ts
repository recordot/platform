import { Router } from '@recordot/http-core'
import DevAuthGroup from './groups/develop/DevAuthGroup'
import HelloworldGroup from './groups/HelloWorld'

export const Routes:Array<Router> = [
    // ... HelloworldGroup,
    ... DevAuthGroup,
    // {
    //     route:'authenticateW'
    // }
]