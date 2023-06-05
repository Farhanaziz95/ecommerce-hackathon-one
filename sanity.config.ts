import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk"
import schemas from "./sanity";
import { visionTool } from "@sanity/vision"

const config = defineConfig({
    projectId:"5nk4irff",
    dataset:"production",
    title:"Ecommerce_documents",
    apiVersion:"2021-10-21",
    basePath:"/sanity_admin",
    plugins:[deskTool(),visionTool()],
    schema: {types: schemas}
})

export default config

