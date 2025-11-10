import { Link } from 'react-router-dom'
export default function PageHeader(props){
    return(
        <div className="w-full h-65 md:h-70 lg:h-80 relative">
            <img src={props.image} className='w-full h-full object-cover'/>
            <div className='inset-0 bg-[#1D4ED8]/60 absolute w-full h-full'>
                <div className='absolute w-60 h-20 top-30 left-10 flex items-center justify-center'>
                    <p className='text-[#FACC15] font-semibold'>
                        <Link to='/' className='text-xl font-semibold text-blue-200'>
                            Home
                        </Link> / {props.page}
                    </p>
                </div>
            </div>
        </div>
    )
}