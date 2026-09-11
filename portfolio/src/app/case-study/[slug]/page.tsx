import {notFound,redirect} from "next/navigation";
import {LocalizedCaseStudy} from "@/components/portfolio/LocalizedCaseStudy";
import englishStudies from "@/data/case-studies.en.json";
import type {CaseStudy} from "@/data/case-studies";
import {caseStudies,caseStudyBySlug} from "@/data/case-studies";
import {isCaseStudyEnabled} from "@/config/features";

export function generateStaticParams(){return caseStudies.map(({slug})=>({slug}))}
export default async function CaseStudyPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;if(!isCaseStudyEnabled(slug))redirect("/gallery");const study=caseStudyBySlug(slug);if(!study)notFound();const english=englishStudies.find(item=>item.slug===slug) as CaseStudy|undefined;if(!english)notFound();return <LocalizedCaseStudy italian={study} english={english}/>}
