import { Router, RouterGroup } from '@recordot/http-core'
import HelloworldGroup from './groups/HelloWorld'
import PostGroup from './groups/PostGroup'

export const Routes:Array<Router> = [ ]

export const RouteGroups: Array<{new (...args: any[]): RouterGroup;}> = [
    HelloworldGroup,
    PostGroup,
]