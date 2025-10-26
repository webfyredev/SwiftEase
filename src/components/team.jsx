import { motion } from "framer-motion";
import { scrollUp, scrollUpDelay } from "../effects/motions";
import teamBg1 from '../images/team/teams (5).jpg'
import teamBg2 from '../images/team/teams (2).jpg'
import teamBg3 from '../images/team/teams (3).jpg'
import teamBg4 from '../images/team/teams (4).jpg'

export default function Team(){
    const teams_data = [
        {
            id : 1,
            image : teamBg1,
            name : 'Micheal Chen ',
            role : 'CEO & Founder',
            text : 'With over 20 years in logistics, Micheal founded the company with a vision of bringing ultimate ease to logistics service.'
        },
        {
            id : 2,
            image : teamBg2,
            name : 'Sarah Johnson',
            role : 'CTO',
            text : 'Sarah leads our technology initiatives, implementing AI and operations.',
        },
        {
            id : 3,
            image : teamBg3,
            name : 'Emily Rodirgues',
            role : 'Head of Operations',
            text : 'Emily overseas our global operations, ensuring seamless delivery across all countries.'
        },
        {
            id : 4,
            image : teamBg4,
            name : 'David Thompson',
            role : 'Customer Relations Director',
            text : 'David ensures our customers recieve exceptional service and support.'
        },

    ]
    return(
        <>
            <div className="w-full bg-[#F9FAFB] h-auto flex flex-col items-center py-10">
                <motion.h2 {...scrollUp} className="font-bold text-2xl">
                    Meet Our Leadership Team
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-sm text-gray-400 mt-2">
                    Experienced professionals driving our success
                </motion.p>
                <div className="mt-5 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
                    {teams_data.map((team) => (
                        <div className="w-full shadow-md rounded-md flex flex-col mb-5">
                            <img src={team.image} className="w-full h-auto object-cover"/>
                            <div className="w-full h-auto p-3 flex flex-col">
                                <h2 className="font-bold text-sm">
                                    {team.name}
                                </h2>
                                <p className="text-xs font-semibold mt-1 text-[#2563EB]">
                                    {team.role}
                                </p>
                                <p className="text-xs my-2 text-gray-400">
                                    {team.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    );
}