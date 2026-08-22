import type {Metadata} from "next";
import {ProjectsGallery} from "@/components/portfolio/ProjectsGallery";

export const metadata:Metadata={title:"Projects — Paolo Pirruccio",description:"Selected UX/UI, web and digital projects by Paolo Pirruccio."};
export default function GalleryPage(){return <ProjectsGallery/>}
