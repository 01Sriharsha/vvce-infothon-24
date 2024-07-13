import { Router } from "express"
import { generateText } from "./generate.controller"

const generateRouter = () => {
    const router = Router()
    router.post("/" , generateText)
    return router
}

export default generateRouter