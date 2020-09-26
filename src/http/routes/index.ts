import { Router, RouterGroup } from '@recordot/http-core'
import DevAuthGroup from './groups/develop/DevAuthGroup'
import ServiceGroup from './groups/ServiceGroup'

export const Routes:Array<Router> = [
    // ... HelloworldGroup,
    ... DevAuthGroup,
    // {
    //     route:'authenticateW'
    // }
    // ... ServiceGroup
]

export const RouteGroups: Array<{new (...args: any[]): RouterGroup;}> = [
    ServiceGroup
]