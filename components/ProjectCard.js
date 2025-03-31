import { Big_Shoulders_Display } from "next/font/google";
 
const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["800"], // Choose weights you need
});

const ProjectCard = ({title,desc}) => {
  return (
    <div className="flex-col flex-center align-middle p-8 leading-[1.5]">
      <h1 className={`${bigShoulders.className} text-4xl mb-4`}>{title}</h1>

      <h1 className="font-bebas text-2xl">{desc}</h1>
    </div>
  )
}

export default ProjectCard