import {useEffect, useRef, useState} from 'react'

export function useIntersection(threshold=0.95){
    const ref=useRef(null)

    const [isVisible, setIsVisible]=useState(false)


useEffect(()=>{
    const observer = new IntersectionObserver(
        ([entry])=>{
            if (entry.isIntersecting && entry.intersectionRatio>=threshold){
                setIsVisible(true)
                observer.unobserve(entry.target)
            }
        },
         {threshold}
)

if(ref.current){
    observer.observe(ref.current)
    console.log("current ref is "+ref.current)
}

return ()=>{
    if(ref.current) observer.unobserve(ref.current)
}
},[threshold])

return [ref,isVisible]
}

