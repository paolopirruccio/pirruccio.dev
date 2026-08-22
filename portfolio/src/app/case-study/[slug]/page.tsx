import {notFound,redirect} from "next/navigation";
import {CaseStudyTemplate} from "@/components/portfolio/CaseStudyTemplate";
import {caseStudies,caseStudyBySlug} from "@/data/case-studies";
import {CASE_STUDIES_ENABLED} from "@/config/features";

export function generateStaticParams(){return caseStudies.map(({slug})=>({slug}))}
export default async function CaseStudyPage({params}:{params:Promise<{slug:string}>}){if(!CASE_STUDIES_ENABLED)redirect("/gallery");const{slug}=await params;const study=caseStudyBySlug(slug);if(!study)notFound();return <CaseStudyTemplate study={study}/>}
